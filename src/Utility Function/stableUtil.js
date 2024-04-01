import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
const localHeader = localStorage.getItem("AuthorizationToken");
export async function saveSchema(
  navigate,
  schemaName,
  formDataArray,
  tilePath,

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
            Authorization: localHeader,
          },
        }
      );

      if (response.status === 200) {
        message.success("Schema created successfully");
        successCallback(newSchema);
      } else {
        console.error("Error:", response);
        message.error(
          "Error occurred while saving schema. schema with this name already exists"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      navigate("/tilepage");
      window.location.reload();
    }
  } else {
    console.error("No rows to save in the schema.");
    message.warning("No rows to save in the schema.");
  }
}
export function updateFormDataArrayOnEdit(formDataArray, editedData) {
  return formDataArray.map((entry) =>
    entry.id === editedData.id ? editedData : entry
  );
}
