export const addRow = (formDataArray, rowId, dispatch, addFormData, setRowId) => {
    const newFormDataArray = [...formDataArray];
    const formData = { ...formDataArray };
    formData.id = rowId;
    newFormDataArray.push(formData);
    dispatch(addFormData(newFormDataArray));
    setRowId(rowId + 1);
  };
  