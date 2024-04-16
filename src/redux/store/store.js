import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice/formSlice";
import schemaReducer from "../features/SchemaSlice/schemaSlice";
import SchemaSelectionReducer from "../features/SchemaSelectionSlice/SchemaSelectionSlice";
import SigninReducer from "../features/SigninSlice/SigninSlice";
import PharmaciesReducer from "../features/PharmaciesSlice/PharmaciesSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    schema: schemaReducer,
    SchemaSelection: SchemaSelectionReducer,
    Signin: SigninReducer,
    pharmacies: PharmaciesReducer,
  },
});

export default store;
