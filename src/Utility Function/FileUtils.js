import Papa from "papaparse";

export const validateCSV = async (file, schemaData, setProgress) => {
  return new Promise((resolve, reject) => {
    let hasInvalidChunk = false;
    let rowNumber = 0;
    let errorArray = [];
    let totalLines = 0;
    Papa.parse(file, {
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      chunk: (results) => {
        const schemaDataArray = JSON.parse(schemaData);
        console.log("This is schema Data:", schemaDataArray);
        totalLines += results.data.length;
        let progress = Math.round((totalLines / file.size) * 10000);
        setProgress(progress);
        const csvHeaders = Object.keys(results.data[0]);
        const schemaHeaders = schemaDataArray.map((item) => item.Fieldname);
        if (!arraysEqual(csvHeaders, schemaHeaders)) {
          hasInvalidChunk = true;
          errorArray.push("CSV file does not match the required structure.");
        }
        results.data.forEach((row) => {
          rowNumber++;
          schemaDataArray.forEach((item) => {
            const fieldName = item.Fieldname;
            const expectedType = item.Type;
            const actualType = typeof row[fieldName];
            if (actualType !== expectedType) {
              hasInvalidChunk = true;
              errorArray.push(
                `Invalid data type for column ${fieldName} at row ${
                  rowNumber + 1
                }, Expected datatype ${expectedType} but instead got ${actualType}.`
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
  });
};

export const arraysEqual = (CSVArray, SchemaArray) => {
  if (CSVArray.length !== SchemaArray.length) return false;
  for (let i = 0; i < CSVArray.length; i++) {
    if (CSVArray[i] !== SchemaArray[i]) return false;
  }
  return true;
};
