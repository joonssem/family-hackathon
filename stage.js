// 무대 안내·타이머 화면. 단계는 id로 기억하고, 남은 시간은 종료 시각으로 계산한다.
(function () {
  const { sessions, store } = window.FH;
  const $ = (id) => document.getElementById(id);

  const allSteps = sessions.flatMap((s) => s.steps.map((st) => ({ session: s, step: st })));
  let index = Math.max(0, allSteps.findIndex((x) => x.step.id === store.get('stage.stepId', null)));
  let running = false;
  let endAt = 0;        // 실행 중일 때 종료 시각(ms)
  let remainingMs = 0;  // 멈춰 있을 때 남은 시간(ms)
  let audioCtx = null;
  let beeped = false;

  function current() { return allSteps[index]; }

  function load(i) {
    index = Math.min(Math.max(i, 0), allSteps.length - 1);
    running = false;
    beeped = false;
    remainingMs = current().step.minutes * 60000;
    store.set('stage.stepId', current().step.id);
    render();
  }

  function msLeft() { return running ? Math.max(0, endAt - Date.now()) : remainingMs; }

  function fmt(ms) {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60), s = total % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function beep() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.35, 0.7].forEach((t) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.frequency.value = 880; o.connect(g); g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.25, audioCtx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + t + 0.3);
        o.start(audioCtx.currentTime + t); o.stop(audioCtx.currentTime + t + 0.3);
      });
    } catch (e) { /* 소리 불가 환경 */ }
  }

  function renderTimer() {
    const ms = msLeft();
    const t = $('timer');
    t.textContent = fmt(ms);
    t.className = 'timer' + (ms === 0 ? ' done' : ms <= 60000 ? ' warn' : '');
    if (running && ms === 0) {
      running = false; remainingMs = 0;
      if (!beeped) { beeped = true; beep(); }
      $('toggle').textContent = '시작';
    }
  }

  function render() {
    const { session, step } = current();
    $('stage').classList.toggle('break', step.kind === 'break');
    $('title').textContent = session.title + ' · ' + step.title;
    $('text').textContent = step.stage;
    $('toggle').textContent = running ? '멈춤' : '시작';
    $('prev').disabled = index === 0;
    $('next').disabled = index === allSteps.length - 1;

    $('tabs').innerHTML = '';
    sessions.forEach((s) => {
      const b = document.createElement('button');
      b.className = 'tab' + (s.id === session.id ? ' active' : '');
      b.textContent = s.title;
      b.onclick = () => load(allSteps.findIndex((x) => x.session.id === s.id));
      $('tabs').appendChild(b);
    });

    $('steps').innerHTML = '';
    session.steps.forEach((st) => {
      const i = allSteps.findIndex((x) => x.step.id === st.id);
      const b = document.createElement('button');
      b.className = 'pill' + (i === index ? ' current' : i < index ? ' past' : '');
      b.textContent = st.title + ' ' + st.minutes + '분';
      b.onclick = () => load(i);
      $('steps').appendChild(b);
    });
    renderTimer();
  }

  function toggle() {
    if (running) {
      remainingMs = msLeft(); running = false;
    } else {
      if (remainingMs <= 0) remainingMs = current().step.minutes * 60000;
      beeped = false; endAt = Date.now() + remainingMs; running = true;
      audioCtx = audioCtx || null; // 사용자 조작 시점에 소리 허용
      try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* 무시 */ }
    }
    $('toggle').textContent = running ? '멈춤' : '시작';
    renderTimer();
  }

  $('toggle').onclick = toggle;
  $('prev').onclick = () => load(index - 1);
  $('next').onclick = () => load(index + 1);
  $('reset').onclick = () => load(index);
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowRight') load(index + 1);
    else if (e.key === 'ArrowLeft') load(index - 1);
    else if (e.key === 'r' || e.key === 'R') load(index);
    else if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen();
    }
  });

  setInterval(renderTimer, 250);
  load(index);
})();
