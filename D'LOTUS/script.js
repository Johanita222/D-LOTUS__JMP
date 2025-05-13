let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('carrito-modal');
  const btnVerCarrito = document.getElementById('ver-carrito');
  const btnCerrarCarrito = document.getElementById('cerrar-carrito');
  const modalContent = document.getElementById('modal-content');

  document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', agregarProducto);
  });

  btnVerCarrito.addEventListener('click', () => {
    mostrarCarrito();
    modal.classList.add('activo');
  });

  btnCerrarCarrito.addEventListener('click', () => {
    modal.classList.remove('activo');
  });

  modal.addEventListener('click', (e) => {
    if (!modalContent.contains(e.target)) {
      modal.classList.remove('activo');
    }
  });
});

function agregarProducto(e) {
  const producto = e.target.closest('.producto');
  const id = producto.dataset.id;
  const nombre = producto.dataset.nombre;
  const precio = parseFloat(producto.dataset.precio);

  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  actualizarCantidad();
}

function actualizarCantidad() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  document.getElementById('cantidad-carrito').textContent = total;
}

function mostrarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalTexto = document.getElementById('total-carrito');
  lista.innerHTML = '';
  let total = 0;

  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.addEventListener('click', () => {
      eliminarProducto(producto.id);
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
    total += producto.precio * producto.cantidad;
  });

  totalTexto.textContent = `Total: $${total.toFixed(2)}`;
}

function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  actualizarCantidad();
  mostrarCarrito();
}
