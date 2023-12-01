import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";

export const PostCodeHandler = (data, setPCodeResponse) => {
  console.log("sending:", data.postCode);
  axios
    .post(`${baseURL}/postcode-lookup`, { postCode: data.postCode })
    .then((response) => {
      setPCodeResponse(response.data);
      console.log("This is the Response:", response.data);
    })
    .catch((error) => {
      console.log(error);
      message.error("Address fetching Failed. Kindly enter Manually!", 3);
    });
};

export const AddressHandler = (setData, selectedUdprn) => {
  axios
    .post(`${baseURL}/address-lookup`, { udprn: selectedUdprn })
    .then((response) => {
      console.log("Address Lookup API", response.data);
      setData({
        postCode: response.data.postCode,
        Line1: response.data.Line1,
        Line2: response.data.Line2,
        postTown: response.data.postTown,
      });
    })
    .catch((error) => {
      console.log(error);
      message.error("Address fetching Failed. Kindly enter Manually!", 3);
    });
};
