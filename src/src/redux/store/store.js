import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice/formSlice";
import schemaReducer from "../features/SchemaSlice/schemaSlice";
import SchemaSelectionReducer from "../features/SchemaSelectionSlice/SchemaSelectionSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    schema: schemaReducer,
    SchemaSelection:SchemaSelectionReducer
  },
});

export default store;
