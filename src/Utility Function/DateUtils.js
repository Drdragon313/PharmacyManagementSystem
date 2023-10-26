export function getMaxDate() {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 10);
  const year = maxDate.getFullYear();
  const month = 12;
  const day = 31;
  return `${year}-${month}-${day}`;
}
