
//variables
const carrito = document.getElementById('carrito'); //por que asi se llama el id del carrito
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//listeners

cargarEventListeners();

function cargarEventListeners(){
	//dispara cuando se presiona agregar carrito
	cursos.addEventListener('click', comprarCurso);

	//cuando se elimina un curso del carrito
	carrito.addEventListener('click',eliminarCurso);

	//al vaciar el carrito
	vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

	//al cargar el documento mostrar localstorage
	document.addEventListener('DOMContentLoaded',leerLocalStorage);
}



//funciones

//funcion que añade el curso carrito
function comprarCurso(e){
	e.preventDefault();
	//delegation para agregar-carrito
	//console.log(e.target.classList);
	if(e.target.classList.contains('agregar-carrito')){
		//console.log('si');
		const curso = e.target.parentElement.parentElement;
		//console.log(curso);
		//encviamos el curso seleccionado para tomar sus datos
		leerDatosCurso(curso);
	}
}

//lee los datos del curso
function leerDatosCurso(curso){
	//console.log(curso);
	const infoCurso ={
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		precio: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
	}
	insertarCarrito(infoCurso);
}

//muestra el curso seleccionado en el carrito
function insertarCarrito(infoCurso){
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>
			<img src="${infoCurso.imagen}" width=100>
		</td>
		<td>${infoCurso.titulo}</td>
		<td>${infoCurso.presio}</td>
		<td>
			<a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
		</td>
	`;
	listaCursos.appendChild(row);
	guardarCursoLocalStorage(infoCurso);
}

//elimina el curso del carrito en el DOM
function eliminarCurso(e){
	e.preventDefault();
	//console.log('Eliminado');
	let curso,cursoId;

	if(e.target.classList.contains('borrar-curso')){
		//console.log(e.target.parentElement.parentElement.remove());
		e.target.parentElement.parentElement.remove();
		curso = e.target.parentElement.parentElement;
		cursoId = curso.querySelector('a').getAttribute('data-id');

		//console.log(cursoId);
	}
	eliminarCursoLocalStorage(cursoId);

}

function vaciarCarrito(){
	//forma lenta
	//listaCursos.innerHTML = '';


	//forma rapida (recomendada)
	while(listaCursos.firstChild){
		listaCursos.removeChild(listaCursos.firstChild);
	}

	//vaciar local storage
	vaciarLocalStorage();

	return false;
}

//almacena cursos en el carrito local storage
function guardarCursoLocalStorage(infoCurso){
	let cursos;

	cursos = obtenerCursoLocalStorage();

	cursos.push(infoCurso);

	localStorage.setItem('cursos', JSON.stringify(cursos));
}

//comprueba que haya algo en el local storage
function obtenerCursoLocalStorage(){
	let cursosLS;

	//comprobamos si hay algo en localStroage
	if(localStorage.getItem('cursos') === null){
		cursosLS = [];
	}else{
		cursosLS = JSON.parse(localStorage.getItem('cursos'));
	}
	return cursosLS;
}

function leerLocalStorage(){
	let cursosLS;

	cursosLS = obtenerCursoLocalStorage();
	//console.log(cursosLS);

	cursosLS.forEach(function(i){
		//construir el template
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${i.imagen}" width=100>
			</td>
			<td>${i.titulo}</td>
			<td>${i.presio}</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${i.id}">X</a>
			</td>
		`;
		listaCursos.appendChild(row);
	})
	
}

function eliminarCursoLocalStorage(curso){
	let cursosLS;

	//obtenemos el arreglo del curso
	cursosLS = obtenerCursoLocalStorage();

	//iteramos comparando el ID del curso don los i
	cursosLS.forEach(function(i,index){
		if(i.id === curso){
			cursosLS.splice(index,1);
		}
	});

	//añadimos el arreglo actual a storage
	localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//elimina todos los cursos de local storage
function vaciarLocalStorage(){
	localStorage.clear();
}



