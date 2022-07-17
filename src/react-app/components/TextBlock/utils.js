export const calculateTimeDiff = (timeList) => {
  const timeDiff = [0];

  for (let i = 1; i < timeList.length; i++) {
    timeDiff.push(timeList[i] - timeList[i - 1]);
  }

  return timeDiff;
};
