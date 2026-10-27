// 가족해커톤 활동 설정. 차시·단계·시간·문구는 이 파일에서만 고칩니다.
// 단계는 순서 번호가 아니라 고정 id로 구분합니다. (순서는 배열 순서)
// kind: intro | talk | play | prompt | make | share | present | wrap | break
// 문구는 1·2학년이 읽을 수 있게 짧은 문장과 쉬운 낱말로 씁니다.
window.EVENT = {
  title: '가족해커톤',
  privacyNotice: '이름, 학교, 학년, 전화번호, 사진은 쓰지 않아요. 우리 가족은 "우리 가족"이나 팀 이름으로만 써요.',
  sessions: [
    {
      id: 's1',
      title: '1차시',
      subtitle: '이야기하고 놀아요',
      steps: [
        {
          id: 's1-intro', kind: 'intro', title: '시작해요', minutes: 5,
          stage: '오늘은 가족과 이야기하고, 놀고, 만들어 봐요.',
          guide: ['가족과 마주 보고 앉아요.', '선생님 말씀을 잘 들어요.'],
        },
        {
          id: 's1-talk', kind: 'talk', title: '가족 이야기', minutes: 10,
          stage: '질문을 하나씩 읽고 가족과 이야기해요.',
          guide: ['한 사람씩 돌아가며 말해요.', '다른 사람이 말할 때는 끝까지 들어요.'],
          questions: [
            '우리 가족은 언제 가장 즐거워요?',
            '우리 가족이 같이 먹으면 좋은 음식은 뭐예요?',
            '오늘 가장 기대되는 것은 뭐예요?',
          ],
        },
        {
          id: 's1-play', kind: 'play', title: '스택 버거 게임', minutes: 20,
          stage: '스택 버거 게임을 가족이 함께 해요.',
          guide: ['게임 판을 같이 봐요.', '규칙은 선생님이 알려 줘요.'],
        },
        {
          id: 's1-wrap', kind: 'wrap', title: '정리해요', minutes: 5,
          stage: '게임 도구를 정리해요. 오늘 가장 재미있었던 것을 말해요.',
          guide: ['게임 도구를 상자에 담아요.', '가장 재미있었던 것을 한 가지씩 말해요.'],
        },
      ],
    },
    {
      id: 's2',
      title: '2차시',
      subtitle: '해결할 일 찾기',
      steps: [
        {
          id: 's2-start', kind: 'intro', title: '노트북 준비', minutes: 5,
          stage: '함께 온 어른이 개인 Google 계정으로 로그인하고 Gemini를 열어요.',
          guide: [
            '노트북은 이미 켜져 있어요.',
            '어른이 자기 개인 Google 계정으로 로그인해요.',
            'Gemini를 열어요.',
            '쉬는 시간에는 노트북을 끄지 말고 그대로 둬요.',
          ],
          privacy: true,
        },
        {
          id: 's2-talk', kind: 'talk', title: '가족 이야기', minutes: 15,
          stage: '이야기를 하며 우리 가족이 함께 해결할 일을 찾아요.',
          guide: ['질문을 읽고 이야기해요.', '아이가 먼저 말하고, 어른이 도와줘요.', '잘 만드는 것보다 함께 해결하는 것이 중요해요.'],
          questions: [
            '집이나 학교에서 나나 우리 가족이 불편한 일은 뭐예요?',
            '그 일 때문에 누가 가장 힘들어요?',
            '우리 가족이 함께 해결하면 좋을 일은 뭐예요?',
            '그 일이 해결되면 무엇이 달라질까요?',
          ],
        },
        {
          id: 's2-prompt', kind: 'prompt', title: 'Gemini에게 부탁하기', minutes: 10,
          stage: '찾은 일을 Gemini에게 부탁하는 글을 만들어요.',
          guide: ['가족과 이야기한 것을 아이가 칸에 써요.', '칸을 채우면 부탁하는 글이 만들어져요.', '"복사하기"를 누르고 어른이 Gemini에 붙여 넣어요.'],
          privacy: true,
        },
        {
          id: 's2-gemini', kind: 'make', title: 'Gemini가 만든 것 보기', minutes: 10,
          stage: 'Gemini가 만든 것이 우리 일을 해결하는지 가족이 함께 봐요.',
          guide: ['우리 문제를 해결하는 데 도움이 되는지 이야기해요.', '더 도움이 되도록 고치고 싶은 곳을 하나 골라요.'],
        },
      ],
    },
    {
      id: 's3',
      title: '3차시',
      subtitle: '해결하고 소개해요',
      steps: [
        {
          id: 's3-make', kind: 'make', title: '고쳐서 완성하기', minutes: 20,
          stage: '아이가 고칠 곳을 말하고, 어른이 Gemini에 입력해서 완성해요.',
          guide: [
            '고치고 싶은 곳은 아이가 말해요.',
            'Gemini에는 함께 온 어른이 입력해요.',
            '"글자를 더 크게 해 줘", "버튼을 하나 더 넣어 줘"처럼 쉽게 말해요.',
            '우리 일을 해결하는 데 도움이 되면 그만해도 좋아요.',
          ],
          privacy: true,
        },
        {
          id: 's3-share', kind: 'share', title: '결과 올리기', minutes: 5,
          stage: '우리가 만든 결과의 링크를 Padlet에 올려요.',
          guide: [
            'Gemini에서 "공유"를 눌러 링크를 복사해요.',
            '아래 "Padlet 열기"를 눌러요. 새 글을 만들고 링크를 붙여 넣어요.',
            '이름 칸에는 우리 가족 팀 이름을 써요. 학생이나 가족의 이름이 들어가지 않게 정해요.',
          ],
          privacy: true,
          link: 'padlet',
        },
        {
          id: 's3-present', kind: 'present', title: '우리 가족 소개', minutes: 15,
          stage: '우리 가족이 찾은 일과 해결한 방법을 소개해요.',
          guide: ['우리가 찾은 일은 무엇인지 말해요.', '어떻게 해결했는지 보여 줘요.', '해결하면서 가장 기억에 남는 것을 말해요.'],
        },
      ],
    },
  ],
  // 제출 Padlet 주소. 보드를 만든 뒤 여기에 붙여 넣으면 가족용 안내의 "Padlet 열기" 버튼이 켜집니다.
  padletUrl: '',
  // 쉬는 시간: 해당 차시가 끝난 뒤에 자동으로 끼워 넣습니다.
  breakMinutes: 10,
  breakAfter: ['s1', 's2'],
  // 2차시 프롬프트 만들기 선택지: 해결할 일 (임시 예시. 교사 논의 후 이 목록만 고치면 됩니다.)
  promptBuilder: {
    ideas: ['집안일 나누기', '숙제와 놀이 시간 정하기', '아침에 준비하기', '가족 약속 정하기'],
    moods: ['밝고 귀여운', '조용하고 따뜻한', '신나고 화려한'],
  },
};
