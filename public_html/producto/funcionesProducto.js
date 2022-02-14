var productos;
var facturasP;
var proveedoresP;
var preferencia;
var usuario;
var auxImg;
var preferencias;
var cargarPreferencia;
var cPreferencia = [];
var pos = -1;
var totalPreferencias = 0;

function cargarListaProducto() {
    mostrarProductos();
}

function cargarProductosEliminados() {
    mostrarClientesEl();
}

function mostrarProductos() { 
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "https://www.refaccionariacinthya.com/servicios/refaccionaria/public/api/producto/getAll"
            }
    ).done(function (data) {
        productos = data.data;
        var tabla = "";

        for (var i = 0; i < productos.length; i++) {

            tabla += "<tr>";
            tabla += "<td id='idProducto' style='display:none'>" + productos[i].idProducto + "</td>";
            tabla += "<td>" + productos[i].codigo + "</td>";
            tabla += "<td>" + productos[i].nombreProducto + "</td>";
            tabla += "<td>" + productos[i].numeroParte + "</td>";
            tabla += "<td>" + productos[i].marca + "</td>";
            tabla += "<td><img width='150' height='250' src='" + productos[i].foto + "'/></td>";
            tabla += "<td>" + productos[i].descripcion + "</td>";
            tabla += "<td>" + productos[i].costoCompra + "</td>";
            tabla += "<td>" + productos[i].precioVenta + "</td>";
            tabla += "<td>" + productos[i].posicion + "</td>";
            tabla += "<td>" + productos[i].unidad + "</td>";
            tabla += "<td>" + productos[i].stock + "</td>";
            tabla += "<td>" + productos[i].ultimaFechaDeCompra + "</td>";
            tabla += "<td>" + productos[i].idFactura.numeroFactura + "</td>";
            tabla += "<td>" + productos[i].idProveedor.nombreProveedor + "</td>";
            tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProducto(" + i + ")'>Modificar</button></td>";
            tabla += "<td><button class='btn btn-danger' onclick='eliminarProducto(" + i + ")'>Eliminar</button></td>";
            tabla += "</tr>";
        }

        $('#tbProducto').html(tabla);
    });
}

function cargarVerProductos() {

    $.ajax(
            {
                type: "GET",
                url: "Producto/listas.html",
                async: true
            }
    ).done(function (data) {
        mostrarProductos();
        $('#principal').html(data);
    }
    );
}

function cargarGuardarProducto() {

    $.ajax(
            {
                type: "GET",
                url: "Producto/insercion.html",
                async: true
            }
    ).done(function (data) {
        mostrarProductos();
        

//        $('#secundario').html(data);
//        $('#secundario').addClass("col-sm-4");
//        $('#principal').removeClass("col-sm-12");
//        $('#principal').addClass("col-sm-8");

          $("#secundario").html(data);
//        $("#secundario").removeClass("col-sm-0");
//        $("#secundario").addClass("col-sm-4");
          $("#secundario").show();
//        $("#principal").removeClass("col-sm-12");
//        $("#principal").addClass("col-sm-8");
       // cargarFacturas();
       // cargarProveedores();
    }
    );
}

function cerrarGuardarProducto(){  

    mostrarClientes();
    $('#secundario').html("");
    $('#secundario').removeClass("col-sm-4");
    $('#secundario').addClass("col-sm-0");
    $('#secundario').removeClass("col-sm-8");
    $('#secundario').addClass("col-sm-12");
}

function cargarModificarProducto(posicion) {
    var productoActual = productos[posicion];
    $.ajax(
            {
                type: "GET",
                async: true,
                url: "Producto/modificarProducto.html"
            }
    ).done(function (data) {
        $("#secundario").html(data);
        $("#txtIdProducto").val(productoActual.idProducto);
        $("#txtCodigo").val(productoActual.codigo);
        $("#txtNombreProducto").val(productoActual.nombreProducto);
        $("#txtNumeroParte").val(productoActual.numeroParte);
        $("#txtMarca").val(productoActual.marca);
        $("#txtDescripcion").val(productoActual.descripcion);
        $("#txtCostoCompra").val(productoActual.costoCompra);
        $("#txtPrecioVenta").val(productoActual.precioVenta);
        $("#txtPosicion").val(productoActual.posicion); 
        
       
        $("#txtUnidad > option[value="+productoActual.unidad+"]").attr("selected",true);
        
        $("#txtStock").val(productoActual.stock);
        $("#txtUltimaCompra").val(productoActual.ultimaFechaDeCompra);

        $("#dtFacturas").val(productoActual.idFactura.numeroFactura);
        $("#txtIdFactura").val(productoActual.idFactura.idFacturaCompra);
        
        $("#dtProveedores").val(productoActual.idProveedor.nombreProveedor);
        $("#txtIdProveedor").val(productoActual.idProveedor.idProveedor);
        var str = '<img class="w-50" height="150" id="txtFotoA" src="' + productoActual.foto + '"/>';
        $("#txtFotoB").html(str);
        $("#secundario").show();
        
        auxImg = productoActual.foto;
        
        cargarListaCliente();
        cargarFacturas();
        cargarProveedores();
        $("#secundario").removeClass("col-sm-0");
        $("#secundario").addClass("col-sm-4");

        $("#secundario").show();

        $("#principal").removeClass("col-sm-12");
        $("#principal").addClass("col-sm-8");

    });
}

