const url = 'https://www.ecodeli.mx/ApiRest/ApiEcodeliComercial/v2/PaginaEcodeli/get_Proveedores';

const reqData =  new URLSearchParams ({
    strAccion : ['1'],
    strUsuario : ['rnazario'],
    strSucursal : [''],
    strPeriodo : ['8'],
    strEjercicio :  ['2023'],
    strId : [''],
    strCoordinador : [''],
    strConexion : ['connection']
});

fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: reqData.toString()
})
.then(response=> response.json() )
.then(data=> {
    // console.log(data)
    renderData(data);
})
.catch(error=>{ console.log(error)});


function renderData(data){
    const row = document.getElementById('render');
    row.innerHTML = '';

    if(data.length>0){
        data.forEach(element=>{
            const table = document.createElement('table');
            table.className = 'table';
            
            table.innerHTML = `
                    <thead>
                    <tr>
                        <th >Id</th>
                        <th >Usuario</th>
                        <th >Nombre</th>
                        <th >UsuarioNombre</th>
                        <th >Tipo</th>
                        <th >Estatus</th>
                        <th >Email</th>
                        <th >Contacto</th>
                        <th >Dias</th>
                    </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td>${element.strID}</td>
                        <td>${element.strUsuario}</td>
                        <td>${element.strNombre}</td>
                        <td>${element.strUsuarioNombre}</td>
                        <td>${element.strTipo}</td>
                        <td>${element.strEstatus}</td>
                        <td>${element.strEmail}</td>
                        <td>${element.strContacto}</td>
                        <td>${element.intDias}</td>
                    </tr>
                </tbody>
                
                `;
            row.appendChild(table);
        });
    }else{
        const main = document.getElementById('main');
        console.log(main)
        const mainErr = document.createElement('div');
        mainErr.className = 'bg-danger';
        mainErr.innerHTML = `
        <h3 class = 'text-center'>No se encontraron datos</h3>`;
        main.appendChild(mainErr);
    }
}