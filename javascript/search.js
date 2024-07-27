searchButton = document.getElementById("check");

// Fais la fonction si la loupe de recherche est cliqué et la condition si c'est validé + l'input n'est pas vide.
searchButton.onclick = function(){
    var valeur = document.getElementById("searchInput").value;
    if (!searchButton.checked &&valeur!=""){
        console.log("Cliqué !");
        window.location.replace("./recherche.php?search="+valeur);
    }
    
}

// Lance la fonction chaque fois qu'un touche est appuyé et la condition lorsque la touche est Enter + c'est validé + l'input n'est pas vide.
document.addEventListener('keydown', function (event) {
    var valeur = document.getElementById("searchInput").value;
    if (event.code == "Enter" && searchButton.checked &&valeur!="") {
        console.log("Validé");
        window.location.replace("./recherche.php?search="+valeur);
    }
});


function viewConfig(user) {
    console.log(user)
    window.location.replace("./../viewsUserConfig/php/views.php?user="+user)
    };