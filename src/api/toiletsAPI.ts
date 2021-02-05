export const hello = async () => {
  console.log("About to call API");
  const response = await fetch("/.netlify/functions/hello");

  const json = await response.json();

  return json.map((row: any) => ({ ...row.data, id: row.ref["@ref"].id }));
};
