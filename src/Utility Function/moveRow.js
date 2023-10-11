export const moveRow = (fromId, toId, data, dispatch, updateFormDataOrder) => {
  if (fromId === toId) {
    return;
  }

  const updatedDataArray = data.map((row) => ({ ...row }));
  const fromIndex = updatedDataArray.findIndex((row) => row.id === fromId);
  const toIndex = updatedDataArray.findIndex((row) => row.id === toId);

  if (fromIndex !== -1 && toIndex !== -1) {
    const sourceRow = updatedDataArray[fromIndex];
    const destinationRow = updatedDataArray[toIndex];
    sourceRow.id = destinationRow.id;
    destinationRow.id = fromId;
    [updatedDataArray[fromIndex], updatedDataArray[toIndex]] = [
      updatedDataArray[toIndex],
      updatedDataArray[fromIndex],
    ];

    dispatch(updateFormDataOrder(updatedDataArray));
  }
};
