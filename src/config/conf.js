export const hourEntry = (() => {
  const result = [];
  for (let value = 0; value < 24; value++) {
    const name = value < 12 ? `오전 ${value}시` : `오후 ${value}시`;
    result.push({value, name});
  }
  return result;
})();

export const minEntry = [
  {value: 0, name: "0분"},
  {value: 10, name: "10분"},
  {value: 20, name: "20분"},
  {value: 30, name: "30분"},
  {value: 40, name: "40분"},
  {value: 50, name: "50분"},
];

export const dayDefault = ["일", "월", "화", "수", "목", "금", "토"];

export const dummyCalendar = new Array(35).fill({type: "dummy", date: 1});
