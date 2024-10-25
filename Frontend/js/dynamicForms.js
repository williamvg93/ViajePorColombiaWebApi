
const inputOptions = [
  "origin",
  "destination",
  "price",
  "trasportId",
  "flightCarries",
  "flightNumber",
];

const CreateForms = (listaElementos, method, btn) => {

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

    listaElementos.forEach(element => {
        if (inputOptions.includes(element)) {
            let divFormGroup = document.createElement("div");
            divFormGroup.classList.add("mb-3", "w-100");

            let label = document.createElement("label");
            label.textContent = element.toUpperCase();
            label.setAttribute("for", element);
            label.classList.add("form-label");

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("id", element);
            input.setAttribute("name", element);
            input.classList.add("form-control");

            divFormGroup.appendChild(label);
            divFormGroup.appendChild(input);

            form.appendChild(divFormGroup);
        }
    });

    let btnForm = document.createElement("button");
    btnForm.classList.add("btn", "btn-primary", "w-75", "mt-4", "mb-3", "p-3", "fs-5");
    btnForm.setAttribute("id", btn[0]);
    btnForm.setAttribute("type", "submit");
    btnForm.textContent = btn[1];

    form.appendChild(btnForm);

    return form;
    
}


export { CreateForms };