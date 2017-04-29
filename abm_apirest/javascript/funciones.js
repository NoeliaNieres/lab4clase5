
function traerTodos(){

    var pagina = "http://localhost:8080/lab4clase5/abm_apirest/apirest.php/traerTodos";

    $.ajax({
        type: 'GET',
        url: pagina,
        dataType: "json",
        async: true
    })
    .done(function (objJson) {

        var tablaEncabezado = "<table border='1' class='table'>";
        tablaEncabezado += "<tr><th>ID</th><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Foto</th></tr>";
        var tablaCuerpo = "";
        var tablaPie = "</tr></html>";

        for(var i=0;i<objJson.length;i++){
            tablaCuerpo += "<tr><td>"+objJson[i].id+"</td><td>"+objJson[i].nombre;
            tablaCuerpo += "</td><td>"+objJson[i].apellido+"</td><td>"+objJson[i].dni;
            tablaCuerpo += "</td><td><a href='#' data-id='"+objJson[i].id+"' onclick='administrarModificar("+objJson[i].id+")' data-toggle='modal' data-target='#myModal' class='open-Modal'>MODIFICAR</a>&nbsp;";
            tablaCuerpo += "&nbsp;<a href='#' onclick='eliminar("+objJson[i].id+")'>ELIMINAR</a></td></tr>";
        }

        $("#divTabla").html(tablaEncabezado+tablaCuerpo+tablaPie);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    

}
function agregar(){

    var pagina = "http://localhost:8080/lab4clase5/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'POST',
        url: pagina,
        dataType: "json",
        data: {
            valorChar : $("#valor_char").val(),
            valorDate : $("#valor_date").val(),
            valorInt : $("#valor_int").val()
        },
        async: true
        })
    .done(function (objJson) {

        alert("Elemento agregado exitosamente!!!");        

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
    });    

}
function administrarModificar(id){

    var pagina = "http://localhost:8080/lab4clase5/abm_apirest/apirest.php/traerUno/"+id;

    $.ajax({
        type: 'GET',
        url: pagina,
        dataType: "json",
        async: true
    })
    .done(function (objJson) {

        $("#id").val(objJson[0].id);
        $("#valor_char").val(objJson[0].valor_char);
        $("#valor_date").val(objJson[0].valor_date);
        $("#valor_int").val(objJson[0].valor_int);

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    
}

function modificar(){

    if(!confirm("Seguro de modificar?"))
        return;

    var pagina = "http://localhost:8080/lab4clase5/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'PUT',
        url: pagina,
        dataType: "json",
        data: {
            id : $("#id").val(),
            valorChar : $("#valor_char").val(),
            valorDate : $("#valor_date").val(),
            valorInt : $("#valor_int").val()
        },
        async: true
    })
    .done(function (objJson) {

        $("#divMensaje").css("display", "block");
        $("#spanMensaje").removeClass("label label-danger");
        $("#spanMensaje").addClass("label label-success");
        $("#spanMensaje").html("Elemento modificado exitosamente!!!");
        $("#btnModificar").css("display", "none");

        traerTodos();

    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        $("#divMensaje").css("display", "block");
        $("#spanMensaje").addClass("label label-danger");
        $("#spanMensaje").html("Error al intentar modificar elemento!!!");
        $("#btnModificar").css("display", "none");
    });    

}
function eliminar(id){

    if(!confirm("Seguro de eliminar el elemneto con id="+id+"?"))
        return;

    var pagina = "http://localhost:8080/lab4clase5/abm_apirest/apirest.php/registro";

    $.ajax({
        type: 'DELETE',
        url: pagina,
        dataType: "json",
        data: {
            id : id
        },
        async: true
    })
    .done(function (objJson) {

        traerTodos();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText + "\n" + textStatus + "\n" + errorThrown);
    });    

}