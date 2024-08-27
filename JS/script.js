// CLASES
class Productos {
    static id = 0;

    constructor(descripcion, price) {
        this.id = ++Productos.id;
        this.descripcion = descripcion;
        this.price = price;
    }


}
let listaProductos = [];

class itemPedido {
    constructor(nombre, cantidad, precioUnitario){
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.precioTotal = cantidad * precioUnitario;
    }
}
let pedidoCarrito = [];

// Carga de productos
listaProductos.push(new Productos("Remera", 2500));
listaProductos.push(new Productos ("Bicicleta", 3000));
listaProductos.push(new Productos ("Buzo", 1400));
listaProductos.push(new Productos ("Gorra", 1200));
listaProductos.push(new Productos ("Comando", 1500));
listaProductos.push(new Productos ("Pantalon", 1600));

listaProductos.forEach((producto) => {
    let descripcion = document.getElementById(`description-product-${producto.id}`);
    let price = document.getElementById(`price-product-${producto.id}`);
    descripcion.innerHTML = producto.descripcion;
    price.innerHTML = "$ " + producto.price;
})


// FUNCIONES
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
function findProductInCart(producto){
    return pedidoCarrito.find((pedidoCarrito) => pedidoCarrito.nombre === producto);
}



// Botones agregar
let totalPedido = 0;
let buttons = document.querySelectorAll('.add-to-cart-btn');
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let idProduct = this.getAttribute('data-product-name');

        let cartItems = document.getElementById('cart-items');
        
        
        if(verificarExistencia(listaProductos[idProduct-1].descripcion)){
            let pos = buscarPosicionProducto(listaProductos[idProduct - 1].descripcion);
            pedidoCarrito[pos].cantidad++;
            pedidoCarrito[pos].precioTotal = pedidoCarrito[pos].cantidad * pedidoCarrito[pos].precioUnitario;
        } else {
            pedidoCarrito.push(new itemPedido(listaProductos[idProduct - 1].descripcion, 1, listaProductos[idProduct - 1].price));
        }
        
        let item = findProductInCart(listaProductos[idProduct - 1].descripcion);
        let newItem = document.createElement('li');
        newItem.textContent = `${item.nombre}
            $ ${item.precioTotal}`;
        cartItems.appendChild(newItem);

        let sidebar = document.getElementById('sidebar');
        sidebar.classList.add('open');

        setTimeout(function() {
            sidebar.classList.remove('open');
        }, 3000);

        totalPedido = totalPedido + item.precioUnitario;
        let totalPrice = document.getElementById("total-price");
        totalPrice.textContent = `Total:    $${totalPedido}`;
    });
});



