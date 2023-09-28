import React, { createContext, useContext, useState } from "react";

const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
  const [typeOptions] = useState([
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
  ]);

  const [validationOptions] = useState([
    { value: "CamelCase", label: "Camel Case" },
    { value: "SpecialCharacter", label: "Special Character" },
    { value: "Integer", label: "Integer" },
    { value: "Decimal", label: "Decimal" },
    { value: "Required", label: "Required" },
  ]);

  return (
    <OptionsContext.Provider value={{ typeOptions, validationOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  return useContext(OptionsContext);
};
