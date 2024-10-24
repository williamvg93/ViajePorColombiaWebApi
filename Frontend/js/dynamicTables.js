
const CreateTableList = (data, tableInfo, mainContainer) => {
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

  Object.keys(data[0]).forEach((key) => {
    let tableTh = document.createElement("th");
    tableTh.classList.add("text-info");
    tableTh.textContent = key.toUpperCase();
    theaderRow.appendChild(tableTh);
  });

  tableHeader.appendChild(theaderRow);

  data.forEach((elemArray) => {
    let tableRow = document.createElement("tr");

    Object.keys(elemArray).forEach((key) => {
      let tBodyTd = document.createElement("td");

      if (Array.isArray(elemArray[key])) {
        let flighInfo = "";
        elemArray[key].forEach((fli, index) => {
          Object.keys(fli).forEach((subkey) => {
            flighInfo += `<b>${subkey.toUpperCase()}</b> : ${fli[subkey]}</br>`;
          });
          flighInfo += `</br>`;
        });
        flighInfo = flighInfo.slice(0, -5);
        tBodyTd.innerHTML = flighInfo.trim();
      } else {
        tBodyTd.innerHTML = `${elemArray[key]}`.trim();
      }
      tableRow.appendChild(tBodyTd);
    });
    tableBody.appendChild(tableRow);
  });

  table.appendChild(tableCaption);
  table.appendChild(tableHeader);
  table.appendChild(tableBody);

  return table;
};


export {CreateTableList};