import { CreateTable, TableToContainer } from "./dynamicTables.js";
import { FormElements, CreateFormCont, CheckData } from "./dynamicForms.js";
import { CreateMsgAlert } from "./msgAlert.js";
import { CreateUrl, SendReguest } from "./crud.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnsNav = document.querySelectorAll(".btn_nav");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");

  const LoadActionBtns = (url, title) => {
    const btnDelete = document.querySelectorAll("#deleteBtn");
    const btnUpdate = document.querySelectorAll("#editBtn");

    btnDelete.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const idCel = e.target
          .closest("tr")
          .querySelector(".idCel").textContent;
        console.log(idCel);
        let urlEnti = e.target.getAttribute("name");
        let urlId = idCel;
        const urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/${urlId}`;
        SendReguest(urlReq, "delete", "").then((data) => {
          console.log(data);
          CreateDataList(url, title, data);
        });
      });
    });

    btnUpdate.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const idCel = e.target
          .closest("tr")
          .querySelector(".idCel").textContent;
        console.log(idCel);
        let urlEnti = e.target.getAttribute("name");
        let urlId = idCel;

        let urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/${urlId}`;
        if (title == "Flight") {
          urlReq = `http://localhost:5287/ApiVPC/${urlEnti}/GetDataForUpdate/${urlId}`;
        }
        SendReguest(urlReq, "get", "")
          .then((data) => {
            let attForm = {
              method: "put",
              id: "formEdit",
              title: `Editar ${title}`,
              table: title,
            };
            let dataBtn = {
              id: "btnEdit",
              text: `Edit ${title}`,
              value: urlId,
            };

            /* let urlReqFkData = `http://localhost:5287/ApiVPC/${title}`; */
            if (title == "Flight") {
              let urlReqFkData = CreateUrl(
                "http://localhost:5287/ApiVPC/",
                title
              );
              /* delete data.flightCarries */
              SendReguest(urlReqFkData, "get", "")
                .then((dataFk) => {
                  data["TranspList"] = dataFk;
                  console.log(dataFk);
                  console.log(data);
                  prepararFormData(
                    `http://localhost:5287/ApiVPC/${title}`,
                    attForm,
                    data,
                    `Editar ${title}`,
                    dataBtn
                  );
                })
                .catch((errorFk) => {
                  console.log(errorFk);
                });
              console.log(data);
            } else {
              prepararFormData(
                `http://localhost:5287/ApiVPC/${title}`,
                attForm,
                data,
                `Editar ${title}`,
                dataBtn
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const CreateDataList = (url, title, msg = null, method = "get") => {
    SendReguest(url, method, "")
      .then((dataList) => {
        let table = CreateTable(dataList, title, mainContainer);
        mainPageTitle.textContent = `${title} List`;
        mainContainer.appendChild(TableToContainer(table));

        if (msg !== null && typeof msg === "object") {
          mainContainer.prepend(CreateMsgAlert(msg.success, "success"));
        }

        LoadActionBtns(url, title);
      })
      .catch((error) => {
        console.error("Error en la consulta: ", error);
      });
  };

  const prepararFormData = (url, formAtt, formData, tableTitle, dataBtn) => {
    mainContainer.innerHTML = "";
    mainPageTitle.textContent = "";

    let formElements = FormElements(formData, formAtt, dataBtn);
    let form = CreateFormCont(formElements, formAtt.title);
    mainContainer.appendChild(form);

    /*  let btnAddEv = formAtt[1] == "post" ? "#btnAdd" : "#btnEdit"; */
    let btnSubmit = document.querySelector(`#${dataBtn.id}`);
    btnSubmit.addEventListener("click", (e) => {
      e.preventDefault();

      let dataF = new FormData(document.querySelector(`#${formAtt.id}`));
      console.log(dataF);
      let dataForm = {};

      dataF.forEach((val, key) => {
        if ((key == "price" || key == "trasportId") && val == "") {
          val = 0;
        }
        dataForm[key] = val;
      });

      console.log(dataForm);
      const dataChecked = CheckData(dataForm);

      if (!dataChecked.status) {
        mainContainer.prepend(CreateMsgAlert(dataChecked.msg));
      } else {
        if (formAtt.method == "put") {
          url += `/${btnSubmit.getAttribute("value")}`;
          console.log(url);
        }
        SendReguest(url, formAtt.method, JSON.stringify(dataForm))
          .then((data) => {
            if (data.id) {
              let table = CreateTable(data, formAtt.table, mainContainer);
              mainPageTitle.textContent = tableTitle;
              mainContainer.appendChild(TableToContainer(table));
              LoadActionBtns(url, formAtt.table);
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
      }
    });
  };

  btnsNav.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let dataForm;
      let attForm = {
        method: "post",
        id: "formAdd",
      };
      let dataBtn = {
        id: "btnAdd",
      };

      switch (e.target.getAttribute("id")) {
        case "viajesList":
          CreateDataList("http://localhost:5287/ApiVPC/Journey", "Journey");
          break;
        case "vuelosList":
          CreateDataList("http://localhost:5287/ApiVPC/Flight", "Flight");
          break;
        case "transporteList":
          CreateDataList("http://localhost:5287/ApiVPC/Transport", "Transport");
          break;
        case "viajesform":
          dataForm = ["origin", "destination"];
          Object.assign(attForm, {
            title: "Consultar Viaje",
            table: "Journey",
          });
          Object.assign(dataBtn, { text: "Consultar Viaje" });
          prepararFormData(
            "http://localhost:5287/ApiVPC/Journey",
            attForm,
            dataForm,
            "Detalle del Viaje",
            dataBtn
          );
          break;
        case "vueloform":
          SendReguest("http://localhost:5287/ApiVPC/Transport", "get", "")
            .then((dataFk) => {
              console.log(dataFk);
              dataForm = ["origin", "destination", "price", "trasportId"];
              dataForm.push(dataFk);
              console.log(dataForm);
              Object.assign(attForm, {
                title: "Crear Vuelo",
                table: "Flight",
              });
              Object.assign(dataBtn, { text: "Crear Vuelo" });
              prepararFormData(
                "http://localhost:5287/ApiVPC/Flight",
                attForm,
                dataForm,
                "Detalle del Vuelo",
                dataBtn
              );
            })
            .catch((errorFk) => {
              console.log(errorFk);
            });
          break;
        case "transportform":
          dataForm = ["flightCarries", "flightNumber"];
          Object.assign(attForm, {
            title: "Crear Transporte",
            table: "Transport",
          });
          Object.assign(dataBtn, {
            text: "Crear Transporte"
          });
          prepararFormData(
            "http://localhost:5287/ApiVPC/Transport",
            attForm,
            dataForm,
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
