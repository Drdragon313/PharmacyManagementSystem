import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice/formSlice";
import schemaReducer from "../features/SchemaSlice/schemaSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    schema: schemaReducer,
  },
});

export default store;