function cerrarGuardarProducto() {
    $("#secundario").removeClass("col-sm-4");
    $("#secundario").addClass("col-sm-0");
    $("#secundario").hide();

    $("#principal").removeClass("col-sm-8");
    $("#principal").addClass("col-sm-12");
}


function mostrarProductosEl() {
    $.ajax(
            {
                type: "GET",
                asyc: true,
                url: "api/producto/getAllDeleted"
            }
    ).done(function (data) {
        productos = data.respuesta;
        var tabla = "";

        for (var i = 0; i < productos.length; i++) {
            tabla += "<tr>";
            tabla += "<td id='idProducto' style='display:none'>" + productos[i].idProducto + "</td>";
            tabla += "<td>" + productos[i].codigo + "</td>";
            tabla += "<td>" + productos[i].nombreProducto + "</td>";
            tabla += "<td>" + productos[i].numeroParte + "</td>";
            tabla += "<td>" + productos[i].marca + "</td>";
            tabla += "<td><img width='150' height='250' src='" + productos[i].foto + "'/></td>";
            tabla += "<td>" + productos[i].descripcion + "</td>";
            tabla += "<td>" + productos[i].costoCompra + "</td>";
            tabla += "<td>" + productos[i].precioVenta + "</td>";
            tabla += "<td>" + productos[i].posicion + "</td>";
            tabla += "<td>" + productos[i].unidad + "</td>";
            tabla += "<td>" + productos[i].stock + "</td>";
            tabla += "<td>" + productos[i].ultimaFechaDeCompra + "</td>";
            tabla += "<td>" + productos[i].idFactura.numeroFactura + "</td>";
            tabla += "<td>" + productos[i].idProveedor.nombreProveedor + "</td>";
            tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProducto(" + i + ")'>Modificar</button></td>";
            tabla += "<td><button class='btn btn-danger' onclick='reactivarProducto(" + i + ")'>Reactivar</button></td>";
            tabla += "</tr>";
        }

        $('#tbProducto').html(tabla);
    });
}

function cargarVerProductosEl() {
    $.ajax(
            {
                type: "GET",
                url: "Producto/eliminados.html",
                async: true
            }
    ).done(function (data) {
        cerrarGuardarCliente();
        mostrarProductosEl();
        $('#principal').html(data);
    }
    );
}

function cargarFacturas()
{
    var facturas = "<datalist id='lstFacturas'>";
    $.ajax(
            {
                type: "get",
                async: false,
                url: "api/factura/getAll"
            }).done(function (data) {
                facturasP=data.respuesta;
        for (var i = 0; i < facturasP.length; i++)
        {
            facturas += "<option data-value='" + facturasP[i].idFacturaCompra + "'>";
            facturas += facturasP[i].numeroFactura;
            facturas += "</option>";
        }
        facturas += "</datalist>";
        $("#divF").html(facturas);        
    });
}

function cargarProveedores()
{
    var proveedores = "<datalist id='lstProveedores'>";
    $.ajax(
            {
                type: "get",
                async: false,
                url: "api/proveedor/getAll"
            }).done(function (data) {
                proveedoresP=data.respuesta;
        for (var i = 0; i < proveedoresP.length; i++)
        {
            proveedores += "<option data-value='" + proveedoresP[i].idProveedor + "'>";
            proveedores += proveedoresP[i].nombreProveedor;
            proveedores += "</option>";
        }
        proveedores += "</datalist>";
        $("#divP").html(proveedores);        
    });
}


function readURLProducto(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#imgProducto")
                    .attr('src', e.target.result)
                    .width(50)
                    .height(150);
        };
        reader.readAsDataURL(input.files[0]);
    }
}


