
const GetDataList = async (url) => {
  console.log("obteniendo Data");
  let dataJson = await (await fetch(url)).json();
  return await dataJson;
};


export {GetDataList};