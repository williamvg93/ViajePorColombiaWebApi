
const CreateDataListTable = (data, tableInfo, mainContainer) => {
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

  let theaderRow = document.createElement("tr");
  theaderRow.classList.add("text-info");

  if (data[0]) {
    Object.keys(data[0]).forEach((key) => {
      let tableTh = document.createElement("th");
      tableTh.classList.add("text-info");
      tableTh.textContent = key.toUpperCase();
      theaderRow.appendChild(tableTh);
    });
    data.forEach((elemArray) => {
      let tableRow = document.createElement("tr");

      Object.keys(elemArray).forEach((key) => {
        let tBodyTd = document.createElement("td");

        if (Array.isArray(elemArray[key])) {
          let flighInfo = "";
          elemArray[key].forEach((fli, index) => {
            Object.keys(fli).forEach((subkey) => {
              flighInfo += `<b>${subkey.toUpperCase()}</b> : ${
                fli[subkey]
              }</br>`;
            });
            flighInfo += `</br>`;
          });
          tBodyTd.innerHTML = (flighInfo.slice(0, -5)).trim();
        } else {
          tBodyTd.innerHTML = `${elemArray[key]}`.trim();
        }
        tableRow.appendChild(tBodyTd);
      });
      tableBody.appendChild(tableRow);
    });
  } else {
    Object.keys(data).forEach((key) => {
      let tableTh = document.createElement("th");
      tableTh.classList.add("text-info");
      tableTh.textContent = key.toUpperCase();
      theaderRow.appendChild(tableTh);
    });

    let tableRow = document.createElement("tr");
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        let tBodyTd = document.createElement("td");
        let flighInfo = "";
        data[key].forEach((fli, index) => {
          Object.keys(fli).forEach((subkey) => {
            flighInfo += `<b>${subkey.toUpperCase()}</b> : ${fli[subkey]}</br>`;
          });
          flighInfo += `</br>`;
        });
        tBodyTd.innerHTML = (flighInfo.slice(0, -5)).trim();
        tableRow.appendChild(tBodyTd);
      } else {
        let tBodyTd = document.createElement("td");
        tBodyTd.innerHTML = `${data[key]}`.trim();
        tableRow.appendChild(tBodyTd);
      }
    });
    tableBody.appendChild(tableRow);
  }
  tableHeader.appendChild(theaderRow);

  table.appendChild(tableCaption);
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  return table;
};


export {CreateDataListTable};