function guardarProducto(){

    var codigo = $('#txtCodigo').val();
    
    var nombreProducto = $('#txtNombreProducto').val();
    
    var numeroParte = $('#txtNumeroParte').val();
    
    var marca= $('#txtMarca').val();
    
    var foto = document.getElementById("imgProducto").src;
    
    var descripcion = $('#txtDescripcion').val();
    
    var costoCompra=$('#txtCostoCompra').val();
    
    var precioVenta=$('#txtPrecioVenta').val();
    
    var posicion=$('#txtPosicion').val();
    
    var stock=$('#txtStock').val();
    
    var unidad=$('#txtUnidad').val();
    
    var ultimaCompra=$('#txtUltimaCompra').val();
    
    var factura=$('#txtIdFactura').val(); 
    
    var proveedor=$('#txtIdProveedor').val();
    
    if(foto.length>100){
        var p={
            codigo:codigo,
            nombreProducto:nombreProducto,
            numeroParte:numeroParte,
            marca:marca,
            foto:foto,
            descripcion:descripcion,
            costoCompra:costoCompra,
            precioVenta:precioVenta,
            posicion:posicion,
            unidad:unidad,
            stock:stock,
            ultimaFechaDeCompra:ultimaCompra,
            idFactura:{
                idFacturaCompra:factura
            },
            idProveedor:{
              idProveedor:proveedor  
            }
        };
        var json={json:JSON.stringify(p)}; 
    }else{
        var p={
            codigo:codigo,
            nombreProducto:nombreProducto,
            numeroParte:numeroParte,
            marca:marca,
            foto:auxImg,
            descripcion:descripcion,
            costoCompra:costoCompra,
            precioVenta:precioVenta,
            unidad:unidad,
            stock:stock,
            ultimaFechaDeCompra:ultimaCompra,
            idFacturaCompra:{
                idFacturaCompra:factura
            },
            idProveedor:{
              idProveedor:proveedor  
            }
        };
        var json={json:JSON.stringify(p)};
    }
    
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "api/producto/insert",
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
            cerrarGuardarProducto();
            cargarVerProductos();
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

function modificarProducto() {
    var idProducto = $('#txtIdProducto').val();

    var codigo = $('#txtCodigo').val();
    
    var nombreProducto = $('#txtNombreProducto').val();
    
    var numeroParte = $('#txtNumeroParte').val();
    
    var marca= $('#txtMarca').val();
    
    var foto = document.getElementById("imgProducto").src;
    
    var descripcion = $('#txtDescripcion').val();
    
    var costoCompra=$('#txtCostoCompra').val();
    
    var precioVenta=$('#txtPrecioVenta').val();
    
    var posicion=$('#txtPosicion').val();
    
    var stock=$('#txtStock').val();
    
    var unidad=$('#txtUnidad').val();
    
    var ultimaCompra=$('#txtUltimaCompra').val();
    
    var factura=$('#txtIdFactura').val(); 
    
    var proveedor=$('#txtIdProveedor').val();  

    if(foto.length>100){
        var p={
            idProducto:idProducto,
            codigo:codigo,
            nombreProducto:nombreProducto,
            numeroParte:numeroParte,
            marca:marca,
            foto:foto,
            descripcion:descripcion,
            costoCompra:costoCompra,
            precioVenta:precioVenta,
            posicion:posicion,
            unidad:unidad,
            stock:stock,
            ultimaFechaDeCompra:ultimaCompra,
            idFactura:{
                idFacturaCompra:factura
            },
            idProveedor:{
              idProveedor:proveedor  
            }
        };
        var json={json:JSON.stringify(p)}; 
    }else{
        var p={
            idProducto:idProducto,
            codigo:codigo,
            nombreProducto:nombreProducto,
            numeroParte:numeroParte,
            marca:marca,
            foto:auxImg,
            descripcion:descripcion,
            costoCompra:costoCompra,
            precioVenta:precioVenta,
            unidad:unidad,
            stock:stock,
            ultimaFechaDeCompra:ultimaCompra,
            idFacturaCompra:{
                idFacturaCompra:factura
            },
            idProveedor:{
              idProveedor:proveedor  
            }
        };
        var json={json:JSON.stringify(p)};
    }
    
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asyc: true,
                url: "api/producto/update",
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
            cerrarGuardarProducto();
            cargarVerProductos();
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

function eliminarProducto(posicion) {

    var idProducto = productos[posicion].idProducto;
    alert(idProducto);
    
    var producto = {
        idProducto: idProducto
    };

    var json = {json: JSON.stringify(producto)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asycn: true,
                url: "api/producto/delete",
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
            cargarVerProductos();
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

function reactivarProducto(posicion) {

    var idProducto = productos[posicion].idProducto;
    alert(idProducto);
    
    var producto = {
        idProducto: idProducto
    };

    var json = {json: JSON.stringify(producto)};
    alert(JSON.stringify(json));

    $.ajax(
            {
                type: "POST",
                asycn: true,
                url: "api/producto/activate",
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
            cargarVerProductos();
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

function busquedaProducto(bus) {


    bus = $('#txtSearch').val();
    
    var data = {
        busqueda: bus
    };

    $.ajax(
            {
                type: "GET",
                url: "api/producto/searchBy",
                data: data,
                async: true

            }
    ).done(
            function (data) {
                productos = data.respuesta;
                var tabla = "";

                for (var i = 0; i < productos.length; i++) {

                    tabla += "<tr>";
                    tabla += "<td id='idProducto' style='display:none'>" + productos[i].idProducto + "</td>";
                    tabla += "<td>" + productos[i].codigo + "</td>";
                    tabla += "<td>" + productos[i].nombreProducto + "</td>";
                    tabla += "<td>" + productos[i].numeroParte + "</td>";
                    tabla += "<td>" + productos[i].marca + "</td>";
                    tabla += "<td><img width='150' height='250' src='" + productos[i].foto + "'/></td>";
                    tabla += "<td>" + productos[i].descripcion + "</td>";
                    tabla += "<td>" + productos[i].costoCompra + "</td>";
                    tabla += "<td>" + productos[i].precioVenta + "</td>";
                    tabla += "<td>" + productos[i].posicion + "</td>";
                    tabla += "<td>" + productos[i].unidad + "</td>";
                    tabla += "<td>" + productos[i].stock + "</td>";
                    tabla += "<td>" + productos[i].ultimaFechaDeCompra + "</td>";
                    tabla += "<td>" + productos[i].idFactura.numeroFactura + "</td>";
                    tabla += "<td>" + productos[i].idProveedor.nombreProveedor + "</td>";
                    tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProducto(" + i + ")'>Modificar</button></td>";
                    tabla += "<td><button class='btn btn-danger' onclick='eliminarCliente(" + i + ")'>Eliminar</button></td>";
                    tabla += "</tr>";        
                }
                $('#tbProducto').html(tabla);
            });
}

function busquedaProductosEl(bus) {


    bus = $('#txtSearchEl').val();
    var data = {
        busqueda: bus
    };
       
    
    
    $.ajax(
            {
                type: "GET",
                url: "api/producto/searchByDeleted",
                data: data,
                async: true

            }
    ).done(
            function (data) {
                productos = data.respuesta;
                var tabla = "";

                for (var i = 0; i < productos.length; i++) {

                    tabla += "<tr>";
                    tabla += "<td id='idProducto' style='display:none'>" + productos[i].idProducto + "</td>";
                    tabla += "<td>" + productos[i].codigo + "</td>";
                    tabla += "<td>" + productos[i].nombreProducto + "</td>";
                    tabla += "<td>" + productos[i].numeroParte + "</td>";
                    tabla += "<td>" + productos[i].marca + "</td>";
                    tabla += "<td><img width='150' height='250' src='" + productos[i].foto + "'/></td>";
                    tabla += "<td>" + productos[i].descripcion + "</td>";
                    tabla += "<td>" + productos[i].costoCompra + "</td>";
                    tabla += "<td>" + productos[i].precioVenta + "</td>";
                    tabla += "<td>" + productos[i].posicion + "</td>";
                    tabla += "<td>" + productos[i].unidad + "</td>";
                    tabla += "<td>" + productos[i].stock + "</td>";
                    tabla += "<td>" + productos[i].ultimaFechaDeCompra + "</td>";
                    tabla += "<td>" + productos[i].idFactura.numeroFactura + "</td>";
                    tabla += "<td>" + productos[i].idProveedor.nombreProveedor + "</td>";
                    tabla += "<td><button class='btn btn-warning text-white' onclick='cargarModificarProducto(" + i + ")'>Modificar</button></td>";
                    tabla += "<td><button class='btn btn-danger' onclick='reactivarProducto(" + i + ")'>Reactivar</button></td>";
                    tabla += "</tr>";
                }
                $('#tbProducto').html(tabla);
            });
}



