import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
export async function saveSchema(
  schemaName,
  formDataArray,
  tilePath,
  dispatch,
  successCallback
) {
  if (formDataArray.length > 0) {
    const newSchema = {
      name: schemaName,
      data: formDataArray,
    };

    try {
      const response = await axios.post(
        `${baseURL}/save-tile-schema?tilePath=${tilePath}`,
        {
          schema: {
            schemaDataArray: [{ ...newSchema }],
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        successCallback(newSchema);
      } else {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    console.error("No rows to save in the schema.");
  }
}
export function updateFormDataArrayOnEdit(formDataArray, editedData) {
  return formDataArray.map((entry) =>
    entry.id === editedData.id ? editedData : entry
  );
}
