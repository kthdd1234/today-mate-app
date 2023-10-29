import moment from 'moment';
import {getLocales} from 'react-native-localize';

const getLng = () => {
  return getLocales()[0].languageCode;
};

const getCalendarDate = () => {
  return moment(Date.now()).format('YYYY-MM-DD');
};

const getUniqueId = (num: number) => {
  return Date.now().toString() + num;
};

const stepLabels = ['외출 시간', '할 일', '외출 준비', '알림 설정'];

const initFullTime = {
  ampm: '오전',
  hour: '0',
  minute: '0',
};

const initTimeValues = {
  hour: '0',
  minute: '0',
};

const appointmentTimeItemList = [
  {
    time: '오전',
    hour: '9',
    minute: '00',
    text: '오전 9:00',
    emoji: '🕘',
  },
  {
    time: '오전',
    hour: '10',
    minute: '00',
    text: '오전 10:00',
    emoji: '🕙',
  },
  {
    time: '오전',
    hour: '12',
    minute: '30',
    text: '오전 12:30',
    emoji: '🕧',
  },
  {time: '오후', hour: '6', minute: '00', text: '오후 06:00', emoji: '🕕'},
  {time: '오후', hour: '7', minute: '30', text: '오후 07:30', emoji: '🕢'},
  {time: '', hour: '', minute: '', text: '직접 설정하기', emoji: '⚙️'},
];

const outingReadyItemList = [
  {text: '30분', emoji: '3️⃣0️⃣', minute: '30'},
  {text: '40분', emoji: '4️⃣0️⃣', minute: '40'},
  {text: '50분', emoji: '5️⃣0️⃣', minute: '50'},
  {text: '1시간', emoji: '6️⃣0️⃣', minute: '60'},
  {text: '1시간 30분', emoji: '9️⃣0️⃣', minute: '90'},
  {text: '직접 설정하기', emoji: '⚙️', minute: ''},
];

const todoItems = [
  {text: '가스레인지 벨브 잠그기', emoji: '⚙️'},
  {text: '전기 코드 뽑기', emoji: '🔌'},
  {text: '소등 하기', emoji: '💡'},
  {text: '문단속 철저히 하기', emoji: '🚪'},
  {text: '창문 제대로 잠겼는지 확인하기', emoji: '🪟'},
  {text: '도어락 지문 닦기', emoji: '🤏'},
  {text: '일기 예보 확인하기', emoji: '🌦️'},
  {text: '보일러 전원 끄기', emoji: '♨️'},
  {text: '전기 장판 끄기', emoji: '🛏️'},
  {text: '에어컨 전원 끄기', emoji: '💨'},
  {text: '휴대폰 충전기 챙기기', emoji: '🔌'},
  {text: '보조 배터리 챙기기', emoji: '🔋'},
  {text: '차 키 챙기기', emoji: '🔑'},
  {text: '우산 챙기기', emoji: '☂️'},
  {text: '에어팟 챙기기', emoji: '🎧️'},
  {text: '립밤 챙기기', emoji: '💄'},
  {text: '마스크 챙기기', emoji: '😷'},
  {text: '지갑 챙기기', emoji: '👛'},
  {text: '학교 수업 자료 챙기기', emoji: '📓'},
  {text: '선크림 꼼꼼히 바르기', emoji: '🧴'},
  {text: '향수 뿌리기', emoji: '🫧'},
  {text: '휴대폰 배터리 충전하기', emoji: '🪫'},
  {text: '간단한 스트레칭 하기', emoji: '🕺'},
  {text: '모아둔 쓰레기 버리기', emoji: '🗑️'},
  {text: '설거지 하기', emoji: '🧽'},
  {text: '강아지 사료 주기', emoji: '🐶'},
  {text: '고양이 사료 주기', emoji: '🐱'},
  {text: '세탁기 돌리기', emoji: '🧺'},
  {text: '화분에 물 주기', emoji: '🪴'},
  {text: '냉장고 청소하기', emoji: '🧊'},
  {text: '화장실 청소하기', emoji: '🚽'},
  {text: '빨래 하기', emoji: '👕'},
];

const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013',
};

const notifiCategories = {
  outingCId: '모두 완료 했어요!',
  taskCId: '완료 했어요!',
};

const outingTimeNotifiMessage = {
  title: '외출 시간이 되었어요 🌤️',
  body: '혹시 깜빡한 일은 없는지\n앱을 실행해서 확인해보세요 :)',
};

export {
  getCalendarDate,
  getUniqueId,
  getLng,
  appointmentTimeItemList,
  outingReadyItemList,
  initFullTime,
  todoItems,
  stepLabels,
  customStyles,
  outingTimeNotifiMessage,
  notifiCategories,
  initTimeValues,
};
