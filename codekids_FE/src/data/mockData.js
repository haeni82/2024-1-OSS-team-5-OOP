// 실제 백엔드 데이터 구조에 맞는 더미 데이터 (public 폴더 이미지 사용)
export const mockTutorials = [
  {
    id: 1,
    concept: "캡슐화",
    concept_eng: "encapsulation",
    problemTitle: "캡슐화 배우기",
    imageUrl: "/logo.png",
  },
  {
    id: 2,
    concept: "다형성",
    concept_eng: "polymorphism",
    problemTitle: "다형성 배우기",
    imageUrl: "/happyrobot.png",
  },
  {
    id: 3,
    concept: "추상화",
    concept_eng: "abstract",
    problemTitle: "추상화 배우기",
    imageUrl: "/hintrobot.png",
  },
];

export const mockProblems = [
  {
    problemId: 1,
    concept: "캡슐화",
    concept_eng: "encapsulation",
    problemTitle: "업/앤 다운 게임 만들기",
    difficulty: "중급",
    imageUrl: "/image.png",
  },
  {
    problemId: 2,
    concept: "캡슐화",
    concept_eng: "encapsulation",
    problemTitle: "계산기 만들기",
    difficulty: "초급",
    imageUrl: "/logo.png",
  },
  {
    problemId: 3,
    concept: "다형성",
    concept_eng: "polymorphism",
    problemTitle: "도형의 넓이를 구해볼까요?",
    difficulty: "중급",
    imageUrl: "/correct.png",
  },
  {
    problemId: 4,
    concept: "다형성",
    concept_eng: "polymorphism",
    problemTitle: "각 동물들은 어떤 소리를 낼까요?",
    difficulty: "초급",
    imageUrl: "/happyrobot.png",
  },
  {
    problemId: 5,
    concept: "추상화",
    concept_eng: "abstract",
    problemTitle: "로봇과 함께 편리한 세상을 위하여~!",
    difficulty: "고급",
    imageUrl: "/hintrobot.png",
  },
];

export const mockTutorialDetails = {
  encapsulation: {
    id: 1,
    concept: "캡슐화",
    concept_eng: "encapsulation",
    content:
      "캡슐화는 데이터와 메소드를 하나로 묶고, 외부에서 직접 접근하지 못하도록 보호하는 것입니다. 마치 약을 캡슐에 넣어서 보호하는 것처럼요!",
    examples: [
      "private String name; // 외부에서 직접 접근 불가",
      "public String getName() { return name; } // getter 메소드로 접근",
      "public void setName(String name) { this.name = name; } // setter 메소드로 수정",
    ],
    imageUrl: "/logo.png",
  },
  polymorphism: {
    id: 2,
    concept: "다형성",
    concept_eng: "polymorphism",
    content:
      "다형성은 하나의 인터페이스로 여러 형태의 객체를 다루는 것입니다. 동물이라는 같은 이름이지만 강아지는 멍멍, 고양이는 야옹 소리를 내는 것처럼요!",
    examples: [
      "Animal dog = new Dog(); // Dog 객체를 Animal 타입으로",
      "Animal cat = new Cat(); // Cat 객체를 Animal 타입으로",
      "dog.makeSound(); // 멍멍! cat.makeSound(); // 야옹!",
    ],
    imageUrl: "/happyrobot.png",
  },
  abstract: {
    id: 3,
    concept: "추상화",
    concept_eng: "abstract",
    content:
      "추상화는 복잡한 것들을 단순하게 표현하는 것입니다. 자동차를 운전할 때 엔진의 복잡한 구조를 몰라도 핸들과 페달만 알면 되는 것처럼요!",
    examples: [
      "abstract class Robot { abstract void powerOn(); }",
      "class CleanRobot extends Robot { void powerOn() { 청소시작(); } }",
      "Robot robot = new CleanRobot(); robot.powerOn();",
    ],
    imageUrl: "/hintrobot.png",
  },
};
export const mockProblemDetails = {
  5: {
    levels: [
      {
        level: 1,
        title: "전원 켜기,전원 끄기를 할 수 있는 로봇 인터페이스를 만드세요",
        hint: "로봇 1단계 힌트입니다~",
        answer: "interface(로봇)메소드: 전원켜기()전원끄기()",
      },
      {
        level: 2,
        title:
          "앞에서 만든 로봇 인터페이스를 이용해서 '청소하기' 기능을 가진 청소 로봇 클래스와 '요리하기' 기능을 가진 요리 로봇 클래스를 만드시오",
        hint: "로봇 2단계 힌트입니다~",
        answer:
          "클래스이름:청소클래스:(로봇)전원켜기: 청소하기전원끄기: 청소하기기능추가: 청소하기클래스이름:요리클래스:(로봇)전원켜기: 요리하기전원끄기: 요리하기기능추가: 요리하기",
      },
      {
        level: 3,
        title:
          "앞에서 만든 클래스를 이용해서 청소 로봇 '아이언맨'과 요리 로봇 '토르' 객체를 생성하고 아이언맨이 전원을 키고 청소를 하도록 main을 채우시오",
        hint: "로봇 3단계 힌트입니다~",
        answer:
          "청소로봇클래스:(로봇이름:아이언맨)요리로봇클래스:(로봇이름:토르)객체이름:아이언맨메소드 선택:op1객체이름:아이언맨메소드 선택:op3",
      },
    ],
  },
  1: {
    levels: [
      {
        level: 1,
        title: "1부터 100까지의 숫자를 저장할 수 있는 Game 클래스를 만드세요",
        hint: "private 변수를 사용해서 숫자를 보호하세요!",
        answer: "class Game { private int number; }",
      },
    ],
  },
  2: {
    levels: [
      {
        level: 1,
        title: "두 숫자를 더하는 Calculator 클래스를 만드세요",
        hint: "add 메소드를 만들어보세요!",
        answer:
          "class Calculator { public int add(int a, int b) { return a + b; } }",
      },
    ],
  },
};
export const mockQuizzes = {
  abstract: [
    {
      id: 1,
      question: "추상화는 복잡한 것을 단순하게 표현하는 것이다.",
      type: "OX",
      answer: "O",
      explanation:
        "추상화는 복잡한 시스템을 단순하게 표현하여 이해하기 쉽게 만드는 개념입니다.",
    },
    {
      id: 2,
      question: "인터페이스를 구현하는 클래스에서 반드시 해야 할 일은?",
      type: "MULTI",
      options: [
        "인터페이스의 모든 메소드 구현",
        "생성자 만들기",
        "변수 선언",
        "상속받기",
      ],
      answer: 0,
      explanation:
        "인터페이스를 구현하는 클래스는 인터페이스의 모든 추상 메소드를 반드시 구현해야 합니다.",
    },
  ],
  encapsulation: [
    {
      id: 1,
      question: "캡슐화는 데이터를 보호하는 개념이다.",
      type: "OX",
      answer: "O",
      explanation:
        "캡슐화는 데이터와 메소드를 하나로 묶고 외부 접근을 제한하여 데이터를 보호합니다.",
    },
  ],
  polymorphism: [
    {
      id: 1,
      question: "다형성은 하나의 인터페이스로 여러 형태를 다루는 것이다.",
      type: "OX",
      answer: "O",
      explanation:
        "다형성은 같은 인터페이스를 통해 서로 다른 타입의 객체를 동일하게 다룰 수 있게 해줍니다.",
    },
  ],
};
