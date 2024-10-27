

const SendReguest = async (url, method, dataForm) => {
  const confgFetch = {
    method: method,
    headers: { "content-Type": "application/json" },
  };

  method == "post" && (confgFetch.body = dataForm);

  let peticion = await (await fetch(url, confgFetch)).json();
  return await peticion;
};

export {SendReguest};