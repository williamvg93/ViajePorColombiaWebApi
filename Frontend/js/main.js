import { CreateTableList } from "./dynamicTables.js";

document.addEventListener("DOMContentLoaded", () => {

  const btnsForm = document.querySelectorAll(".btn_funtion");
  const mainContainer = document.querySelector("#mainContent");
  const mainPageTitle = document.querySelector("#mainTitle");

  const GetDataList = async (url) => {
    console.log("obteniendo Data");
    let dataJson = await (await fetch(url)).json();
    return await dataJson;
  };

  const prepararData = (url, tableInfo) => {
    console.log("listando datos");
    GetDataList(url)
      .then((data) => {
        let table = CreateTableList(data, tableInfo, mainContainer);
        mainPageTitle.textContent = tableInfo;
        mainContainer.appendChild(table);
      })
      .catch((error) => {
        console.error("Error en la consulta: ", error);
      });
  };

  btnsForm.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.getAttribute("id"));

      switch (e.target.getAttribute("id")) {
        case "viajesList":
          prepararData("http://localhost:5287/ApiVPC/Journey", "Journey List");
          break;
        case "vuelosList":
          prepararData("http://localhost:5287/ApiVPC/Flight", "Flight List");
          break;
        case "transporteList":
          prepararData("http://localhost:5287/ApiVPC/Transport", "Transport List");
          break;
        default:
          break;
      }
    });
  });

});




