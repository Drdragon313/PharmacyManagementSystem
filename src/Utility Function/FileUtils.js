import Papa from "papaparse";

export const validateCSV = async (file, index, schemaDataArray) => {
  return new Promise((resolve, reject) => {
    let hasInvalidChunk = false;
    let rowNumber = 0;
    let errorArray = [];
    if (index !== null && index !== undefined) {
      const selectedSchemaData = schemaDataArray[index];

      Papa.parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,

        chunk: (results) => {
          const csvHeaders = Object.keys(results.data[0]);
          const schemaHeaders = selectedSchemaData.data.map(
            (item) => item.Fieldname
          );

          if (!arraysEqual(csvHeaders, schemaHeaders)) {
            hasInvalidChunk = true;
            reject("CSV file does not match the required structure.");
          }

          results.data.forEach((row) => {
            rowNumber++;
            selectedSchemaData.data.forEach((item) => {
              const fieldName = item.Fieldname;
              const expectedType = item.Type;
              const actualType = typeof row[fieldName];
              if (actualType !== expectedType) {
                hasInvalidChunk = true;
                // reject(
                //   `Invalid data type for column ${fieldName} at row ${rowNumber}.`
                // );
                errorArray.push(
                  `Invalid data type for column ${fieldName} at row ${rowNumber}.`
                );
              }
            });
          });
        },

        complete: () => {
          if (!hasInvalidChunk) {
            resolve();
          } else {
            reject(errorArray);
          }
        },
      });
    } else {
      alert("no index");
    }
  });
};

export const arraysEqual = (CSVArray, SchemaArray) => {
  if (CSVArray.length !== SchemaArray.length) return false;
  for (let i = 0; i < CSVArray.length; i++) {
    if (CSVArray[i] !== SchemaArray[i]) return false;
  }
  return true;
};
