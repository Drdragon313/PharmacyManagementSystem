import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schemaDataArray: [],
  schemaName: "",
};

const schemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    addSchemaData: (state, action) => {
      state.schemaDataArray.push(action.payload);
    },
    removeSchemaData: (state, action) => {
      const indexToRemove = action.payload;
      state.schemaDataArray.splice(indexToRemove, 1);
    },
    resetSchemaDataArray: (state) => {
      state.schemaDataArray = [];
    },
    updateSchemaName: (state, action) => {
      state.schemaName = action.payload;
    },
    updateSchemaDataOrder: (state, action) => {
      const { schemaId, updatedData } = action.payload;
      state.schemaDataArray[schemaId].data = updatedData;
    },
    addData: (state, action) => {
      const { schemaId, data } = action.payload;
      state.schemaDataArray[schemaId].data.push(data);
    },
    removeData: (state, action) => {
      const { schemaId, dataId } = action.payload;
      state.schemaDataArray[schemaId].data = state.schemaDataArray[
        schemaId
      ].data.filter((item) => item.id !== dataId);
    },
    updateData: (state, action) => {
      const { schemaId, updatedData } = action.payload;
      const dataItem = state.schemaDataArray[schemaId].data.find(
        (item) => item.id === updatedData.id
      );
      if (dataItem) {
        Object.assign(dataItem, updatedData);
      }
    },
  },
});

export const {
  addSchemaData,
  removeSchemaData,
  updateSchemaName,
  updateSchemaDataOrder,
  addData,
  removeData,
  updateData,
  resetSchemaDataArray,
} = schemaSlice.actions;
export default schemaSlice.reducer;
