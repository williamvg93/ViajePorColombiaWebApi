
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

const CreateContentTBody = (tbody, tableData, btnName) => {
  let idEle;
  console.log(tableData);
  console.log(tableData[0]);
  console.log(tableData[0] !== null && typeof tableData[0] === "object");
  if (tableData[0] !== null && typeof tableData[0] === "object") {
    tableData.forEach((elemArray) => {
      let tableRow = document.createElement("tr");
      Object.keys(elemArray).forEach((key) => {
        let tBodyTd = document.createElement("td");
        if (key === "id") {
          tBodyTd.classList.add("idCel")
          idEle = elemArray[key];
        }
        if (Array.isArray(elemArray[key])) {
          let flighInfo = "";
          elemArray[key].forEach((fli, index) => {
            console.log(key);
            console.log(`${fli} - ${index}`);
            Object.keys(fli).forEach((subkey) => {
              console.log(fli[subkey]);
              flighInfo += `<b>${subkey.toUpperCase()}</b> : ${
                fli[subkey]
              }</br>`;
            });
            flighInfo += `</br>`
            console.log(flighInfo);
            tBodyTd.innerHTML = flighInfo.slice(0, -5).trim();
          });
        } else {
          tBodyTd.innerHTML = `${elemArray[key]}`.trim();
        }
        tableRow.appendChild(tBodyTd);
      });
      let tBodyTdAct = document.createElement("td");

      tBodyTdAct.innerHTML = /* html */ `
        <button type="button" id="editBtn" name="${btnName}" value="${idEle}" class="btn btn-success btn-sm">Edit</button>
        <button type="button" id="deleteBtn" name="${btnName}" value="${idEle}" class="btn btn-danger btn-sm">Delete</button>
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
          tBodyTd.classList.add("idCel");
          idEle = tableData[key];
        }
        tBodyTd.innerHTML = `${tableData[key]}`.trim();
      }
      tableRow.appendChild(tBodyTd);
    });
    let tBodyTdAct = document.createElement("td");
    tBodyTdAct.innerHTML = /* html */ `
      <button type="button" id="editBtn" name="${btnName}" value="${idEle}" class="btn btn-success btn-sm" >Edit</button>
      <button type="button" id="deleteBtn" name="${btnName}" value="${idEle}" class="btn btn-danger btn-sm">Delete</button>
    `;
    tableRow.appendChild(tBodyTdAct);
    tbody.appendChild(tableRow);
    console.log(idEle);
  }
  return tbody;
};

const CreateTable = (data, title, container) => {

  console.log(data);
  console.log(typeof data);
  console.log(data.length);
  console.log(Object.keys(data).length);
  container.innerHTML = "";
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
  tableCaption.textContent = title;
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

  let tableBody = document.createElement("tbody");

  if (data.length > 0 || Object.keys(data).length > 0) {
    let theaderRow = CreateContentTHead("text-info", data);
    tableHeader.appendChild(theaderRow);
    table.appendChild(tableHeader);
    table.appendChild(CreateContentTBody(tableBody, data, title));
  } else {
    tableBody.innerHTML = /* html */ `<td>No se encontraron Datos !!</td>`;
    table.appendChild(tableBody);
  }

  return table;
};


export { CreateTable, TableToContainer };