# Blackjack para Principiantes (Dos Jugadores)

Este es un juego de cartas tipo Blackjack hecho para practicar programación. Está escrito de forma muy sencilla y con muchos comentarios para que se entienda.

## ¿Qué hace este proyecto?
- Permite jugar Blackjack entre 2 personas en la misma computadora.
- Cada jugador tiene sus propios botones: Pedir carta y Detener.
- El juego muestra las cartas y los puntos de cada jugador.
- Cuando ambos terminan, aparece un mensaje diciendo quién ganó.

## Requisitos
- Solo necesitas un navegador (Chrome, Firefox, Edge, etc.).
- No hay que instalar nada raro.

## Cómo abrir el juego
1. Descarga o copia esta carpeta a tu computadora.
2. Abre el archivo `index.html` con doble clic (o clic derecho > Abrir con > tu navegador).
3. Listo.

## Cómo jugar (paso a paso)
1. Presiona el botón "Nuevo Juego".
2. Escribe el nombre del Jugador 1 y luego el nombre del Jugador 2.
3. Le toca primero al Jugador 1:
   - Presiona "Pedir carta J1" para sacar una carta.
   - Si ya no quieres seguir, presiona "Detener J1".
4. Luego le toca al Jugador 2 (lo mismo: pedir o detener).
5. El juego termina cuando los dos jugadores ya se detuvieron o cuando ambos ya tienen 21 o más.
6. Sale un mensaje con el resultado (quién ganó o si empataron).

## Reglas (simplificadas)
- Las cartas del 2 al 10 valen su número.
- J, Q y K valen 10.
- A (As) vale 11.
- Si pasas de 21, es como si tu puntaje fuera -1 (pierdes contra cualquiera que no se pase).

## Controles
- "Nuevo Juego": reinicia todo y pide los nombres.
- "Pedir carta J1/J2": saca una carta para ese jugador.
- "Detener J1/J2": ese jugador ya no saca más cartas.

## Estructura de archivos
- `index.html` → La página principal del juego.
- `assets/js/juego.js` → La lógica del juego (código super comentado y simple).
- `assets/js/underscore-min.js` → Librería para mezclar el mazo (shuffle).
- `assets/css/styles.css` → Los estilos (cómo se ve el juego).
- `assets/cartas/` → Las imágenes de las cartas.

## Cómo cambiar cosas (fácil)
- Cambiar nombres por defecto: En `juego.js`, busca el arreglo `nombres = ['Jugador 1', 'Jugador 2']` y cámbialos.
- Cambiar reglas (por ejemplo el valor del As): En `valorDeCarta(carta)` modifica el `return 11` del As por otro valor (si quieres experimentar).
- Cambiar estilos: Abre `assets/css/styles.css` y juega con colores o tamaños.

## Problemas comunes
- No veo las cartas: Asegúrate de no mover la carpeta `assets/cartas/` ni renombrar imágenes.
- No pasa nada al hacer clic: Abre el archivo `index.html` en un navegador moderno. Si lo abriste, recarga la página (Ctrl + R).
- Los nombres no cambian: Recuerda que se piden solo al presionar "Nuevo Juego".

## Ideas para mejorar (si quieres practicar)
- Hacer que el As valga 1 u 11 según convenga.
- Agregar apuestas (dinero ficticio) y varias rondas.
- Mostrar quién está en turno con un color destacado.
- Agregar sonidos al pedir carta o al terminar el juego.

## Autor y créditos
- Código simplificado y comentarios pensados para principiantes.
- Imágenes de cartas incluidas en `assets/cartas/`.
- Se usa la librería `underscore.js` para mezclar el mazo.

¡Diviértete aprendiendo y mejorando el juego! 🎮🃏
