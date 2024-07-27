<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/recherche.css" />
    <link rel="stylesheet" type="text/css" href="../css/avatar.css">	
    <link rel="icon" type="image/png" href="../images/logo.png" />
    <?php include 'searchResult.php';?>
    <title>SFT-R</title>
  </head>

  <body>
    <header>
    <div class="user"><?php session_start(); echo $_SESSION["pseudo"].'<div class="avatar '.$_SESSION["avatar"].'"></div>' ?></div>
      <nav>
        <div class="multi-button">
          <button onclick="document.location='accueil.php'">Accueil_</button>
          <button onclick="document.location='custom_car.php'">Personnalisation_</button>
          <button onclick="document.location='communaute.php'">Communauté_</button>
        </div>
      </nav>
    </header>
    <main>
      <div class="recherche">
        <input type="checkbox" id="check" checked="checked"/>
        <div class="box2">
          <input id="searchInput" type="text" list="suggestions" placeholder="Entrez un nom d'utilisateur" value=<?php echo $_GET["search"]?>>
          <label for="check"><i class="fas fa-search"></i></label>
        </div>
      </div>

      <!-- Message résultat en PHP -->
      <h1>
        <?php 
          if ($requete->rowCount() == 0){
            echo 'Aucun résultat pour "'.$_GET['search'].'"';
          } else if ($requete->rowCount() == 1){
            echo $requete->rowCount().' résultat pour "'.$_GET['search'].'"';
          } else if ($requete->rowCount() > 1){
            echo $requete->rowCount().' résultats pour "'.$_GET['search'].'"';
          } else {
            echo 'Une erreur est survenue pendant la recherche.';
          }
        ?>
      </h1>
      <!-- Carte créé avec les pseudos trouvés -->
      <div class="container">
        <?php
        if ($requete->rowCount() > 0){
          while($user = $requete->fetch()){
            echo '<div onclick=viewConfig("'.$user["pseudo"].'") class="card" id="viewConfig">
                <h2>'.$user['pseudo'].'</h2>
                <p>'.$user['code'].'</p>
                <div class="avatar '.$user['avatar'].'"></div>
                </div>';
          }};?>
      </div>
    </main>
    
  </body>

  <!-- Les scripts -->
  <div id="cursor"></div>
  <script src="../javascript/cursor.js"></script>
  <script src="../javascript/all.min.js"></script>
  <script src="../javascript/search.js"></script>

</html>
