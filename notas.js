const lista = document.getElementById('lista');

function agregarItem() {
  const item = document.getElementById('item').value;
  const fecha = document.getElementById('fecha').value;

  const li = document.createElement('li');
  li.innerHTML = `<span>${item}</span> - <span>${fecha}</span>
                  <button type="button" onclick="marcarComoRealizado(event)">Hecho</button>
                
                  <button type="button"  onclick="borrarItem(event)">Borrar</button>`;
                
               
  lista.appendChild(li);

  const hoy = new Date();
  const fechaVencimiento = new Date(fecha);
  if (fechaVencimiento < hoy) {
    li.classList.add('expired');
  } else {
    const diasRestantes = Math.ceil((fechaVencimiento - hoy) / (1000 * 60 * 60 * 24));
    if (diasRestantes <= 3) {
      mostrarNotificacion(item, diasRestantes);
    }
  }

  document.getElementById('item').value = '';
  document.getElementById('fecha').value = '';
}

function marcarComoRealizado(event) {
  const li = event.target.parentNode;
  li.classList.toggle('completed');
}

/*function editarItem(event) {
  const li = event.target.parentNode;
  const span1 = li.querySelector('span:first-child');
  const span2 = li.querySelector('span:nth-child(2)');
  const btnHecho = li.querySelector('button:first-child');
  const btnEditar = li.querySelector('button:nth-child(2)');
  const btnBorrar = li.querySelector('button:nth-child(3)');

  span1.style.display = 'none';
  span2.style.display = 'none';
  btnHecho.style.display = 'none';
  btnEditar.style.display = 'none';
  btnBorrar.style.display = 'none';

  const input1 = document.createElement('input');
  input1.type = 'text';
  input1.value = span1.textContent;
  const input2 = document.createElement('input');
  input2.type = 'date';
  input2.value = span2.textContent;
  const btnGuardar = document.createElement('button');
  btnGuardar.textContent = 'Guardar';
  btnGuardar.addEventListener('click', function() {
    span1.textContent = input1.value;
    span2.textContent = input2.value;
    span1.style.display = 'inline-block';
    span2.style.display = 'inline-block';
    btnHecho.style.display = 'inline-block';
    btnEditar.style.display = 'inline-block';
    btnBorrar.style.display = 'inline-block';
    li.removeChild(input1);
    li.removeChild(input2);
    li.removeChild(btnGuardar);
  });

  li.appendChild(input1);
  li.appendChild(input2);
  li.appendChild(btnGuardar);
} */

function borrarItem(event) {
  const li = event.target.parentNode;
  lista.removeChild(li);
}

function mostrarNotificacion(item, diasRestantes) {
  const notificacion = new Notification(`Recuerde que ${item} vence en ${diasRestantes} días.`, {
    body: `Quedan ${diasRestantes} días para el vencimiento ${item}.`
  });
  setTimeout(notificacion.close.bind(notificacion), 5000);
}

Notification.requestPermission();
