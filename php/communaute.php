<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/communaute.css" />
    <link rel="stylesheet" type="text/css" href="../css/avatar.css">	
    <link rel="icon" type="image/png" href="../images/logo.png" />
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
      <!-- Barre de recherche -->
      <div class="recherche">
        <input type="checkbox" id="check" />
        <div class="box2">
          <input id="searchInput" type="text" list="suggestions" placeholder="Entrez un nom d'utilisateur"/>
          <label for="check"><i class="fas fa-search"></i></label>
        </div>
      </div>

      <h1>Voitures des Développeurs</h1>

<!-- Les box de 2 véhicules -->
<div class="container">

  <!-- Utilisateur 1 -->
    <div class="box" onclick="document.location='./../viewsUserConfig/php/views.php?user=nathan_bo'">
      <div class="imgBx">
        <img src="../images/1erImage.png" alt="logo" />
      </div>
      <div class="content">
        <div class="title"><span>N</span>ATHAN</div>
      </div>
    </div>

  <!-- Utilisateur 2 -->
    <div class="box" onclick="document.location='./../viewsUserConfig/php/views.php?user=theo_ajn'">
      <div class="imgBx">
        <img src="../images/2eImage.png" alt="logo" />
      </div>
      <div class="content">
        <div class="title"><span>T</span>HEO</div>
      </div>
    </div>
</div>

    </main>
  </body>

  <!-- Les scripts -->
  <div id="cursor"></div>
  <script src="../javascript/cursor.js"></script>
  <script src="../javascript/all.min.js"></script>
  <script src="../javascript/search.js"></script>
</html>
