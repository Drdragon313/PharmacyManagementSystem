export const reorderFormDataArray = (formDataArray, startIndex, endIndex) => {
  if (startIndex === endIndex) {
    return formDataArray;
  }

  const reorderedData = [...formDataArray];
  const startItem = reorderedData[startIndex];
  const endItem = reorderedData[endIndex];

  const newStartItem = { ...startItem, id: endItem.id };
  const newEndItem = { ...endItem, id: startItem.id };

  reorderedData[startIndex] = newEndItem;
  reorderedData[endIndex] = newStartItem;

  return reorderedData;
};
