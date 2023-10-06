const convertData = (data: string[]) => {
  return data.map((name, i) => ({id: (Date.now() + i).toString(), name: name}));
};

const outingBeforeCheckList = [
  {
    title: '안전 점검',
    data: convertData([
      '가스레인지 벨브 잠그기',
      '수도꼭지 제대로 잠그기',
      '문단속 철저히 하기',
      '창문 제대로 잠겼는지 확인하기',
      '도어락 지문 닦기',
      '전기 코드 뽑기',
      '에어컨 전원 끄기',
      '보일러 전원 끄기',
      '전기 장판 끄기',
      '일기 예보 확인하기',
    ]),
  },
  {
    title: '물건 챙기기',
    data: convertData([
      '휴대폰 충전기 챙기기',
      '보조 배터리 챙기기',
      '차 키 챙기기',
      '우산 챙기기',
      '에어팟 챙기기',
      '립밤 챙기기',
      '마스크 챙기기',
      '학교 수업 자료 챙기기',
    ]),
  },
  {
    title: '할 일',
    data: convertData([
      '선크림 꼼꼼이 바르기',
      '향수 뿌리기',
      '화분에 물주기',
      '세탁기 돌리기',
      '설거지하기',
      '모아둔 쓰레기 버리기',
      '강아지 사료 주기',
      '고양이 사료 주기',
      '간단한 스트레칭 하기',
      '냉장고 청소하기',
      '화장실 청소하기',
      '빨래하기',
      '화분에 물주기',
    ]),
  },
];

const sectionColors = {
  safetyInspection: 'red',
  takingObject: 'blue',
  todo: 'green',
};

const actions = [
  {
    text: '안전 점검',
    icon: require('./images/ic_accessibility_white.png'),
    name: 'safetyInspection',
    position: 1,
  },
  {
    text: '물건 챙김',
    icon: require('./images/ic_language_white.png'),
    name: 'takingObject',
    position: 2,
  },
  {
    text: '할 일',
    icon: require('./images/ic_room_white.png'),
    name: 'todo',
    position: 3,
  },
];

export {outingBeforeCheckList, sectionColors};