var proveedores;


function cargarListaProveedor() {
    mostrarProveedores();
}

function cargarProveedoresEliminados() {
    mostrarProveedoresEl();
}

function mostrarProveedores() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "https://www.refaccionariacinthya.com/servicios/refaccionaria/public/api/proveedor/getAll"
            }
    ).done(function (data) {
        proveedores = data.data;
        var tabla = "";

        for (var i = 0; i < proveedores.length; i++) {

            tabla += "<tr>";
            tabla += "<td id='idCliente' style='display:none'>" + proveedores[i].idProveedor + "</td>";
            tabla += "<td>" + proveedores[i].nombreProveedor + "</td>";
            tabla += "<td>" + proveedores[i].telefonoProveedor + "</td>";
            tabla += "<td>" + proveedores[i].correoProveedor + "</td>";
            tabla += "<td>" + proveedores[i].nombreContacto + "</td>";
            tabla += "<td>" + proveedores[i].telefonoContacto + "</td>";
            tabla += "<td>" + proveedores[i].correoContacto + "</td>";
            
            tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProveedor(" + i + ")'>Modificar</button></td>";
            tabla += "<td><button class='btn btn-danger' onclick='eliminarProveedor(" + i + ")'>Eliminar</button></td>";
            tabla += "</tr>";
        }

        $('#tbProveedor').html(tabla);
    });
}

function cargarVerProveedores() {

    $.ajax(
            {
                type: "GET",
                url: "Proveedor/listas.html",
                async: true
            }
    ).done(function (data) {
        cerrarGuardarProveedor();
        mostrarProveedores();
        $('#principal').html(data);
    }
    );
}

function cargarGuardarProveedor() {

    $.ajax(
            {
                type: "GET",
                url: "Proveedor/insercion.html",
                async: true
            }
    ).done(function (data) {
        mostrarProveedores();

//        $('#secundario').html(data);
//        $('#secundario').addClass("col-sm-4");
//        $('#principal').removeClass("col-sm-12");
//        $('#principal').addClass("col-sm-8");

        $("#secundario").html(data);
        $("#secundario").removeClass("col-sm-0");
        $("#secundario").addClass("col-sm-4");
        $("#secundario").show();
        $("#principal").removeClass("col-sm-12");
        $("#principal").addClass("col-sm-8");
    }
    );
}

function cerrarGuardarProveedor() {

    mostrarProveedores();
    $('#secundario').html("");
    $('#secundario').removeClass("col-sm-4");
    $('#secundario').addClass("col-sm-0");
    $('#secundario').removeClass("col-sm-8");
    $('#secundario').addClass("col-sm-12");
}

function cargarModificarProveedor(posicion) {
    var proveedorActual = proveedores[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Proveedor/modificarProveedor.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtProveedorId").val(proveedorActual.idCliente);
        $("#txtNombreProveedor").val(proveedorActual.nombreProveedor);
        $("#txtTelefonoProveedor").val(proveedorActual.telefonoProveedor);
        $("#txtCorreoProveedor").val(proveedorActual.correoProveedor);
        $("#txtNombreContacto").val(proveedorActual.nombreContacto);
        $("#txtTelefonoContacto").val(proveedorActual.telefonoContacto);
        $("#txtCorreoContacto").val(proveedorActual.correoContacto);
        
        cargarListaProveedor();
        $("#secundario").removeClass("col-sm-0");
        $("#secundario").addClass("col-sm-4");

        $("#secundario").show();

        $("#principal").removeClass("col-sm-12");
        $("#principal").addClass("col-sm-8");

    });
}

function cerrarGuardarProveedor() {
    $("#secundario").removeClass("col-sm-4");
    $("#secundario").addClass("col-sm-0");
    $("#secundario").hide();

    $("#principal").removeClass("col-sm-8");
    $("#principal").addClass("col-sm-12");
}


function cargarVerProveedoresEl() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "api/proveedor/getAllDeleted"
            }
    ).done(function (data) {
        proveedores = data.respuesta;
        var tabla = "";

        for (var i = 0; i < proveedores.length; i++) {
            tabla += "<tr>";
            tabla += "<td id='idCliente' style='display:none'>" + proveedores[i].idProveedor + "</td>";
            tabla += "<td>" + proveedores[i].nombreProveedor + "</td>";
            tabla += "<td>" + proveedores[i].telefonoProveedor + "</td>";
            tabla += "<td>" + proveedores[i].correoProveedor + "</td>";
            tabla += "<td>" + proveedores[i].nombreContacto + "</td>";
            tabla += "<td>" + proveedores[i].telefonoContacto + "</td>";
            tabla += "<td>" + proveedores[i].correoContacto + "</td>";
            

            tabla += "<td><button class='btn btn-danger' onclick='reactivarProveedor(" + i + ")'>Activar</button></td>";
            tabla += "</tr>";
        }

        $('#tbProveedor').html(tabla);
    });
}

function mostrarProveedoresEl() {
    $.ajax(
            {
                type: "GET",
                url: "Proveedor/eliminados.html",
                async: true
            }
    ).done(function (data) {
        cerrarGuardarProveedor();
        cargarVerProveedoresEl();
        $('#principal').html(data);
    }
    );
}

