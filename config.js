// 가족해커톤 활동 설정. 차시·단계·시간·문구는 이 파일에서만 고칩니다.
// 단계는 순서 번호가 아니라 고정 id로 구분합니다. (순서는 배열 순서)
// kind: intro | talk | play | prompt | make | share | present | wrap | break
window.EVENT = {
  title: '가족해커톤',
  privacyNotice: '이름·학교·학년·전화번호·사진은 쓰지 않아요. 우리 가족은 "우리 가족"이나 별명으로만 써요.',
  sessions: [
    {
      id: 's1',
      title: '1차시',
      subtitle: '이야기하고 놀아요',
      steps: [
        {
          id: 's1-intro', kind: 'intro', title: '시작해요', minutes: 5,
          stage: '오늘은 가족이 함께 이야기하고, 놀고, 만들어 봐요.',
          guide: ['가족과 마주 보고 앉아요.', '선생님의 안내를 들어요.'],
        },
        {
          id: 's1-talk', kind: 'talk', title: '가족 대화 카드', minutes: 10,
          stage: '카드를 한 장씩 보며 가족과 이야기해요.',
          guide: ['한 사람씩 돌아가며 말해요.', '다른 사람이 말할 때는 끝까지 들어요.'],
          questions: [
            '우리 가족이 함께 할 때 가장 즐거운 때는 언제인가요?',
            '우리 가족이 같이 먹으면 좋은 음식은 무엇인가요?',
            '오늘 가장 기대되는 것은 무엇인가요?',
          ],
        },
        {
          id: 's1-play', kind: 'play', title: '스택 버거 보드게임', minutes: 20,
          stage: '스택 버거 보드게임을 함께 해요.',
          guide: ['보드게임 판을 가족이 함께 봐요.', '규칙은 선생님이 설명해요.'],
        },
        {
          id: 's1-wrap', kind: 'wrap', title: '정리해요', minutes: 5,
          stage: '게임 도구를 정리하고, 오늘 가장 재미있었던 것을 이야기해요.',
          guide: ['게임 도구를 상자에 담아요.', '오늘 가장 재미있었던 것을 한 가지씩 말해요.'],
        },
      ],
    },
    {
      id: 's2',
      title: '2차시',
      subtitle: '이야기로 만들 것 정하기',
      steps: [
        {
          id: 's2-start', kind: 'intro', title: '시작 준비', minutes: 5,
          stage: '노트북에서 보호자 Google 계정으로 로그인하고 Gemini를 열어요.',
          guide: [
            '노트북은 게스트로 켜져 있어요.',
            '보호자 Google 계정으로 로그인하고 Gemini를 열어요.',
            '쉬는 시간에도 로그아웃하지 않고 창을 그대로 둬요.',
          ],
          privacy: true,
        },
        {
          id: 's2-talk', kind: 'talk', title: '가족 대화', minutes: 15,
          stage: '이야기를 나누며 우리 가족이 만들 것을 정해요.',
          guide: ['아래 질문으로 이야기해요.', '아이가 먼저 말하고 보호자가 도와요.'],
          questions: [
            '우리 가족이 좋아하는 것은 무엇인가요?',
            '우리 가족이 함께 하는 일 중 자랑하고 싶은 것은 무엇인가요?',
            '다른 사람들에게 보여 주고 싶은 우리 가족의 모습은 무엇인가요?',
            '그림이나 게임, 퀴즈 중 어떤 것을 만들면 재미있을까요?',
          ],
        },
        {
          id: 's2-prompt', kind: 'prompt', title: 'Gemini에게 말하기', minutes: 10,
          stage: '이야기한 내용을 골라 Gemini에게 보낼 문장을 만들어요.',
          guide: ['아래 칸을 채우면 Gemini에게 보낼 문장이 만들어져요.', '"복사하기"를 누르고 Gemini에 붙여 넣어요.'],
          privacy: true,
        },
        {
          id: 's2-gemini', kind: 'make', title: 'Gemini 결과 보기', minutes: 10,
          stage: 'Gemini가 만든 결과를 가족이 함께 살펴봐요.',
          guide: ['결과가 마음에 드는지 이야기해요.', '고치고 싶은 곳을 하나 정해 둬요.'],
        },
      ],
    },
    {
      id: 's3',
      title: '3차시',
      subtitle: '만들고 발표해요',
      steps: [
        {
          id: 's3-make', kind: 'make', title: '고쳐 만들기', minutes: 20,
          stage: 'Gemini에게 고치고 싶은 점을 말하며 작품을 완성해요.',
          guide: [
            '고치고 싶은 점을 Gemini에게 말해요.',
            '"글자를 더 크게 해 줘", "색을 더 밝게 해 줘"처럼 쉽게 말해요.',
            '마음에 들면 멈춰도 괜찮아요.',
          ],
          privacy: true,
        },
        {
          id: 's3-share', kind: 'share', title: '완성본 내기', minutes: 5,
          stage: '완성한 작품의 링크를 Padlet에 올려요.',
          guide: [
            'Gemini에서 "공유"를 눌러 작품 링크를 복사해요.',
            '아래 "Padlet 열기"를 눌러 새 글을 만들고 링크를 붙여 넣어요.',
            '제목은 "우리 가족"이나 별명으로만 써요.',
          ],
          privacy: true,
          link: 'padlet',
        },
        {
          id: 's3-present', kind: 'present', title: '가족 발표', minutes: 15,
          stage: '가족이 만든 작품을 소개해요.',
          guide: ['우리가 만든 것을 소개해요.', '만들면서 가장 재미있었던 것을 말해요.'],
        },
      ],
    },
  ],
  // 제출 Padlet 주소. 보드를 만든 뒤 여기에 붙여 넣으면 가족용 안내의 "Padlet 열기" 버튼이 켜집니다.
  padletUrl: '',
  // 쉬는 시간: 해당 차시가 끝난 뒤에 자동으로 끼워 넣습니다.
  breakMinutes: 10,
  breakAfter: ['s1', 's2'],
  // 2차시 프롬프트 만들기 선택지 (주제는 교사 논의 후 이 목록만 고치면 됩니다.)
  promptBuilder: {
    ideas: ['우리 가족 소개 페이지', '우리 가족 퀴즈', '우리 가족 게임'],
    moods: ['밝고 귀여운', '조용하고 따뜻한', '신나고 화려한'],
  },
};
