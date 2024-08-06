const url = 'https://www.ecodeli.mx/ApiRest/ApiEcodeliComercial/v2/PaginaEcodeli/get_Proveedores';
const btnBackground = document.querySelector('#btnback');
var datos = [];
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
const fetchAPI= async()=>{
    try{
        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: reqData.toString()
        });
        const data = await response.json();
        document.getElementById('iderror')?.remove();
        renderData(data);
        return data;
    }catch (error){
        console.log('Error al obtener los datos');
    }
    
}

const getData = async()=>{
    const data = await fetchAPI();
    if(data){
        datos = data;
        return datos;
    }else{
        console.log('No se pudieron obtener los datos');
    }
}
const sortbyName= async()=>{
        const dataOrderbyName = await getData();
        console.log(dataOrderbyName);
        dataOrderbyName.sort((a,b)=>{
            if(a.strNombre>b.strNombre){
                 return 1;
            }else if(a.strNombre<b.strNombre){
                return -1;
            }else{
                 return 0;
             }
         });
         document.getElementById('idtable')?.remove();
         renderData(dataOrderbyName);
}

function renderData(data){
    const row = document.getElementById('render');
    row.innerHTML = '';

    if(Array.isArray(data) && data.length>0){
        data.forEach(element=>{
            const table = document.createElement('table');
            table.id = 'idtable';
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
        const mainErr = document.createElement('div');
        mainErr.className = ' container bg-danger';
        mainErr.id = 'iderror';
        mainErr.innerHTML = `
        <h3 class = 'text-center'>No se encontraron datos</h3>`;
        main.appendChild(mainErr);
    }
}

btnBackground.addEventListener('click', ()=>{
    console.log('click')
    if(btnBackground.value=='true'){
        document.body.style.backgroundColor = '#252525'
        document.querySelector('.titulo').style.color = 'white';
        btnBackground.innerHTML = 'Light';
        btnBackground.className = 'btn btn-light';
        btnBackground.value='false';
    }else{
        console.log('estoy en falso')
        document.body.style.backgroundColor = 'white'
        document.querySelector('.titulo').style.color = 'black';
        btnBackground.innerHTML = 'Dark';
        btnBackground.className = 'btn btn-dark';
        btnBackground.value='true';
    }
    
});
fetchAPI()