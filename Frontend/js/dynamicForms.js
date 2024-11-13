const inputOptions = [
  "origin",
  "destination",
  "price",
  "flightCarries",
  "flightNumber",
];

const selectOptions = ["trasportId"];

const CheckData = (dataList) => {
  const strData = ["origin", "destination"];
  const intData = ["price"];
  const idData = ["trasportId"];
  const alphaData = ["flightNumber", "flightCarries"];
  const alfaRegExp = /^[a-zA-Z0-9]{3,}( [a-zA-Z0-9]+)*$/;
  const strRegExp = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,}$/;
  const numRegExp = /^\d{3,}$/;
  const iDRegExp = /^\d{1,}$/;

  let dataCheked = { status: true, msg: "" };

  Object.keys(dataList).forEach((key) => {
    if (strData.includes(key)) {
      if (!strRegExp.test(dataList[key])) {
        dataCheked.msg += `${key} field only allows letters without spaces and must have a minimum of 3 characters </br>`;
        dataCheked.status = false;
      }
    }
    if (intData.includes(key)) {
      if (!numRegExp.test(dataList[key])) {
        dataCheked.msg += `${key} field only allows Numbers without spaces and must have a minimum of 3 characters</br>`;
        dataCheked.status = false;
      }
    }
    if (alphaData.includes(key)) {
      if (!alfaRegExp.test(dataList[key])) {
        dataCheked.msg += `${key} field only allows Numbers and Letters without spaces and must have a minimum of 3 characters</br>`;
        dataCheked.status = false;
      }
    }
    if (idData.includes(key)) {
      if (!iDRegExp.test(dataList[key])) {
        dataCheked.msg += `${key} field only allows Numbers without spaces and must have a minimum of 1 characters</br>`;
        dataCheked.status = false;
      }
    }
  });
  return dataCheked;
};

const CreateFormCont = (formEle, title) => {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "text-bg-dark", "col-md-5", "mt-4");

  let cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "fs-1", "text-center");
  cardHeader.textContent = title;

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "justify-content-center");

  cardContainer.appendChild(cardHeader);
  cardBody.appendChild(formEle);
  cardContainer.appendChild(cardBody);
  return cardContainer;
};

const CreateFormElements = (elem, data, dataFkSelect="",method="post") => {

  let divFormGroup = document.createElement("div");
  divFormGroup.classList.add("mb-3", "w-100");

  let label = document.createElement("label");
  label.textContent = elem.toUpperCase();
  label.setAttribute("for", elem);
  label.classList.add("form-label");
  let input;
  let select;

  divFormGroup.appendChild(label);

  if (inputOptions.includes(elem)) {
    input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", elem);
    input.setAttribute("name", elem);
    input.setAttribute("value", data);
    input.classList.add("form-control");

    divFormGroup.appendChild(input);
  }

  if (selectOptions.includes(elem)) {
    select = "";
    select = document.createElement("select");
    select.setAttribute("id", elem);
    select.setAttribute("name", elem);
    select.classList.add("form-select");
    console.log(elem);
    console.log(data);
    let defaulOpt = document.createElement("option");
    defaulOpt.setAttribute("selected", "true");
    
    if (method == "put") {      
      defaulOpt.setAttribute("value", data);
      const flight = dataFkSelect.find(fli => fli.id === data);
      const defa = flight ? flight.flightCarries : null;
      defaulOpt.textContent = defa;
    } else {
      defaulOpt.setAttribute("value", 0);
      defaulOpt.textContent = "Seleccione una Opción";
    }
    select.appendChild(defaulOpt);

    console.log(dataFkSelect);
    dataFkSelect.forEach((opti) => {
      console.log(opti);
      let selOpti = document.createElement("option");
      selOpti.setAttribute("value", opti.id);
      selOpti.textContent = opti.flightCarries;
      select.appendChild(selOpti);
    });

    divFormGroup.appendChild(select);
  }

  return divFormGroup;
};

const CreateFormBtn = (btnAtt) => {
  let btnForm = document.createElement("button");
  btnForm.classList.add(
    "btn",
    "btn-primary",
    "w-75",
    "mt-4",
    "mb-3",
    "p-3",
    "fs-5"
  );
  btnForm.setAttribute("id", btnAtt.id);
  btnForm.setAttribute("type", "submit");
  btnForm.textContent = btnAtt.text;
  if (btnAtt.id == "btnEdit") {
    btnForm.setAttribute("value", btnAtt.value);
  }
  return btnForm;
};

const FormElements = (listaElementos, formAtt, btn) => {
  let form = document.createElement("form");
  form.setAttribute("methohd", formAtt.method);
  form.setAttribute("id", formAtt.id);
  form.classList.add(
    "w-100",
    "d-flex",
    "flex-column",
    "justify-content-center",
    "align-items-center"
  );

  console.log(listaElementos);
  console.log(typeof listaElementos);
  console.log(Array.isArray(listaElementos));

/*   listaElementos.forEach((element) => {
    console.log(element);
  });
 */
  console.log(formAtt.table);
  let dataFkSelect = "";
  if (formAtt.table == "Flight") {
    dataFkSelect = listaElementos[4];
  }
  console.log(dataFkSelect);

  if (Array.isArray(listaElementos)) {
    listaElementos.forEach((element) => {
      console.log(element);
      if (inputOptions.includes(element)) {
        form.appendChild(CreateFormElements(element, "", ""));
      }
      if (selectOptions.includes(element)) {
        form.appendChild(CreateFormElements(element, "", dataFkSelect));
      }
    });
  } else if (listaElementos !== null && typeof listaElementos === "object") {
    Object.keys(listaElementos).forEach((key) => {
      console.log(`key: ${key} -- val: ${listaElementos[key]}`);
      if (inputOptions.includes(key) || selectOptions.includes(key)) {
        if (formAtt.table == "Flight") {
          dataFkSelect = listaElementos.TranspList;
        }
        form.appendChild(
          CreateFormElements(key, listaElementos[key], dataFkSelect, "put")
        );
      }
    });
  } else {
    console.log("error recibiendo datos del formulario");
  }

  form.appendChild(CreateFormBtn(btn));

  return form;
};

export { CreateFormCont, FormElements, CheckData };
