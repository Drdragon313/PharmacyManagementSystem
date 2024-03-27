import axios from "axios";
import { baseURL } from "../Components/BaseURLAPI/BaseURLAPI";
import { message } from "antd";
const ukPostcodeRegex =
  /^([A-PR-UWYZa-pr-uwyz][A-HK-Ya-hk-y]?[0-9][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}|[Gg][Ii][Rr] 0[Aa]{2})$/;

export const PostCodeHandler = (data, setPCodeResponse, setData) => {
  // Check if the postcode matches the regex pattern
  if (!ukPostcodeRegex.test(data.postCode)) {
    message.error("Please enter a valid UK postcode");
    return;
  }

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
      // message.error("Postcode lookup failed. Kindly enter manually!", 3);
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
      // message.error("Address fetching Failed. Kindly enter Manually!", 3);
    });
};
