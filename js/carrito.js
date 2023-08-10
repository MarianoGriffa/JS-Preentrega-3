//Obtenemos ->  productosEnCarrito = [];
let productosEnCarrito = localStorage.getItem('producto-en-carrito');
//lo transforma a un JSON  
productosEnCarrito = JSON.parse(productosEnCarrito); 
console.log(productosEnCarrito);       
  
const containerCarritoProductos = document.querySelector('#carrito-productos');
const containerCarritoAcciones = document.querySelector('#carrito-acciones');
const containerCarritoComprado = document.querySelector('#carrito-comprado'); 
const containerCarritoVacio = document.querySelector('#carrito-vacio');
let botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');
let botonVaciar = document.querySelector('#carrito-acciones-vaciar');
let botonComprar = document.querySelector('#carrito-acciones-comprar');
const total = document.querySelector('#total'); 
const tituloCompra = document.querySelector('#titulo-compra');    
              
   //Pintamos los productos cargados al carrito
   //Preguntamos si existe o no en el localstorage 
   function cargarProductosCarrito() { 
     if(productosEnCarrito && productosEnCarrito.length > 0) {  
          
   
    containerCarritoVacio.classList.add('disabled');
    containerCarritoProductos.classList.remove('disabled');
    containerCarritoAcciones.classList.remove('disabled');
    containerCarritoComprado.classList.add('disabled');  
  
    containerCarritoProductos.innerHTML = '';   
    
    productosEnCarrito.forEach( producto => { 
      const elDiv = document.createElement('div');  
      elDiv.classList.add('carrito-producto');
           
      elDiv.innerHTML = `
      <img  class="carrito-producto-imagen" src="${producto.img}" alt="${producto.titulo}" />
      <div class="carrito-producto-titulo" >    
        <small>Nombre</small>  
        <h5>${producto.titulo}</h5>  
      </div>   
      <div class="carrito-producto-cantidad">
        <small>Cantidad</small>
        <p>${producto.cantidad}</p>  
      </div>    
      <div class="carrito-producto-precio">
        <small>Precio</small>
        <p>${producto.precio}</p>
      </div>
      <div class="carrito-producto-subtotal">
        <small>Subtotal</small> 
        <p>${producto.precio * producto.cantidad}</p>
      </div>  
      <button class="carrito-producto-eliminar" id="${producto.id}">  
      <i class="bi bi-trash-fill"></i>    
      </button>    
      `;  
  
      containerCarritoProductos.append(elDiv);
    });  
   
  
  }else { 
    containerCarritoVacio.classList.remove('disabled');
    containerCarritoProductos.classList.add('disabled');
    containerCarritoAcciones.classList.add('disabled');
    containerCarritoComprado.classList.add('disabled'); 
  }    
 
  actualizarBotonesEliminar();
  actualizarTotalApagar();     

}

cargarProductosCarrito(); 
 
//Llamada al botonEliminar
//Actualizamos los productos del carrito 
function actualizarBotonesEliminar() { 
  botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');  
   
  
  botonesEliminar.forEach( btn => {
    btn.addEventListener('click', eliminarDelCarrito );
  })    
}   

//Eliminar un producto del carrito
function eliminarDelCarrito(e) { 
   const idBoton = e.currentTarget.id; 
   const index = productosEnCarrito.findIndex( producto => producto.id === idBoton);

   productosEnCarrito.splice(index, 1);   
   cargarProductosCarrito();  
      

   localStorage.setItem('producto-en-carrito',JSON.stringify(productosEnCarrito));
}      

 //Llamada al botonVaciar
  botonVaciar.addEventListener('click', vaciarCarrito);
  
  //Funcion para vaciar por completo el carrito 
  function vaciarCarrito() {  
      productosEnCarrito.length = 0;
       localStorage.setItem('producto-en-carrito', JSON.stringify(productosEnCarrito));

       cargarProductosCarrito();    
  } 
   
 
  //Devuelve la cantidad del total a pagar$$ 
  function actualizarTotalApagar() {
    let numeroTotal = productosEnCarrito.reduce((acc, producto) => acc + ( producto.precio * producto.cantidad ), 0);             
    total.innerText = `$${numeroTotal}`;                
             
   }    
 
   //Llamamos al botonComprar para poder despues realizar el pago
   botonComprar.addEventListener('click', comprarCarrito);
 
   //Funcion que nos lleva a realizar el pago, aunque falta terminar
   function comprarCarrito() {   
      tituloCompra.innerText = 'Finaliza tu compra';   
  
    productosEnCarrito.length = 0;
    localStorage.setItem('producto-en-carrito', JSON.stringify(productosEnCarrito));
 
    containerCarritoVacio.classList.add('disabled'); 
    containerCarritoProductos.classList.add('disabled'); 
    containerCarritoAcciones.classList.add('disabled'); 
    containerCarritoComprado.classList.remove('disabled');  
   
   }  
      
  