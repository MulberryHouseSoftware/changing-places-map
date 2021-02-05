export const readAll = async () => {
  console.log("About to call API");
  const response = await fetch("/.netlify/functions/read-all");

  const json = await response.json();

  return json.map((row: any) => ({ ...row.data, id: row.ref["@ref"].id }));
};
