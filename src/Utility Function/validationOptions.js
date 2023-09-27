export const filterValidationOptions = (selectedType, validationOptions) => {
  switch (selectedType) {
    case "string":
      return validationOptions.filter(
        (option) =>
          option.value === "CamelCase" || option.value === "SpecialCharacter"
      );
    case "number":
      return validationOptions.filter(
        (option) => option.value === "Integer" || option.value === "Decimal"
      );
    case "boolean":
      return validationOptions.filter((option) => option.value === "Required");
    default:
      return [];
  }
};
