// 공통: 설정에서 휴식을 끼워 넣은 단계 목록 만들기, 안전한 저장소 접근
(function () {
  const E = window.EVENT;

  function buildSessions() {
    return E.sessions.map((s) => {
      const steps = s.steps.slice();
      if (E.breakAfter.includes(s.id)) {
        steps.push({
          id: s.id + '-break', kind: 'break', title: '쉬는 시간', minutes: E.breakMinutes,
          stage: '쉬는 시간이에요. 노트북은 로그아웃하지 말고 그대로 두세요.',
          guide: ['쉬는 시간이에요.', '노트북은 로그아웃하지 말고 창을 그대로 둬요.'],
        });
      }
      return { id: s.id, title: s.title, subtitle: s.subtitle, steps };
    });
  }

  const store = {
    get(key, fallback) {
      try {
        const v = localStorage.getItem('fh:' + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('fh:' + key, JSON.stringify(value)); } catch (e) { /* 저장 불가 환경 */ }
    },
  };

  window.FH = { sessions: buildSessions(), store };
})();
