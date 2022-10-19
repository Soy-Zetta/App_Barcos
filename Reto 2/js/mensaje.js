//accedo a elementos por id
let nuevomensaje = document.getElementById("nuevomensaje")
let borrarmensaje = document.getElementById("borrarmensaje")
let datosmensaje = document.getElementById("datosmensaje")
let modificarmensaje = document.getElementById("modificarmensaje")




inicial()
traermensajes()


function inicial() {

    datosmensaje.style.display="block"
    nuevomensaje.style.display="none"
    borrarmensaje.style.display="none"
    modificarmensaje.style.display="none"



}

function agregarmensaje() {
    
    document.getElementById("id").value=""
    document.getElementById("messagetext").value=""
    
    datosmensaje.style.display="none"
    nuevomensaje.style.display="block"
}


function eliminarmensaje() 
{
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message"
    //Creo un objeto para poder procesar la peticion ajax
    let peticion = new XMLHttpRequest();
    let id = document.getElementById("idDeleteMensaje").value
    //objeto javascript
    let parametro = 
    {
    id: id
    }
    //Crea un objeto de tipo JSON a partir de un objeto javascript
    let objetoJSON = JSON.stringify(parametro)

    peticion.open("DELETE",url,true);        
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")       
    peticion.send(objetoJSON);       

    peticion.onreadystatechange = function ()
    {
        if (peticion.readyState == 4 && peticion.status ==204)
        {
            inicial()
            traermensajes()
        }
    }
    
}

function traermensajes() {
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";
    //Creo un objeto para poder procesar la peticion ajax
    let registromensaje = ""
    let id = ""

    let peticion = new XMLHttpRequest();
    peticion.open("GET", url, true);
    peticion.send();
    //let salida = "<strong>Texto del mensaje :</strong>";
    //si la respusta esta lista y no hubo error
    peticion.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(this.responseText);

            for (let i in respuesta.items) {
                id = respuesta.items[i].id

                registromensaje += "<tr>\
                        <th scope=\"row\">" + respuesta.items[i].id + "</th>\
                        <td>" + respuesta.items[i].messagetext + "</td>\
                        <td>\
                            <button class=\"btn btn-outline-dark\" onclick=\"eliminartext(" + id + ")\">Borrar Mensaje</button>\
                            <button class=\"btn btn-outline-dark\" onclick=\"editarMensaje(" + id + ")\">Modificar Mensaje</button>\
                        </td>\
                        </tr>"
            }
            document.getElementById("registromensaje").innerHTML = registromensaje;
        }
    };

}

function eliminartext(id) {
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message"
    //Creo un objeto para poder procesar la peticion ajax
    let peticion = new XMLHttpRequest();
    peticion.open("GET",url + "/" + id ,true);
    peticion.send();

    peticion.onreadystatechange = function (){
        //si la respusta esta lista y no hubo error
        if (this.readyState==4 && this.status==200){

            let respuesta = JSON.parse(peticion.responseText)

            document.getElementById("idmensaje").innerHTML = "<strong>Id del Mensaje: </strong>" + respuesta.items[0].id
            document.getElementById("mensajetext").innerHTML = "<strong>Mensaje: </strong>" + respuesta.items[0].messagetext
            document.getElementById("idDeleteMensaje").value = respuesta.items[0].id
            
            datosmensaje.style.display="none"
            borrarmensaje.style.display="block"
            
        }
    }
    
}

function guardarNuevoMensaje() {
    
    //recupera información del formulario
    id = document.getElementById("id").value;
    messagetext = document.getElementById("messagetext").value;
    
    //Asigna la informaciòn que el usuario ingreso en cada uno de los campos del formulario a un objeto javascript
    let registrocliente = {
        id: id,
        messagetext: messagetext,
    };
    
    //convierto el objeto de javascript a formato json
    let objetoJSON = JSON.stringify(registrocliente);
    
    let url =
      "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";
   
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
           traermensajes()
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

function editarMensaje(id) {
   
    let url = "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";
    //Creo un objeto para poder procesar la peticion ajax
    let peticion = new XMLHttpRequest();
    peticion.open("GET", url + "/" + id, true);
    peticion.send();

    peticion.onreadystatechange = function () {
        idModif = document.getElementById("idModif");
        messagetextModif = document.getElementById("messagetextModif");

        if (this.readyState == 4 && this.status == 200) {

            let respuesta = JSON.parse(peticion.responseText)

            //Asigna la informaciòn obtenida tras la invocaciòn del ws a cada uno de los campos del formulario           
            idModif.value = respuesta.items[0].id
            messagetextModif.value = respuesta.items[0].messagetext



            document.getElementById("idLabelMensaje").innerHTML="<strong>Id del Mensaje: </strong>" + idModif.value
            
            //Configura aspecto visual de la interfaz

            datosmensaje.style.display="none"
            nuevomensaje.style.display="none"
            borrarmensaje.style.display="none"
            modificarmensaje.style.display="block"
            
        }
    };

}

function guardarEditarMensaje() {

    //recuperar la informacion ingresada en el formulario
    let idModif = document.getElementById("idModif").value
    let messagetextModif = document.getElementById("messagetextModif").value
  
    //creo un objeto javascript
    let objeto = {
      id: idModif,
      messagetext: messagetextModif,
    }
  
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    let url =
    "https://ge024089e72e69f-vlumjxtxn11s2y90.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/message/message";
  
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
        traermensajes()
        inicial()
      }
    }
  
    peticion.open("PUT", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
  }