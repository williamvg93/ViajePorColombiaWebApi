import { CreateDataListTable, TableToContainer } from "./dynamicTables.js";
import { FormElements, CreateFormCont } from "./dynamicForms.js";
import { SendReguest } from "./crud.js";
import { CreateMsgAlert } from "./msgAlert.js";

document.addEventListener("DOMContentLoaded", () => {

  const btnsForm = document.querySelectorAll(".btn_funtion");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");


  const ObtenerDataList = (url, method, tableInfo, btnName, msg) => {

    SendReguest(url, method, "")
      .then((data) => {
        let table = CreateDataListTable(data, tableInfo, mainContainer, btnName);
        mainPageTitle.textContent = tableInfo;
        mainContainer.appendChild(TableToContainer(table));

        if (msg !== null && typeof msg === "object") {
          mainContainer.prepend(CreateMsgAlert(msg.success));
        }

        let btnDelete = document.querySelectorAll("#deleteBtn");
        let btnUpdate = document.querySelectorAll("#editBtn");
        btnDelete.forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            let urlEnti = e.target.getAttribute("name");
            let urlId = e.target.getAttribute("value");
            const urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/${urlId}`;
            SendReguest(urlReq, "delete", "").then(
              (data) => {
                console.log(data);
                ObtenerDataList(url, method, tableInfo, btnName, data);
              }
            );
            console.log(urlReq);
          });
        });

        btnUpdate.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            let urlEnti = e.target.getAttribute("name");
            let urlId = e.target.getAttribute("value");
            const urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/${urlId}`;
            SendReguest(urlReq, "get", "")
            .then((data) => {
              console.log(data);
              prepararFormData(
                `http://localhost:5287/ApiVPC/${btnName}`,
                `Editar ${btnName}`,
                data,
                "put",
                `Editar ${btnName}`,
                ["btnEdit", `Edit ${btnName}`]
              );
            })
            .catch((error) => {
              console.log(error);
            });
          });
        });
      })
      .catch((error) => {
        console.error("Error en la consulta: ", error);
      });
  };

  const prepararFormData = (url, formTitle, formData, formMethod, tableTitle, dataBtn) => {
    mainContainer.innerHTML = "";
    mainPageTitle.textContent = "";

    let formElements = FormElements(formData, formMethod, dataBtn);
    let form = CreateFormCont(formElements, formTitle);
    mainContainer.appendChild(form);

    let btnAddEv = formMethod == "post" ? "#btnAdd" : "#btnEdit";

    let btnFunc = document.querySelector(btnAddEv); 
    btnFunc.addEventListener("click", (e) => {
      e.preventDefault();

      let formAdd = document.querySelector("#formAdd");
      let dataF = new FormData(formAdd);
      let dataForm = {};

      dataF.forEach((val, key) => {
        if ((key == "price" || key == "trasportId") && val == "") {
          val = 0;
        }
        dataForm[key] = val === "" ? null : val;
      });
      console.log(dataForm);

      SendReguest(url, "post", JSON.stringify(dataForm))
        .then((data) => {
          if (data.id) {
            let table = CreateDataListTable(
              data,
              tableTitle,
              mainContainer,
              dataBtn[2]
            );
            let tableContainer = document.createElement("div");
            tableContainer.classList.add("col");
            mainPageTitle.textContent = tableTitle;
            tableContainer.appendChild(table);
            mainContainer.appendChild(tableContainer);
          } else {
            let msgErrors, msgAlert;
            console.log(data);
            if (data.errors || data.error) {
              if (data.errors) {
                msgErrors += `<strong>${data.title}</strong>: `;
                Object.keys(data.errors).forEach((key) => {
                  let msgError = data.errors[key];
                  msgError.forEach((msg) => {
                    msgErrors += `${msg}\n`;
                  });
                });
                msgAlert = CreateMsgAlert(msgErrors);
              }
              if (data.error) {
                msgAlert = CreateMsgAlert(data.error);
              }
            } else {
              msgAlert = CreateMsgAlert(data);
            }
            mainContainer.prepend(msgAlert);
          }
        })
        .catch((error) => {
          console.error(error);
          let msgAlert = CreateMsgAlert(error);
          mainContainer.prepend(msgAlert);
        });
    });
  }

  btnsForm.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let dataForm, dataBtn;
      switch (e.target.getAttribute("id")) {
        case "viajesList":
          ObtenerDataList(
            "http://localhost:5287/ApiVPC/Journey",
            "get",
            "Journey List",
            "Journey",
            null
          );
          break;
        case "vuelosList":
          ObtenerDataList(
            "http://localhost:5287/ApiVPC/Flight",
            "get",
            "Flight List",
            "Flight",
            null
          );
          break;
        case "transporteList":
          ObtenerDataList(
            "http://localhost:5287/ApiVPC/Transport",
            "get",
            "Transport List",
            "Transport",
            null
          );
          break;
        case "viajesform":
          dataForm = ["origin", "destination"];
          dataBtn = ["btnAdd", "Consultar Viaje", "Flight"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Journey",
            "Consultar Viaje",
            dataForm,
            "post",
            "Detalles del Viaje",
            dataBtn
          );
          break;
        case "vueloform":
          dataForm = ["origin", "destination", "price", "trasportId"];
          dataBtn = ["btnAdd", "Crear Vuelo", "Journey"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Flight",
            "Crear Vuelo",
            dataForm,
            "post",
            "Detalle del Vuelo",
            dataBtn
          );
          break;
        case "transportform":
          dataForm = ["flightCarries", "flightNumber"];
          dataBtn = ["btnAdd", "Crear Transporte", "Transport"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Transport",
            "Crear Transporte",
            dataForm,
            "post",
            "Detalle del Transporte",
            dataBtn
          );
          break;
        default:
          break;
      }
    });
  });

});




