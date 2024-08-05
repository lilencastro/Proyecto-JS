// CLASES
class Productos {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

}
let listaProductos = [];

class itemPedido {
    constructor(idProducto, nombre, cantidad, precioUnitario){
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.precioTotal = cantidad * precioUnitario;
    }
}
let pedidoCarrito = [];


// Carga de productos
listaProductos.push(new Productos(0, "Banana", 2500));
listaProductos.push(new Productos (1, "Manzana", 3000));
listaProductos.push(new Productos (2, "Pera", 1400));
listaProductos.push(new Productos (3, "Papa", 1200));
listaProductos.push(new Productos (4, "Berenjena", 1500));
listaProductos.push(new Productos (5, "Naranja", 1600));
listaProductos.push(new Productos (6, "Calabaza", 2400));
listaProductos.push(new Productos (7, "Brocoli", 2300));
listaProductos.push(new Productos (8, "Frutilla", 3400));
listaProductos.push(new Productos (9, "Kiwi", 2700));



// FUNCIONES

function ingresoPedido(){
    let pedido = -1;
    let input = prompt("Ingrese el número de producto que desea:\n1. Banana     $2500\n2. Manzana    $3000\n3. Pera       $1400\n4. Papa       $1200\n5. Berenjena  $1500\n6. Naranja    $1600\n7. Calabaza   $2400\n8. Brocoli    $2300\n9. Frutilla   $3400\n10. Kiwi  $2700\n\nIngrese 0 (cero) para finalizar el pedido.")
    if(parseInt(input) != null){
        pedido = parseInt(input);
    } else {
        alert("Debe ingresar un numero.");
    }
    return pedido;
}

function verificarExistencia(nombreProducto){
    let existe = false;
    for(producto of pedidoCarrito){
        if(producto.nombre == nombreProducto){
            existe = true;
        }
    }
    return existe;
}

function buscarPosicionProducto(nombreProducto){
    let pos = -1;
    for(item in pedidoCarrito){
        if(pedidoCarrito[item].nombre == nombreProducto){
            return pos = item; 
        }
    }
}

function calcularMontoFinal(){
    let monto = 0;
    for(item of pedidoCarrito){
        monto += item.precioTotal; 
    }
    return monto;
}



// Ingreso de producto por el usuario
let pedido = ingresoPedido();

// Carga del producto en el carrito
while(pedido != 0){
    if(pedido > 0 && pedido <= 10){
        if(verificarExistencia(listaProductos[pedido-1].title)){
            let pos = buscarPosicionProducto(listaProductos[pedido-1].title);
            pedidoCarrito[pos].cantidad++;
            pedidoCarrito[pos].precioTotal = pedidoCarrito[pos].cantidad * pedidoCarrito[pos].precioUnitario;
        }
        else {
            pedidoCarrito.push(new itemPedido((pedido-1), listaProductos[pedido - 1].title, 1, (listaProductos[pedido-1].price)))
        }    
    } else if(pedido == 0){
        break;
    } 
    else {
        alert("Ingrese un numero de producto correcto.");
    }
    pedido = ingresoPedido();
}
alert("Carga de pedido finalizada, presione Aceptar para ver el detalle del pedido. ")


// Visualizacion del pedido
for(let i=0; i < pedidoCarrito.length; i++){
    document.write(`
    Producto: ${pedidoCarrito[i].nombre} <br>
    Cantidad: ${pedidoCarrito[i].cantidad}\n <br>
    Precio: $${pedidoCarrito[i].precioTotal} <br>
    <br><br>`);
}
document.write(`Precio total: $${calcularMontoFinal()}`)
