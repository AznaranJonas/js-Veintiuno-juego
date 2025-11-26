(function () {
  'use strict';

  var mazo = [];
  var tipos = ['C', 'D', 'H', 'S'];
  var especiales = ['A', 'J', 'Q', 'K'];

  var puntos = [0, 0];
  var nombres = ['Jugador 1', 'Jugador 2'];
  var turno = 0;
  var seDetuvo = [false, false];

  var btnNuevo = document.getElementById('btnNuevo');
  var btnPedir1 = document.getElementById('btnPedir1');
  var btnDetener1 = document.getElementById('btnDetener1');
  var btnPedir2 = document.getElementById('btnPedir2');
  var btnDetener2 = document.getElementById('btnDetener2');

  var contenedoresCartas = document.querySelectorAll('.divCartas');
  var puntosHTML = document.querySelectorAll('small');

  function pedirNombre(placeholder) {
    var entrada = prompt('Ingrese nombre de ' + placeholder + ':', placeholder);
    if (entrada === null) {
      return placeholder;
    }
    entrada = entrada.trim();
    if (entrada === '') {
      return placeholder;
    }
    return entrada;
  }

  function iniciarJuego() {
    puntos[0] = 0;
    puntos[1] = 0;
    turno = 0;
    seDetuvo[0] = false;
    seDetuvo[1] = false;

    contenedoresCartas[0].innerHTML = '';
    contenedoresCartas[1].innerHTML = '';

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    mazo = crearMazo();

    actualizarBotones();

    actualizarTitulos();
  }

  function crearMazo() {
    var nuevoMazo = [];

    for (var i = 2; i <= 10; i++) {
      for (var t = 0; t < tipos.length; t++) {
        var carta = i + tipos[t];
        nuevoMazo.push(carta);
      }
    }

    for (var e = 0; e < especiales.length; e++) {
      for (var t2 = 0; t2 < tipos.length; t2++) {
        var cartaEsp = especiales[e] + tipos[t2];
        nuevoMazo.push(cartaEsp);
      }
    }

    nuevoMazo = _.shuffle(nuevoMazo);

    return nuevoMazo;
  }

  function sacarCarta() {
    if (mazo.length === 0) {
      alert('No hay más cartas en el mazo');
      throw 'No hay cartas en el mazo';
    }
    var carta = mazo.pop();
    return carta;
  }

  function valorDeCarta(carta) {
    var valor = carta.substring(0, carta.length - 1);

    if (isNaN(valor)) {
      if (valor === 'A') {
        return 11;
      } else {
        return 10;
      }
    }

    return Number(valor);
  }

  function sumarPuntos(turnoJugador, carta) {
    var puntosCarta = valorDeCarta(carta);
    puntos[turnoJugador] = puntos[turnoJugador] + puntosCarta;
    puntosHTML[turnoJugador].innerText = puntos[turnoJugador];
  }

  function mostrarCarta(turnoJugador, carta) {
    var img = document.createElement('img');
    img.src = 'assets/cartas/' + carta + '.png';
    img.classList.add('carta');
    contenedoresCartas[turnoJugador].appendChild(img);
  }

  function revisarSiTermino() {
    var j1Listo = seDetuvo[0] || puntos[0] >= 21;
    var j2Listo = seDetuvo[1] || puntos[1] >= 21;

    if (j1Listo && j2Listo) {
      deshabilitarTodosLosBotones();
      mostrarGanador();
    }
  }

  function mostrarGanador() {
    var p1 = puntos[0];
    var p2 = puntos[1];

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

  function deshabilitarTodosLosBotones() {
    btnPedir1.disabled = true;
    btnDetener1.disabled = true;
    btnPedir2.disabled = true;
    btnDetener2.disabled = true;
  }

  function actualizarBotones() {
    deshabilitarTodosLosBotones();

    if (turno === 0 && !seDetuvo[0]) {
      btnPedir1.disabled = false;
      btnDetener1.disabled = false;
    }
    if (turno === 1 && !seDetuvo[1]) {
      btnPedir2.disabled = false;
      btnDetener2.disabled = false;
    }
  }

  function actualizarTitulos() {
    var tit1 = document.querySelector('#panel-jugador1 .panel-titulo');
    var tit2 = document.querySelector('#panel-jugador2 .panel-titulo');

    if (tit1) {
      var small1 = tit1.querySelector('small');
      tit1.innerHTML = nombres[0] + ' - ' + (small1 ? '<small>' + puntos[0] + '</small>' : '');
    }
    if (tit2) {
      var small2 = tit2.querySelector('small');
      tit2.innerHTML = nombres[1] + ' - ' + (small2 ? '<small>' + puntos[1] + '</small>' : '');
    }
  }

  btnNuevo.addEventListener('click', function () {
    nombres[0] = pedirNombre('Jugador 1');
    nombres[1] = pedirNombre('Jugador 2');

    iniciarJuego();
  });

  btnPedir1.addEventListener('click', function () {
    if (turno !== 0 || seDetuvo[0]) return;

    var carta = sacarCarta();
    sumarPuntos(0, carta);
    mostrarCarta(0, carta);

    if (puntos[0] >= 21) {
      seDetuvo[0] = true;
      turno = 1;
      actualizarBotones();
      revisarSiTermino();
      actualizarTitulos();
    } else {
      actualizarTitulos();
    }
  });

  btnDetener1.addEventListener('click', function () {
    seDetuvo[0] = true;
    turno = 1;
    actualizarBotones();
    revisarSiTermino();
  });

  btnPedir2.addEventListener('click', function () {
    if (turno !== 1 || seDetuvo[1]) return;

    var carta = sacarCarta();
    sumarPuntos(1, carta);
    mostrarCarta(1, carta);

    if (puntos[1] >= 21) {
      seDetuvo[1] = true;
      turno = 0;
      actualizarBotones();
      revisarSiTermino();
      actualizarTitulos();
    } else {
      actualizarTitulos();
    }
  });

  btnDetener2.addEventListener('click', function () {
    seDetuvo[1] = true;
    turno = 0;
    actualizarBotones();
    revisarSiTermino();
  });

  deshabilitarTodosLosBotones();
  actualizarTitulos();
})();
