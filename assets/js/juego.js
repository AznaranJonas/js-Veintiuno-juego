// Juego Blackjack MUY COMENTADO y con nombres simples
// Objetivo: que cualquiera lo pueda leer como si recién empezara a programar

(function () {
  'use strict';

  // 1) Variables del mazo y tipos de cartas
  var mazo = []; // aquí guardamos todas las cartas
  var tipos = ['C', 'D', 'H', 'S']; // C = tréboles, D = diamantes, H = corazones, S = espadas
  var especiales = ['A', 'J', 'Q', 'K']; // A = As, J = Jota, Q = Reina, K = Rey

  // 2) Variables de puntos y turnos
  var puntos = [0, 0]; // puntos[0] = jugador 1, puntos[1] = jugador 2
  var nombres = ['Jugador 1', 'Jugador 2']; // nombres de los jugadores
  var turno = 0; // 0 significa que juega el jugador 1, 1 significa jugador 2
  var seDetuvo = [false, false]; // si un jugador presiona detener, aquí queda en true

  // 3) Referencias a elementos HTML (botones y lugares donde se ponen cartas y puntos)
  var btnNuevo = document.getElementById('btnNuevo');
  var btnPedir1 = document.getElementById('btnPedir1');
  var btnDetener1 = document.getElementById('btnDetener1');
  var btnPedir2 = document.getElementById('btnPedir2');
  var btnDetener2 = document.getElementById('btnDetener2');

  // .divCartas son los contenedores de cartas (jugador 1 y jugador 2)
  var contenedoresCartas = document.querySelectorAll('.divCartas');
  // Los small muestran los puntos (el primero es J1, el segundo J2)
  var puntosHTML = document.querySelectorAll('small');

  // 4) Función para pedir/definir un nombre de jugador de forma simple
  function pedirNombre(placeholder) {
    var entrada = prompt('Ingrese nombre de ' + placeholder + ':', placeholder);
    if (entrada === null) {
      return placeholder; // si canceló, usamos el placeholder
    }
    entrada = entrada.trim();
    if (entrada === '') {
      return placeholder; // si no escribió nada, usamos el placeholder
    }
    return entrada; // si escribió algo, usamos eso
  }

  // 5) Función que prepara el juego desde cero
  function iniciarJuego() {
    // Reiniciamos puntos, turnos y estados
    puntos[0] = 0;
    puntos[1] = 0;
    turno = 0; // empieza el jugador 1
    seDetuvo[0] = false;
    seDetuvo[1] = false;

    // Limpiamos los contenedores de cartas
    contenedoresCartas[0].innerHTML = '';
    contenedoresCartas[1].innerHTML = '';

    // Ponemos los puntos en 0 en pantalla
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    // Creamos y mezclamos el mazo
    mazo = crearMazo();

    // Habilitamos los botones del jugador que empieza
    actualizarBotones();

    // Actualizamos los títulos con los nombres
    actualizarTitulos();
  }

  // 6) Función para crear y mezclar el mazo
  function crearMazo() {
    var nuevoMazo = [];

    // Primero las cartas del 2 al 10
    for (var i = 2; i <= 10; i++) {
      for (var t = 0; t < tipos.length; t++) {
        var carta = i + tipos[t];
        nuevoMazo.push(carta);
      }
    }

    // Luego las cartas especiales A, J, Q, K
    for (var e = 0; e < especiales.length; e++) {
      for (var t2 = 0; t2 < tipos.length; t2++) {
        var cartaEsp = especiales[e] + tipos[t2];
        nuevoMazo.push(cartaEsp);
      }
    }

    // Mezclamos el mazo con underscore.js (ya está importado en index.html)
    nuevoMazo = _.shuffle(nuevoMazo);

    return nuevoMazo; // devolvemos el mazo ya mezclado
  }

  // 7) Función para sacar una carta del mazo
  function sacarCarta() {
    if (mazo.length === 0) {
      alert('No hay más cartas en el mazo');
      throw 'No hay cartas en el mazo';
    }
    var carta = mazo.pop(); // sacamos la última carta
    return carta;
  }

  // 8) Función para saber el valor de una carta
  function valorDeCarta(carta) {
    // La carta viene como texto, por ejemplo: "3H" o "QS" o "AD"
    var valor = carta.substring(0, carta.length - 1); // tomamos todo menos el último caracter (el tipo)

    // Si NO es un número, entonces es A, J, Q o K
    if (isNaN(valor)) {
      if (valor === 'A') {
        return 11; // As vale 11 (simplificado)
      } else {
        return 10; // J, Q, K valen 10
      }
    }

    // Si sí es un número, lo convertimos y devolvemos
    return Number(valor);
  }

  // 9) Función para sumar puntos y mostrarlos
  function sumarPuntos(turnoJugador, carta) {
    var puntosCarta = valorDeCarta(carta);
    puntos[turnoJugador] = puntos[turnoJugador] + puntosCarta;
    puntosHTML[turnoJugador].innerText = puntos[turnoJugador];
  }

  // 10) Función para agregar la imagen de la carta en el HTML
  function mostrarCarta(turnoJugador, carta) {
    var img = document.createElement('img');
    img.src = 'assets/cartas/' + carta + '.png';
    img.classList.add('carta');
    contenedoresCartas[turnoJugador].appendChild(img);
  }

  // 11) Función para decidir si ya terminó el juego
  function revisarSiTermino() {
    var j1Listo = seDetuvo[0] || puntos[0] >= 21;
    var j2Listo = seDetuvo[1] || puntos[1] >= 21;

    if (j1Listo && j2Listo) {
      // si los dos ya se detuvieron o están en 21 o más, terminamos
      deshabilitarTodosLosBotones();
      mostrarGanador();
    }
  }

  // 12) Función para mostrar quién ganó
  function mostrarGanador() {
    var p1 = puntos[0];
    var p2 = puntos[1];

    // Si alguien pasa de 21, lo contamos como -1 para que siempre pierda
    var s1 = p1 > 21 ? -1 : p1;
    var s2 = p2 > 21 ? -1 : p2;

    var mensaje = '';
    if (s1 === s2) {
      mensaje = 'Empate';
    } else if (s1 > s2) {
      mensaje = nombres[0] + ' gana';
    } else {
      mensaje = nombres[1] + ' gana';
    }

    alert(nombres[0] + ': ' + p1 + ' vs ' + nombres[1] + ': ' + p2 + '\n' + mensaje);
  }

  // 13) Funciones para habilitar y deshabilitar botones
  function deshabilitarTodosLosBotones() {
    btnPedir1.disabled = true;
    btnDetener1.disabled = true;
    btnPedir2.disabled = true;
    btnDetener2.disabled = true;
  }

  function actualizarBotones() {
    // Primero deshabilitamos todos
    deshabilitarTodosLosBotones();

    // Luego habilitamos solo los del jugador que le toca
    if (turno === 0 && !seDetuvo[0]) {
      btnPedir1.disabled = false;
      btnDetener1.disabled = false;
    }
    if (turno === 1 && !seDetuvo[1]) {
      btnPedir2.disabled = false;
      btnDetener2.disabled = false;
    }
  }

  // 14) Función para actualizar los títulos con los nombres
  function actualizarTitulos() {
    var tit1 = document.querySelector('#panel-jugador1 .panel-titulo');
    var tit2 = document.querySelector('#panel-jugador2 .panel-titulo');

    // Cada título tiene dentro un <small> con los puntos. No lo tocamos.
    // Solo cambiamos el texto antes del " - "
    if (tit1) {
      var small1 = tit1.querySelector('small');
      tit1.innerHTML = nombres[0] + ' - ' + (small1 ? '<small>' + puntos[0] + '</small>' : '');
    }
    if (tit2) {
      var small2 = tit2.querySelector('small');
      tit2.innerHTML = nombres[1] + ' - ' + (small2 ? '<small>' + puntos[1] + '</small>' : '');
    }
  }

  // 15) Eventos de los botones
  btnNuevo.addEventListener('click', function () {
    // Pedimos los nombres al comenzar
    nombres[0] = pedirNombre('Jugador 1');
    nombres[1] = pedirNombre('Jugador 2');

    iniciarJuego();
  });

  btnPedir1.addEventListener('click', function () {
    if (turno !== 0 || seDetuvo[0]) return; // si no es el turno del jugador 1, no hace nada

    var carta = sacarCarta();
    sumarPuntos(0, carta);
    mostrarCarta(0, carta);

    if (puntos[0] >= 21) {
      seDetuvo[0] = true; // si llegó a 21 o se pasó, ya no puede pedir
      turno = 1; // ahora le toca al jugador 2
      actualizarBotones();
      revisarSiTermino();
      actualizarTitulos();
    } else {
      // si no llegó a 21, puede seguir o pasar el turno presionando detener
      actualizarTitulos();
    }
  });

  btnDetener1.addEventListener('click', function () {
    seDetuvo[0] = true; // el jugador 1 ya no seguirá
    turno = 1; // ahora juega el jugador 2
    actualizarBotones();
    revisarSiTermino();
  });

  btnPedir2.addEventListener('click', function () {
    if (turno !== 1 || seDetuvo[1]) return; // si no es el turno del jugador 2, no hace nada

    var carta = sacarCarta();
    sumarPuntos(1, carta);
    mostrarCarta(1, carta);

    if (puntos[1] >= 21) {
      seDetuvo[1] = true; // si llegó a 21 o se pasó, ya no puede pedir
      turno = 0; // ahora puede volver el jugador 1 (si no está detenido)
      actualizarBotones();
      revisarSiTermino();
      actualizarTitulos();
    } else {
      // si no llegó a 21, puede seguir o pasar el turno presionando detener
      actualizarTitulos();
    }
  });

  btnDetener2.addEventListener('click', function () {
    seDetuvo[1] = true; // el jugador 2 ya no seguirá
    turno = 0; // vuelve el turno al jugador 1 si puede
    actualizarBotones();
    revisarSiTermino();
  });

  // 16) Estado inicial: al abrir la página no hay juego hasta que se presione "Nuevo Juego"
  deshabilitarTodosLosBotones();
  actualizarTitulos();
})();
