// Montrer/Cacher le mot de passe
let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");

// Lorsqu'on clique sur l'oeil
eyeicon.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
    cpassword.type = "text";
    eyeicon.src = "../images/oeil.png";
  } else {
    password.type = "password";
    cpassword.type = "password";
    eyeicon.src = "../images/oeil_caché.png";
  }
};