// Curseur personnalisé
const cursor = document.querySelector("#cursor");
      const cursorListener = (event) => {
        cursor.style.top = event.y + "px";
        cursor.style.left = event.x + "px";
      }
window.addEventListener("mousemove", cursorListener);