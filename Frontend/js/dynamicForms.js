
const inputOptions = [
  "origin",
  "destination",
  "price",
  "trasportId",
  "flightCarries",
  "flightNumber",
];


const CreateFormCont = (formEle, formInfo) => {
  let cardContainer = document.createElement("div");
  cardContainer.classList.add("card", "text-bg-dark", "col-md-5", "mt-4");

  let cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header", "fs-1", "text-center");
  cardHeader.textContent = formInfo;

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex", "justify-content-center");

  cardContainer.appendChild(cardHeader);
  cardBody.appendChild(formEle);
  cardContainer.appendChild(cardBody);
  return cardContainer;
};

const CreateFormElements = (elem, data) => {
  let divFormGroup = document.createElement("div");
  divFormGroup.classList.add("mb-3", "w-100");

  let label = document.createElement("label");
  label.textContent = elem.toUpperCase();
  label.setAttribute("for", elem);
  label.classList.add("form-label");

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", elem);
  input.setAttribute("name", elem);
  input.setAttribute("value", data);
  input.classList.add("form-control");

  divFormGroup.appendChild(label);
  divFormGroup.appendChild(input);

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
  btnForm.setAttribute("id", btnAtt[0]);
  btnForm.setAttribute("type", "submit");
  btnForm.textContent = btnAtt[1];
  return btnForm;
};


const FormElements = (listaElementos, method, btn) => {
  let form = document.createElement("form");
  form.setAttribute("methohd", method);
  form.setAttribute("id", "formAdd");
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

  if (Array.isArray(listaElementos)) {
    listaElementos.forEach((element) => {
      if (inputOptions.includes(element)) {
        form.appendChild(CreateFormElements(element, ""));
      }
    });
  } else if (listaElementos !== null && typeof listaElementos === "object") {
    Object.keys(listaElementos).forEach(key => {
      console.log(`key: ${key} -- val: ${listaElementos[key]}`);
      if (inputOptions.includes(key)) {
        form.appendChild(CreateFormElements(key, listaElementos[key]));
      }
    });
  } else {
    console.log("error recibiendo datos del formulario");
  }

  form.appendChild(CreateFormBtn(btn));

  return form;
};


export { CreateFormCont, FormElements };