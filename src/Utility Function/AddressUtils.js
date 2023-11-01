export const handleCountryChange = (
  selectedCountryValue,
  setSelectedCountryObject,
  setStateData,
  setUserData,
  countryData,
  State
) => {
  const selectedCountry = countryData.find(
    (country) => country.name === selectedCountryValue
  );
  setSelectedCountryObject(selectedCountry);
  const statesForSelectedCountry = State.getStatesOfCountry(
    selectedCountry.isoCode
  );
  setStateData(statesForSelectedCountry);
  setUserData((prevUserData) => ({
    ...prevUserData,
    Country: selectedCountryValue,
  }));
};

export const handleStateChange = (
  selectedStateValue,
  setCityData,
  setUserData,
  City,
  allStateData,
  selectedCountryObject
) => {
  const currentState = allStateData.find(
    (state) => state.name === selectedStateValue
  );
  const citiesForSelectedState = City.getCitiesOfState(
    selectedCountryObject.isoCode,
    currentState.isoCode
  );
  setCityData(citiesForSelectedState);
  setUserData((prevUserData) => ({
    ...prevUserData,
    State: selectedStateValue,
  }));
};

export const handleCityChange = (selectedCityValue, setUserData) => {
  setUserData((prevUserData) => ({
    ...prevUserData,
    City: selectedCityValue,
  }));
};
