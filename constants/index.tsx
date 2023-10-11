import {eTodoGroupIds} from '../types/enum';

const getUniqueId = (num: number) => {
  return Date.now().toString() + num;
};

const todoGroupNames = {
  [eTodoGroupIds.Safety]: '안전 점검',
  [eTodoGroupIds.Taking]: '물건 챙기기',
  [eTodoGroupIds.Work]: '할 일',
};

const initOutingTime = {
  time: '',
  hour: '',
  minute: '',
};

const initOutingBeforeTodo = {
  groupId: eTodoGroupIds.None,
  title: '',
  data: [''],
};

const outingTimeStates = [
  {time: '오전', hour: '8', minute: '00'},
  {time: '오전', hour: '9', minute: '00'},
  {time: '오전', hour: '10', minute: '00'},
  {time: '오후', hour: '6', minute: '00'},
  {time: '오후', hour: '7', minute: '00'},
];

const outingTimeItems = [
  {id: '0', text: '오전 8:00', emoji: '🕗'},
  {id: '1', text: '오전 9:00', emoji: '🕘'},
  {id: '2', text: '오전 10:00', emoji: '🕙'},
  {id: '3', text: '오후 6:00', emoji: '🕕'},
  {id: '4', text: '오전 7:00', emoji: '🕖'},
  {id: '5', text: '외출 시간 설정', emoji: '⚙️'},
];

const safetyInspectionItems = [
  {id: '0', text: '가스레인지 벨브 잠그기', emoji: '⚙️'},
  {id: '1', text: '전기 코드 뽑기', emoji: '🔌'},
  {id: '2', text: '소등 하기', emoji: '💡'},
  {id: '3', text: '문단속 철저히 하기', emoji: '🚪'},
  {id: '4', text: '창문 제대로 잠겼는지 확인하기', emoji: '🪟'},
  {id: '5', text: '도어락 지문 닦기', emoji: '🤏'},
  {id: '6', text: '일기 예보 확인하기', emoji: '🌦️'},
  {id: '7', text: '보일러 전원 끄기', emoji: '♨️'},
  {id: '8', text: '전기 장판 끄기', emoji: '🛏️'},
  {id: '9', text: '에어컨 전원 끄기', emoji: '💨'},
];

const takinkThingItems = [
  {id: '0', text: '휴대폰 충전기 챙기기', emoji: '🔌'},
  {id: '1', text: '보조 배터리 챙기기', emoji: '🔋'},
  {id: '2', text: '차 키 챙기기', emoji: '🔑'},
  {id: '3', text: '우산 챙기기', emoji: '☂️'},
  {id: '4', text: '에어팟 챙기기', emoji: '🎧️'},
  {id: '5', text: '립밤 챙기기', emoji: '💄'},
  {id: '6', text: '마스크 챙기기', emoji: '😷'},
  {id: '7', text: '지갑 챙기기', emoji: '👛'},
  {id: '8', text: '학교 수업 자료 챙기기', emoji: '📓'},
];

const todoWorkItems = [
  {id: '0', text: '선크림 꼼꼼이 바르기', emoji: '🧴'},
  {id: '1', text: '향수 뿌리기', emoji: '🫧'},
  {id: '2', text: '간단한 스트레칭 하기', emoji: '🕺'},
  {id: '3', text: '모아둔 쓰레기 버리기', emoji: '🗑️'},
  {id: '4', text: '설거지 하기', emoji: '🧽'},
  {id: '5', text: '강아지 사료 주기', emoji: '🐶'},
  {id: '6', text: '고양이 사료 주기', emoji: '🐱'},
  {id: '7', text: '세탁기 돌리기', emoji: '🧺'},
  {id: '8', text: '화분에 물 주기', emoji: '🪴'},
  {id: '9', text: '냉장고 청소하기', emoji: '🧊'},
  {id: '10', text: '화장실 청소하기', emoji: '🚽'},
  {id: '11', text: '빨래 하기', emoji: '👕'},
];

// const todoWorkItems = {
//   groupId: eTodoGroupIds.Work,
//   title: '할 일',
//   data: [
//     '선크림 꼼꼼이 바르기',
//     '향수 뿌리기',
//     '화분에 물 주기',
//     '세탁기 돌리기',
//     '설거지하기',
//     '모아둔 쓰레기 버리기',
//     '강아지 사료 주기',
//     '고양이 사료 주기',
//     '간단한 스트레칭 하기',
//     '냉장고 청소하기',
//     '화장실 청소하기',
//     '빨래하기',
//   ],
// };

export {
  todoGroupNames,
  outingTimeStates,
  outingTimeItems,
  initOutingTime,
  initOutingBeforeTodo,
  safetyInspectionItems,
  takinkThingItems,
  todoWorkItems,
  getUniqueId,
};
