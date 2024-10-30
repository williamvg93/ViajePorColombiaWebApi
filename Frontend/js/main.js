import { CreateDataListTable, TableToContainer } from "./dynamicTables.js";
import { CreateFormElements, CreateFormCont } from "./dynamicForms.js";
import { SendReguest } from "./crud.js";
import { CreateMsgAlert } from "./msgAlert.js";

document.addEventListener("DOMContentLoaded", () => {

  const btnsForm = document.querySelectorAll(".btn_funtion");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");


  const ObtenerDataList = (url, method, tableInfo, btnNa, msg) => {

    SendReguest(url, method, "")
      .then((data) => {
        let table = CreateDataListTable(data, tableInfo, mainContainer, btnNa);
        mainPageTitle.textContent = tableInfo;
        mainContainer.appendChild(TableToContainer(table));

        if (msg !== null && typeof msg === "object") {
          mainContainer.prepend(CreateMsgAlert(msg.success));
        }

        let btnDelete = document.querySelectorAll("#deleteBtn");
        btnDelete.forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            let urlEnti = e.target.getAttribute("name");
            let urlId = e.target.getAttribute("value");
            let urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/${urlId}`;
            SendReguest(urlReq, "delete", "").then(
              (data) => {
                console.log(data);
                ObtenerDataList(url, method, tableInfo, btnNa, data);
              }
            );
            console.log(urlReq);
          });
        });
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
          if (data.id) {
            let table = CreateDataListTable(
              data,
              tbInfo,
              mainContainer
            );
            let tableContainer = document.createElement("div");
            tableContainer.classList.add("col");
            mainPageTitle.textContent = tbInfo;
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
        .catch(error => {
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




