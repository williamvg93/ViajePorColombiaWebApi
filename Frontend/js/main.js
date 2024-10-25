import { CreateTableList } from "./dynamicTables.js";
import { CreateForms } from "./dynamicForms.js";
import { GetDataList } from "./crud.js";
import { CreateMsgAlert } from "./msgAlert.js";

document.addEventListener("DOMContentLoaded", () => {

  const btnsForm = document.querySelectorAll(".btn_funtion");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");


  const ObtenerDataList = (url, tableInfo) => {
    GetDataList(url)
      .then((data) => {
        let table = CreateTableList(data, tableInfo, mainContainer);
        let tableContainer = document.createElement("div");
        tableContainer.classList.add("col");
        mainPageTitle.textContent = tableInfo;
        tableContainer.appendChild(table);
        mainContainer.appendChild(tableContainer)
      })
      .catch((error) => {
        console.error("Error en la consulta: ", error);
      });
  };


  const DataSend = async (url, method, dataForm) => {
    const confgFetch = {
      method: method,
      headers: { "content-Type": "application/json" },
      body: dataForm 
    };

    let peticion = await (await fetch(url, confgFetch)).json();
    return await peticion;
  }


  const prepararFormData = (url, formInfo, tbInfo, dataEle, dataBtn) => {
    mainContainer.innerHTML = "";
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("card", "text-bg-dark", "col-md-5", "mt-4");

    let cardHeader = document.createElement("div")
    cardHeader.classList.add("card-header", "fs-1", "text-center");
    cardHeader.textContent = formInfo;

    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body", "d-flex", "justify-content-center");
    
    let form = CreateForms(dataEle, "post", dataBtn);
    mainPageTitle.textContent = "";

    cardContainer.appendChild(cardHeader);
    cardBody.appendChild(form);
    cardContainer.appendChild(cardBody);
    mainContainer.appendChild(cardContainer);

    let btnAdd = document.querySelector("#btnAdd"); 
    btnAdd.addEventListener("click", (e) => {
      e.preventDefault();

      let formAdd = document.querySelector("#formAdd");
      let dataF = new FormData(formAdd);
      let dataForm = {};

      dataF.forEach((val,key) => {
        console.log(val);
        console.log(key);
        if ((key == "price" || key == "trasportId") && val == "") {
          val = 0;
        }
        dataForm[key] = val === "" ? null : val;
      });
      console.log(dataForm);

      DataSend(url, "post", JSON.stringify(dataForm))
        .then((data) => {
          let msgErrors = "";
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
            let table = CreateTableList(data, tbInfo, mainContainer);
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
      let dataForm = ""
      let dataBtn = ""
      console.log(e.target.getAttribute("id"));

      switch (e.target.getAttribute("id")) {
        case "viajesList":
          ObtenerDataList("http://localhost:5287/ApiVPC/Journey", "Journey List");
          break;
        case "vuelosList":
          ObtenerDataList("http://localhost:5287/ApiVPC/Flight", "Flight List");
          break;
        case "transporteList":
          ObtenerDataList(
            "http://localhost:5287/ApiVPC/Transport",
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




