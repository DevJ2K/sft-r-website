var carImage = document.getElementById('carImage');
var sliderBar = document.getElementById('slider');
var linkImg = carImage.src

// La fonction est lancée lorsque l'on clique sur l'input 'range'
function changerImage() {
    
    var numeroImg = String(linkImg).substring(linkImg.length-8, linkImg.length-4)
    numeroImg = parseInt(sliderBar.value)

    if (numeroImg <= 9) {
        numeroImg = "000"+String(numeroImg)
    } else {
        numeroImg = "00"+String(numeroImg)
    }
    // Modifie l'image en fonction du range.
    newImg = String(linkImg).substring(0, linkImg.length-8) + numeroImg + ".jpg"

    carImage.setAttribute('src', newImg)
}