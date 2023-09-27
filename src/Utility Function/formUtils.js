export const addRowToFormData = (formDataArray, rowId, formDataEntry) => {
    formDataEntry.id = rowId;
    return [...formDataArray, formDataEntry];
  };
  
  export const deleteRowFromFormData = (formDataArray, id) => {
    return formDataArray.filter((entry) => entry.id !== id);
  };
  
  export const editRowInFormData = (formDataArray, id, updatedData) => {
    return formDataArray.map((entry) =>
      entry.id === id ? { ...entry, ...updatedData } : entry
    );
  };