var progress1 = document.querySelector(".progress1");
var countp1 = 0;
var progressWrapper1 = document.querySelector(".progressWrapper1");
var countpw1 = 0;

var progress2 = document.querySelector(".progress2");
var countp2 = 0;
var progressWrapper2 = document.querySelector(".progressWrapper2");
var countpw2 = 0;

var progress3 = document.querySelector(".progress3");
var countp3 = 0;
var progressWrapper3 = document.querySelector(".progressWrapper3");
var countpw3 = 0;


window.onload = function () {
    let countCheck = setInterval(() => {
      countp1 += 1;
      if (countp1 >= 340) {
        countp1 = 340;
        clearInterval(countCheck);
      }
      progress1.innerHTML = countp1 + "KM/H";
    },10)//km/h
    let countCheck2 = setInterval(() => {
        countpw1 += 1;
        if (countpw1 >= 90) {
          countpw1 = 90;
          clearInterval(countCheck2);
        }
      progressWrapper1.style.background = `conic-gradient(#0026ff ${countpw1}%, #2c3137 ${countpw1}%)`;
      },39);
      let countCheck3 = setInterval(() => {
        countp2 += 0.5;
        if (countp2 >= 4) {
          countp2 = 4;
          clearInterval(countCheck3);
        }
        progress2.innerHTML = countp2 + "s";
      },150)//secondes
      let countCheck4 = setInterval(() => {
          countpw2 += 1;
          if (countpw2 >= 10) {
            countpw2 = 10;
            clearInterval(countCheck4);
          }
        progressWrapper2.style.background = `conic-gradient(#0026ff ${countpw2}%, #2c3137 ${countpw2}%)`;
        },115);
        let countCheck5 = setInterval(() => {
            countp3 += 2;
            if (countp3 >= 510) {
              countp3 = 510;
              clearInterval(countCheck5);
            }
            progress3.innerHTML = countp3 + "CH";
          },5)//ch
          let countCheck6 = setInterval(() => {
              countpw3 += 1;
              if (countpw3 >= 97) {
                countpw3 = 97;
                clearInterval(countCheck6);
              }
            progressWrapper3.style.background = `conic-gradient(#0026ff ${countpw3}%, #2c3137 ${countpw3}%)`;
            },15)};