function guardarProveedor()
{
    var nombreProveedor = document.getElementById("txtNombreProveedor").value;
    var telefonoProveedor = document.getElementById("txtTelefonoProveedor").value;
    var correoProveedor = document.getElementById("txtCorreoProveedor").value;
    var nombreContacto= document.getElementById("txtNombreContacto").value;    
    var telefonoContacto = document.getElementById("txtTelefonoContacto").value;
    var correoContacto = document.getElementById("txtCorreoContacto").value;    
    

    var proveedor = {
        nombreProveedor: nombreProveedor,
        nombreContacto: nombreContacto,
        telefonoProveedor: telefonoProveedor,
        telefonoContacto : telefonoContacto,
        correoProveedor: correoProveedor,
        correoContacto: correoContacto     
    };
    var json = {json: JSON.stringify(proveedor)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "api/proveedor/insert",
                data: json
            }
    ).done(function (data)
    {
        if (data.result === "OK")
        {
            //alert('Inserción Realizada');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha guardado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cerrarGuardarProveedor();
            cargarVerProveedores();
        } else
        {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });

}

function modificarProveedor() {

    var idProveedor = document.getElementById("txtClienteid").value;
    var nombreProveedor = document.getElementById("txtNombreProveedor").value;
    var telefonoProveedor = document.getElementById("txtTelefonoProveedor").value;
    var correoProveedor = document.getElementById("txtCorreoProveedor").value;
    var nombreContacto= document.getElementById("txtNombreContacto").value;    
    var telefonoContacto = document.getElementById("txtTelefonoContacto").value;
    var correoContacto = document.getElementById("txtCorreoContacto").value;   

    var proveedor = {
        nombreProveedor: nombreProveedor,
        nombreContacto: nombreContacto,
        telefonoProveedor: telefonoProveedor,
        telefonoContacto : telefonoContacto,
        correoProveedor: correoProveedor,
        correoContacto: correoContacto     
    };
    var json = {json: JSON.stringify(proveedor)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "api/proveedor/update",
                data: json
            }
    ).done(function (data)
    {
        if (data.result === "OK")
        {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha modificado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cerrarGuardarProveedor();
            cargarVerProveedores();
        } else
        {

            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function eliminarProveedor(posicion) {

    var idProveedor = proveedores[posicion].idProveedor;
    
    var proveedor = {
        idProveedor: idProveedor
    };

    var json = {json: JSON.stringify(proveedor)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asycn: true,
                url: "api/proveedor/delete",
                data: json
            }
    ).done(function (data) {

        if (data.result === "OK") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cargarVerProveedores();
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function reactivarProveedor(posicion) {

    var idProveedor = proveedores[posicion].idProveedor;
    
    var proveedor = {
        idProveedor: idProveedor
    };

    var json = {json: JSON.stringify(proveedor)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asycn: true,
                url: "api/proveedor/activate",
                data: json
            }
    ).done(function (data) {

        if (data.result === "OK") {
            //alert("Activación exitosa");
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha reactivado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            cargarVerProveedores();
        } else {
           
             Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

function busquedaProveedor(bus) {


    bus = $('#txtSearch').val();

    var data = {
        busqueda: bus
    };

    $.ajax(
            {
                type: "GET",
                url: "api/proveedor/searchBy",
                data: data,
                async: true

            }
    ).done(
            function (data) {
                proveedores = data.respuesta;
                var tabla = "";

                for (var i = 0; i < proveedores.length; i++) {

                    tabla += "<tr>";
                    tabla += "<td id='idProveedor' style='display:none'>" + proveedores[i].idProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].nombreProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].telefonoProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].correoProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].nombreContacto + "</td>";
                    tabla += "<td>" + proveedores[i].telefonoContacto + "</td>";
                    tabla += "<td>" + proveedores[i].correoContacto + "</td>";

                    tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProveedor(" + i + ")'>Modificar</button></td>";
                    tabla += "<td><button class='btn btn-danger' onclick='eliminarProveedor(" + i + ")'>Eliminar</button></td>";
                    tabla += "</tr>";
                }
                $('#tbProveedor').html(tabla);
            });
}

function busquedaProveedoresEl() {


    var bus = $('#txtSearchEl').val();
    var data = {
        busqueda: bus
    };

    $.ajax(
            {
                type: "GET",
                url: "api/proveedor/searchByDeleted",
                data: data,
                async: true

            }
    ).done(
            function (data) {
                proveedores = data;
                var tabla = "";

                proveedores = data.respuesta;
                var tabla = "";

                for (var i = 0; i < proveedores.length; i++) {

                    tabla += "<tr>";
                    tabla += "<td id='idProveedor' style='display:none'>" + proveedores[i].idProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].nombreProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].telefonoProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].correoProveedor + "</td>";
                    tabla += "<td>" + proveedores[i].nombreContacto + "</td>";
                    tabla += "<td>" + proveedores[i].telefonoContacto + "</td>";
                    tabla += "<td>" + proveedores[i].correoContacto + "</td>";

                    tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProveedor(" + i + ")'>Modificar</button></td>";
                    tabla += "<td><button class='btn btn-danger' onclick='reactivarProveedor(" + i + ")'>Reactivar</button></td>";
                    tabla += "</tr>";
                }
                $('#tbProveedor').html(tabla);
            });
}





