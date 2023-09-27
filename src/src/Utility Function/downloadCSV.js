export const downloadCSV = (formDataArray) => {
  const fieldNames = formDataArray.map((entry) => entry.Fieldname);
  const csvContent = fieldNames.join(",") + "\n";
  const encodedCSV = encodeURIComponent(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", `data:text/csv;charset=utf-8,${encodedCSV}`);
  link.setAttribute("download", "field_names.csv");
  document.body.appendChild(link);
  link.click();
};
