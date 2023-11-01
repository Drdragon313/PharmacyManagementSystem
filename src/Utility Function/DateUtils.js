export function getMaxDate() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 18);
  const year = maxDate.getFullYear();
  const month = 12;
  const day = 31;
  return `${year}-${month}-${day}`;
}

export function getMinDate() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 100);
  const year = maxDate.getFullYear();
  const month = 12;
  const day = 31;
  return `${year}-${month}-${day}`;
}

export const handleBlur = (name, value, userData, setUserData) => {
  const minDate = getMinDate();
  const maxDate = getMaxDate();

  if (value < minDate) {
    setUserData({
      ...userData,
      [name]: minDate,
    });
  } else if (value > maxDate) {
    setUserData({
      ...userData,
      [name]: maxDate,
    });
  }
};
