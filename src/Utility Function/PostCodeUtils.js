import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
export const PostCodeHandler = (data, setPCodeResponse, setData) => {
  console.log("sending:", data.postCode);
  axios
    .post(`${baseURL}/postcode-lookup`, { postCode: data.postCode })
    .then((response) => {
      if (response.status === 200) {
        setPCodeResponse(response.data);

        // Only call AddressHandler if the status is 200
        AddressHandler(setData, response.data[0].udprn);
      } else {
        setPCodeResponse([]);
        message.error(
          "Postcode lookup failed with status: " + response.status,
          3
        );
      }
    })
    .catch(() => {
      setPCodeResponse([]);

      message.error("Postcode lookup failed. Kindly enter manually!", 3);
    });
};

export const AddressHandler = (setData, selectedUdprn) => {
  axios
    .post(`${baseURL}/address-lookup`, { udprn: selectedUdprn })
    .then((response) => {
      setData((prevData) => ({
        ...prevData,
        postCode: response.data.postCode,
        Line1: response.data.Line1,
        Line2: response.data.Line2,
        postTown: response.data.postTown,
      }));
    })
    .catch(() => {
      message.error("Address fetching Failed. Kindly enter Manually!", 3);
    });
};
