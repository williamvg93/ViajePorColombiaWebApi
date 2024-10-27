import { CreateDataListTable } from "./dynamicTables.js";
import { CreateFormElements, CreateFormCont } from "./dynamicForms.js";
import { SendReguest } from "./crud.js";
import { CreateMsgAlert } from "./msgAlert.js";

document.addEventListener("DOMContentLoaded", () => {

  const btnsForm = document.querySelectorAll(".btn_funtion");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");


  const ObtenerDataList = (url, method, tableInfo) => {
    SendReguest(url, method, "")
      .then((data) => {
        let table = CreateDataListTable(data, tableInfo, mainContainer);
        let tableContainer = document.createElement("div");
        tableContainer.classList.add("col");
        tableContainer.appendChild(table);
        mainPageTitle.textContent = tableInfo;
        mainContainer.appendChild(tableContainer);
      })
      .catch((error) => {
        console.error("Error en la consulta: ", error);
      });
  };

  const prepararFormData = (url, formInfo, tbInfo, dataEle, dataBtn) => {
    mainContainer.innerHTML = "";
    mainPageTitle.textContent = "";

    let formElements = CreateFormElements(dataEle, "post", dataBtn);
    let form = CreateFormCont(formElements, formInfo);
    mainContainer.appendChild(form);

    let btnAdd = document.querySelector("#btnAdd"); 
    btnAdd.addEventListener("click", (e) => {
      e.preventDefault();

      let formAdd = document.querySelector("#formAdd");
      let dataF = new FormData(formAdd);
      let dataForm = {};

      dataF.forEach((val,key) => {
        if ((key == "price" || key == "trasportId") && val == "") {
          val = 0;
        }
        dataForm[key] = val === "" ? null : val;
      });
      console.log(dataForm);

      SendReguest(url, "post", JSON.stringify(dataForm))
        .then((data) => {
          let msgErrors;
          console.log(data);
          if (data.errors || data.error) {
            let msgAlert;
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
            mainContainer.prepend(msgAlert);
          }
          if (data.id) {
            let table = CreateDataListTable(data, tbInfo, mainContainer);
            let tableContainer = document.createElement("div");
            tableContainer.classList.add("col");
            mainPageTitle.textContent = tbInfo;
            tableContainer.appendChild(table);
            mainContainer.appendChild(tableContainer);
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  btnsForm.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let dataForm, dataBtn;
      console.log(e.target.getAttribute("id"));

      switch (e.target.getAttribute("id")) {
        case "viajesList":
          ObtenerDataList("http://localhost:5287/ApiVPC/Journey", "get", "Journey List");
          break;
        case "vuelosList":
          ObtenerDataList("http://localhost:5287/ApiVPC/Flight", "get", "Flight List");
          break;
        case "transporteList":
          ObtenerDataList(
            "http://localhost:5287/ApiVPC/Transport", "get",
            "Transport List"
          );
          break;
        case "viajesform":
          dataForm = ["origin", "destination"];
          dataBtn = ["btnAdd", "Consultar Viaje"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Journey",
            "Consultar Viaje",
            "Detalles del Viaje",
            dataForm,
            dataBtn
          );
          break;
        case "vueloform":
          dataForm = ["origin", "destination", "price", "trasportId"];
          dataBtn = ["btnAdd", "Crear Vuelo"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Flight",
            "Crear Vuelo",
            "Detalle del Vuelo",
            dataForm,
            dataBtn
          );
          break;
        case "transportform":
          dataForm = ["flightCarries", "flightNumber"];
          dataBtn = ["btnAdd", "Crear Transporte"];
          prepararFormData(
            "http://localhost:5287/ApiVPC/Transport",
            "Crear Transporte",
            "Detalle del Transporte",
            dataForm,
            dataBtn
          );
          break;
        default:
          break;
      }
    });
  });

});




