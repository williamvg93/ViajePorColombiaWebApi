
const TableToContainer = (table) => {
  let tableContainer = document.createElement("div");
  tableContainer.classList.add("col");
  tableContainer.appendChild(table);
  return tableContainer;
}


const CreateContentTHead = (textColor, tableData) => {
  let theaderRow = document.createElement("tr");
  theaderRow.classList.add(textColor);
  if (tableData[0] !== null && typeof tableData[0] === "object"){
    Object.keys(tableData[0]).forEach((key) => {
      let tableTh = document.createElement("th");
      tableTh.classList.add(textColor);
      tableTh.textContent = key.toUpperCase();
      theaderRow.appendChild(tableTh);
    });
  } else {
    Object.keys(tableData).forEach((key) => {
      let tableTh = document.createElement("th");
      tableTh.classList.add(textColor);
      tableTh.textContent = key.toUpperCase();
      theaderRow.appendChild(tableTh);
    });  
  }
  let tableTh = document.createElement("th");
  tableTh.classList.add(textColor);
  tableTh.textContent = "Actions";
  theaderRow.appendChild(tableTh);
  return theaderRow;
}

const CreateContentTBody = (tbody, tableData, btnNa) => {
  let idEle;
  if (tableData[0] !== null && typeof tableData[0] === "object") {
    tableData.forEach((elemArray) => {
      idEle = "";
      let tableRow = document.createElement("tr");
      Object.keys(elemArray).forEach((key) => {
        if (key === "id") {
          idEle = elemArray[key];
        }
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
          tBodyTd.innerHTML = flighInfo.slice(0, -5).trim();
        } else {
          if (key === "id") {
            idEle = elemArray[key];
          }
          tBodyTd.innerHTML = `${elemArray[key]}`.trim();
        }
        tableRow.appendChild(tBodyTd);
      });
      let tBodyTdAct = document.createElement("td");

      tBodyTdAct.innerHTML = /* html */ `
        <button type="button" id="editBtn" name="${btnNa}" value="${idEle}" class="btn btn-success btn-sm">Edit</button>
        <button type="button" id="deleteBtn" name="${btnNa}" value="${idEle}" class="btn btn-danger btn-sm">Delete</button>
      `;
      tableRow.appendChild(tBodyTdAct);
      tbody.appendChild(tableRow);
    });
  } else {
    let tableRow = document.createElement("tr");
    Object.keys(tableData).forEach((key) => {
      let tBodyTd = document.createElement("td");
      if (Array.isArray(tableData[key])) {
        let flighInfo = "";
        tableData[key].forEach((fli, index) => {
          Object.keys(fli).forEach((subkey) => {
            if (subkey === "id") {
              idEle = fli[subkey];
            }
            flighInfo += `<b>${subkey.toUpperCase()}</b> : ${fli[subkey]}</br>`;
          });
          flighInfo += `</br>`;
        });
        tBodyTd.innerHTML = flighInfo.slice(0, -5).trim();
      } else {
        if (key === "id") {
          idEle = tableData[key];
        }
        let tBodyTd = document.createElement("td");
        tBodyTd.innerHTML = `${tableData[key]}`.trim();
      }
      tableRow.appendChild(tBodyTd);
    });
    let tBodyTdAct = document.createElement("td");
    tBodyTdAct.innerHTML = /* html */ `
      <button type="button" id="editBtn" name="${btnNa}" value="${idEle}" class="btn btn-success btn-sm" >Edit</button>
      <button type="button" id="deleteBtn" name="${btnNa}" value="${idEle}" class="btn btn-danger btn-sm">Delete</button>
    `;
    tableRow.appendChild(tBodyTdAct);
    tbody.appendChild(tableRow);
  }
  return tbody;
};

const CreateDataListTable = (data, tableInfo, mainContainer, btnNa) => {
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
  table.appendChild(tableCaption);

  let tableHeader = document.createElement("thead");
  tableHeader.classList.add(
    "border",
    "border-3",
    "border-bottom",
    "border-white",
    "text-info"
  );
  let theaderRow = CreateContentTHead("text-info", data);
  tableHeader.appendChild(theaderRow);
  table.appendChild(tableHeader);

  let tableBody = document.createElement("tbody");
  table.appendChild(CreateContentTBody(tableBody, data, btnNa));

  return table;
};



export { CreateDataListTable, TableToContainer };