// 가족용 안내 화면. 단계 안내, 대화 질문, Gemini 프롬프트 만들기.
// 입력은 이 브라우저에만 임시 보관되며(게스트 로그아웃 시 삭제), 서버로 보내지 않는다.
(function () {
  const { sessions, store } = window.FH;
  const E = window.EVENT;
  const $ = (id) => document.getElementById(id);

  let sIdx = Math.max(0, sessions.findIndex((s) => s.id === store.get('guide.sessionId', null)));
  let stIdx = 0;
  const saved = store.get('guide.stepId', null);
  if (saved) {
    const found = sessions[sIdx].steps.findIndex((st) => st.id === saved);
    if (found >= 0) stIdx = found;
  }
  let form = store.get('guide.form', { idea: '', ideaCustom: '', likes: '', together: '', mood: '' });

  function el(tag, attrs, children) {
    const n = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else if (k.startsWith('on')) n[k] = v;
      else n.setAttribute(k, v);
    });
    (children || []).forEach((c) => n.appendChild(c));
    return n;
  }

  function go(si, sti) {
    sIdx = si; stIdx = sti;
    store.set('guide.sessionId', sessions[sIdx].id);
    store.set('guide.stepId', sessions[sIdx].steps[stIdx].id);
    render();
    window.scrollTo(0, 0);
  }

  function buildPrompt() {
    const idea = form.idea === '직접 쓰기' ? form.ideaCustom.trim() : form.idea;
    const lines = [
      '우리 가족과 함께 쓸 웹페이지를 하나 만들어 주세요. 초등학교 저학년도 이해할 수 있게 쉬운 말로 설명해 주세요.',
      '만들고 싶은 것: ' + (idea || '(아직 안 정했어요)'),
      '우리 가족이 좋아하는 것: ' + (form.likes.trim() || '(아직 안 정했어요)'),
      '우리 가족이 함께 하는 것: ' + (form.together.trim() || '(아직 안 정했어요)'),
      '분위기: ' + (form.mood || '(아무거나 좋아요)'),
      '조건: 글자는 크게, 버튼을 누르면 무언가 재미있게 바뀌는 동작을 한 가지 넣어 주세요. 하나의 HTML 파일로 바로 볼 수 있게 만들어 주세요.',
      '실제 이름, 학교, 사진, 전화번호는 넣지 말고 "우리 가족"이나 별명으로만 써 주세요.',
    ];
    return lines.join('\n');
  }

  // 이름·학교·연락처로 보이는 말을 입력하면 알려 준다. (차단하지 않고 안내만 한다.)
  function personalInfoHint(text) {
    if (/(\d{2,3}[- ]?\d{3,4}[- ]?\d{4})/.test(text)) return '전화번호처럼 보이는 숫자가 있어요. 지워 주세요.';
    if (/(초등학교|학교|학년|\d+반)/.test(text)) return '학교나 학년 이야기는 빼 주세요.';
    return '';
  }

  function chips(options, selected, onPick) {
    return el('div', { class: 'chips' }, options.map((o) =>
      el('button', { type: 'button', class: o === selected ? 'on' : '', text: o, onclick: () => onPick(o) })));
  }

  function renderBuilder(card) {
    const b = el('div', { class: 'builder' });
    const out = el('textarea', { readonly: 'readonly', 'aria-label': 'Gemini에게 보낼 문장' });
    const warn = el('div', { class: 'warn-text' });
    const copyMsg = el('span', { class: 'ok' });

    function refresh() {
      store.set('guide.form', form);
      out.value = buildPrompt();
      warn.textContent = personalInfoHint([form.ideaCustom, form.likes, form.together].join(' '));
    }

    b.appendChild(el('label', { text: '1. 무엇을 만들까요?' }));
    const ideaBox = el('div');
    function drawIdea() {
      ideaBox.innerHTML = '';
      ideaBox.appendChild(chips(E.promptBuilder.ideas.concat('직접 쓰기'), form.idea, (o) => { form.idea = o; drawIdea(); refresh(); }));
      if (form.idea === '직접 쓰기') {
        ideaBox.appendChild(el('input', {
          type: 'text', value: form.ideaCustom, placeholder: '예: 우리 가족 요리 책',
          oninput: (e) => { form.ideaCustom = e.target.value; refresh(); },
        }));
      }
    }
    drawIdea();
    b.appendChild(ideaBox);

    b.appendChild(el('label', { text: '2. 우리 가족이 좋아하는 것은?' }));
    b.appendChild(el('input', { type: 'text', value: form.likes, placeholder: '예: 떡볶이, 캠핑, 노래', oninput: (e) => { form.likes = e.target.value; refresh(); } }));

    b.appendChild(el('label', { text: '3. 우리 가족이 함께 하는 것은?' }));
    b.appendChild(el('input', { type: 'text', value: form.together, placeholder: '예: 주말에 공원 가기', oninput: (e) => { form.together = e.target.value; refresh(); } }));

    b.appendChild(el('label', { text: '4. 어떤 분위기가 좋아요?' }));
    const moodBox = el('div');
    function drawMood() {
      moodBox.innerHTML = '';
      moodBox.appendChild(chips(E.promptBuilder.moods, form.mood, (o) => { form.mood = o; drawMood(); refresh(); }));
    }
    drawMood();
    b.appendChild(moodBox);

    b.appendChild(warn);
    b.appendChild(el('label', { text: 'Gemini에게 보낼 문장' }));
    b.appendChild(out);
    b.appendChild(el('div', { class: 'copy-row' }, [
      el('button', {
        type: 'button', class: 'primary', text: '복사하기',
        onclick: async () => {
          try { await navigator.clipboard.writeText(out.value); copyMsg.textContent = '복사했어요! Gemini에 붙여 넣어요.'; }
          catch (e) { out.removeAttribute('readonly'); out.select(); copyMsg.textContent = '글을 선택했어요. Ctrl+C로 복사해요.'; }
        },
      }),
      copyMsg,
    ]));
    refresh();
    card.appendChild(b);
  }

  function render() {
    const session = sessions[sIdx];
    const step = session.steps[stIdx];

    $('heading').textContent = E.title + ' · ' + session.title + ' ' + session.subtitle;

    const tabs = $('tabs'); tabs.innerHTML = '';
    sessions.forEach((s, i) => tabs.appendChild(el('button', {
      type: 'button', class: i === sIdx ? 'active' : '', text: s.title, onclick: () => go(i, 0),
    })));

    $('bar').style.width = ((stIdx + 1) / session.steps.length * 100) + '%';

    const priv = $('privacy');
    priv.hidden = !step.privacy;
    priv.textContent = step.privacy ? E.privacyNotice : '';

    const card = $('card'); card.innerHTML = '';
    card.appendChild(el('div', { class: 'card-head' }, [
      el('h2', { text: step.title }),
      el('div', { class: 'meta', text: step.minutes + '분 · ' + (stIdx + 1) + '/' + session.steps.length }),
    ]));
    const body = el('div', { class: 'card-body' });
    body.appendChild(el('ul', {}, step.guide.map((g) => el('li', { text: g }))));
    if (step.questions) {
      body.appendChild(el('ul', { class: 'questions' }, step.questions.map((q) => el('li', { text: q }))));
    }
    if (step.kind === 'prompt') renderBuilder(body);
    if (step.link === 'padlet') {
      body.appendChild(E.padletUrl
        ? el('a', { class: 'link-button', href: E.padletUrl, target: '_blank', rel: 'noopener', text: 'Padlet 열기 ↗' })
        : el('div', { class: 'privacy', text: 'Padlet 주소는 선생님이 알려 줘요.' }));
    }
    card.appendChild(body);

    $('prev').disabled = sIdx === 0 && stIdx === 0;
    const last = sIdx === sessions.length - 1 && stIdx === session.steps.length - 1;
    $('next').disabled = last;
  }

  $('prev').onclick = () => {
    if (stIdx > 0) go(sIdx, stIdx - 1);
    else if (sIdx > 0) go(sIdx - 1, sessions[sIdx - 1].steps.length - 1);
  };
  $('next').onclick = () => {
    if (stIdx < sessions[sIdx].steps.length - 1) go(sIdx, stIdx + 1);
    else if (sIdx < sessions.length - 1) go(sIdx + 1, 0);
  };

  render();
})();
