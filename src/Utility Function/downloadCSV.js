export const downloadCSV = (schemaDataArray, schemaName) => {
  const matchingSchema = schemaDataArray.find(
    (entry) => entry.name === schemaName
  );

  if (!matchingSchema) {
    console.error(`Schema "${schemaName}" not found.`);
    return;
  }
  const fieldNames = matchingSchema.data.map((entry) => entry.Fieldname);

  const csvContent = fieldNames.join(",") + "\n";
  const encodedCSV = encodeURIComponent(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedCSV}`);
  link.setAttribute("download", `${schemaName}.csv`);
  document.body.appendChild(link);
  link.click();
};
