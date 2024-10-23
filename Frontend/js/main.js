console.log("conectado");

btnsForm = document.querySelectorAll(".btn_funtion");
mainContainer = document.querySelector("#mainContent");

const GetDataList = async (url) => {
    console.log("obtyeniendo Data");
    let data = await fetch(url)
    let dataJson = await data.json();
    return await dataJson;
};

const CrearListas = (data) => {
    mainContainer.innerHTML = "";
    mainContainer.innerHTML = `
            <table class="table" >
                <thead>
                    <tr id="cabeceTabla">
                    </tr>
                </thead>
                <tbody id="cuerpoTabla">
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
    `; 
  let keysColumns = "";

  data.forEach((dato) => {
    keysColumns = Object.keys(dato);
  });

  console.log(keysColumns);
  let cabeceTabla = document.querySelector("#cabeceTabla");
  let cuerpoTabla = document.querySelector("#cuerpoTabla");
  

  keysColumns.forEach((key) => {
    cabeceTabla.insertAdjacentHTML(
      "beforeend",
      `
            <th scope="col">${key}</th>
           `
    );
  });

  data.forEach((dat) => {
     cuerpoTabla.insertAdjacentHTML(
       "beforeend",
        `
            <tr>
        `
     );
    Object.entries(dat).forEach(([key, value]) => {
      console.log(`Key: ${key}, Value: ${value}`);
      cuerpoTabla.insertAdjacentHTML(
        "beforeend",
        `
            <td scope="col">${value}</td>
           `
      );
    });
    cuerpoTabla.insertAdjacentHTML(
      "beforeend",
      `
            </tr>
        `
    );
  });

  /*           mainContainer.innerHTML = "";
          mainContainer.innerHTML = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        `; */
};



const ListarDatos = (url) => {
    console.log("listando datos");
    GetDataList(url)
    .then(data => {
        console.log(data);
        console.log(Object.keys(data).length);
        CrearListas(data);
    })
    .catch(error => {
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
            ListarDatos("http://localhost:5287/ApiVPC/Journey");
            break;

          default:
            break;
        }
    });
});