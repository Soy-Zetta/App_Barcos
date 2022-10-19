//accedo a elementos por id

let borrarcliente = document.getElementById("borrarcliente")
let modificarcliente = document.getElementById("modificarcliente")
let datosdelciente = document.getElementById("datosdelciente")
let nuevocliente = document.getElementById("nuevocliente")

traerdatosCliente()
inicial()



function inicial() {

    datosdelciente.style.display="block"
    modificarcliente.style.display="none"
    nuevocliente.style.display="none"
    borrarcliente.style.display="none"

}

function agregarcliente() {
    
    document.getElementById("id").value=""
    document.getElementById("name").value=""
    document.getElementById("email").value=""
    document.getElementById("age").value=""
    
    nuevocliente.style.display="block"
    modificarcliente.style.display = "none";
    borrarcliente.style.display = "none";
    datosdelciente.style.display = "none";
}

function traerdatosCliente() {
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client"
    //Creo un objeto para poder procesar la peticion ajax
    let registrocliente = ""
    let id = ""
    let respuesta
    let peticion = new XMLHttpRequest();
        peticion.open("GET",url,true);
        peticion.send();

        peticion.onreadystatechange = function () {
        //si la respusta esta lista y no hubo error
        if (this.readyState == 4 && this.status == 200) {
            
            respuesta = JSON.parse(this.responseText);

            for (let i in respuesta.items) {
                id = respuesta.items[i].id

                registrocliente += "<tr>\
                        <th scope=\"row\">" + respuesta.items[i].id + "</th>\
                        <td>" + respuesta.items[i].name + "</td>\
                        <td>" + respuesta.items[i].email + "</td>\
                        <td>" + respuesta.items[i].age + "</td>\
                        <td>\
                            <button class=\"btn btn-outline-dark\" onclick=\"editarcliente(" + id + ")\">Modificar Cliente</button>\
                            <button class=\"btn btn-outline-dark\" onclick=\"eliminarCliente(" + id + ")\">Borrar Cliente</button>\
                        </td>\
                        </tr>"

            }
            document.getElementById("registrocliente").innerHTML = registrocliente;
        }
    };

}

function editarcliente(id) {
   
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";
    //Creo un objeto para poder procesar la peticion ajax
    let peticion = new XMLHttpRequest();
    peticion.open("GET", url + "/" + id, true);
    peticion.send();

    peticion.onreadystatechange = function () {
        idModifCliente = document.getElementById("idModifCliente");
        nameModifCliente = document.getElementById("nameModifCliente");
        emailModifCLiente = document.getElementById("emailModifCLiente");
        ageModifCliente = document.getElementById("ageModifCliente");

        if (this.readyState == 4 && this.status == 200) {

            let respuesta = JSON.parse(peticion.responseText)

            //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario           
            idModifCliente.value = respuesta.items[0].id
            nameModifCliente.value = respuesta.items[0].name
            emailModifCLiente.value = respuesta.items[0].email
            ageModifCliente.value = respuesta.items[0].age


            document.getElementById("idLabelCliente").innerHTML="<strong>Id del Cliente: </strong>" + idModifCliente.value
            
            //Configura aspecto visual de la interfaz
            
            nuevocliente.style.display="none"
            datosdelciente.style.display="none"
            modificarcliente.style.display="block"
            borrarcliente.style.display="none"
            
        }
    };

}

function eliminarCliente(id) {
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client"
    //Creo un objeto para poder procesar la peticion ajax
    let peticion = new XMLHttpRequest();
    peticion.open("GET",url + "/" + id ,true);
    peticion.send();

    peticion.onreadystatechange = function ()
    {
        //si la respusta esta lista y no hubo error
        if (this.readyState==4 && this.status==200)
        {
            let respuesta = JSON.parse(peticion.responseText)

            document.getElementById("idClientDelete").innerHTML = "<strong>Id del Barco: </strong>" + respuesta.items[0].id
            document.getElementById("nameDelete").innerHTML = "<strong>Marca: </strong>" + respuesta.items[0].name
            document.getElementById("emailDelete").innerHTML = "<strong>Modelo: </strong>" + respuesta.items[0].email
            document.getElementById("ageDelete").innerHTML = "<strong>Identificador de la categoria: </strong>" + respuesta.items[0].age
            document.getElementById("idDeleteCliente").value = respuesta.items[0].id
            
            datosdelciente.style.display="none"
            modificarcliente.style.display="none"
            nuevocliente.style.display="none"
            borrarcliente.style.display="block"
            
        }
    }
    
}

function guardarNuevoCliente() {
    
    //recupera información del formulario
    idCliente = document.getElementById("id").value;
    nameCliente = document.getElementById("name").value;
    emailCliente = document.getElementById("email").value;
    ageCliente = document.getElementById("age").value;
    
    //Asigna la informaciòn que el usuario ingreso en cada uno de los campos del formulario a un objeto javascript
    let registrocliente = {
        id: idCliente,
        name: nameCliente,
        email: emailCliente,
        age: ageCliente,
    };
    
    //convierto el objeto de javascript a formato json
    let objetoJSON = JSON.stringify(registrocliente);
    
    let url =
      "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";
   
      //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();

    /*2 propiedad onreadystatechange asigna a una funcion
    que funcion valida si la respuesta fue exitosa
    readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
    le aplica formato y modifica la pagina o vista
    */
   peticion.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 201) {         
           //Configura el aspecto de la pagina
           traerdatosCliente()
           inicial()
    }
  };
  //Configura la peticion
  peticion.open("POST", url, true);
  //Indico que la peticion recibe formato JSON
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  //Hago un llamado o invoco la peticion
  peticion.send(objetoJSON);
}

function guardarEditarCliente() {

    //recuperar la informacion ingresada en el formulario
    let idModifCliente = document.getElementById("idModifCliente").value
    let nameModifCliente = document.getElementById("nameModifCliente").value
    let emailModifCLiente = document.getElementById("emailModifCLiente").value
    let ageModifCliente = document.getElementById("ageModifCliente").value
  
    //creo un objeto javascript
    let objeto = {
      id: idModifCliente,
      name: nameModifCliente,
      email: emailModifCLiente,
      age: ageModifCliente,
    }
  
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    let url =
    "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";
  
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
  
        //Configura el aspecto de la pagina
        traerdatosCliente()
        inicial()
      }
    }
  
    peticion.open("PUT", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
  }

function guardarBorrarCliente() {
    let url =
    "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/client/client";
  //Creo un objeto para poder procesar la peticion ajax
  let objetoPeticion = new XMLHttpRequest();
  let id = document.getElementById("idDeleteCliente").value;
  //objeto javascript
  let parametro = {
    id: id,
  };
  //Crea un objeto de tipo JSON a partir de un objeto javascript
  let objetoJSON = JSON.stringify(parametro);

  objetoPeticion.open("DELETE", url, true);
  objetoPeticion.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8"
  );
  objetoPeticion.send(objetoJSON);

  objetoPeticion.onreadystatechange = function () {
    if (objetoPeticion.readyState == 4 && objetoPeticion.status == 204) {
        traerdatosCliente();
        inicial();
    }
  };
}