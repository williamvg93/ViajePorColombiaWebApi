console.log("conectado");

btnsForm = document.querySelectorAll(".btn_funtion");
mainContainer = document.querySelector("#mainContent");

const GetDataList = async (url) => {
    console.log("obteniendo Data");
    let data = await fetch(url)
    let dataJson = await data.json();
    return await dataJson;
};

const CreateTableList = (data, tableInfo) => {
  mainContainer.innerHTML = "";
  let table = document.createElement("table");
  table.classList.add(
    "table",
    "align-middle",
    "text-center",
    "caption-top",
    "table-borderless",
    "table-dark",
    "table-striped",
    "table-hover",
    "table-responsive"
  );

  let tableCaption = document.createElement("caption");
  tableCaption.textContent = tableInfo;
  tableCaption.classList.add("fs-5");

  let tableHeader = document.createElement("thead");
  tableHeader.classList.add(
    "border",
    "border-3",
    "border-bottom",
    "border-white",
    "text-info"
  );

  let tableBody = document.createElement("tbody");
  /* tableBody.classList.add("table-primary"); */

  let theaderRow = document.createElement("tr");
  theaderRow.classList.add("text-info");
  Object.keys(data[0]).forEach((key) => {
    let tableTh = document.createElement("th");
    tableTh.classList.add("text-info");
    tableTh.textContent = key.toUpperCase();
    theaderRow.appendChild(tableTh);
  });

  tableHeader.appendChild(theaderRow);

  data.forEach(elemArray => {
    let tableRow = document.createElement("tr");

    Object.keys(elemArray).forEach(key => {
      let tBodyTd = document.createElement("td");

      if (Array.isArray(elemArray[key])) {
        let flighInfo = "";
        elemArray[key].forEach((fli, index) => {
            Object.keys(fli).forEach(subkey => {
                flighInfo += `<b>${subkey.toUpperCase()}</b> : ${fli[subkey]}</br>`;
            });
            flighInfo += `</br>`;
        });
        flighInfo = flighInfo.slice(0, -5);
        tBodyTd.innerHTML = flighInfo.trim();
      } else {
        tBodyTd.innerHTML = `${elemArray[key]}`.trim()
      }
      tableRow.appendChild(tBodyTd);
    });
    tableBody.appendChild(tableRow);
  });

  table.appendChild(tableCaption);
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  mainContainer.appendChild(table);
};



const ListarDatos = (url, tableInfo) => {
  console.log("listando datos");
  GetDataList(url)
    .then((data) => {
      console.log(data);
      console.log(Object.keys(data).length);
      CreateTableList(data, tableInfo);
    })
    .catch((error) => {
      console.error("Error en la consulta: ", error);
    });
};


btnsForm.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e.target.getAttribute("id"));

        switch (e.target.getAttribute("id")) {
          case "vaijesList":
            console.log("este es xD");
            ListarDatos("http://localhost:5287/ApiVPC/Journey", "Journey List");
            break;

          default:
            break;
        }
    });
});