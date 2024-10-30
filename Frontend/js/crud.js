

const SendReguest = async (url, method, dataForm) => {

  const confgFetch = {
    method: method,
    headers: { "content-Type": "application/json" },
  };
/*   if (dataForm.hasOwnProperty("id")) {
    console.log(dataForm.id);
    confgFetch.body = dataForm.id;
  } */
  method == "post" && (confgFetch.body = dataForm);

  let peticion = await (await fetch(url, confgFetch)).json();
  return peticion;
};

export {SendReguest};