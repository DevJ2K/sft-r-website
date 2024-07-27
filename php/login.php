<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/reglog.css" />
    <link rel="icon" type="image/png" href="../images/logo.png" />
    <title>Se connecter_</title>
  </head>
  <body>
    <header>
      <img src="../images/logo.png" height="80px" alt="logo" />
    </header>
    <main>
      <form method="post" action="login.php" id="connexion">
        <h2>Connexion</h2>
        <?php include 'reglog.php';?>
        <div class="input">
          <div class="inputBox">
            Pseudo
            <input type="text" name="pseudo" placeholder="Exemple123" required/>
            <div class="inputBox">
              Mot de Passe <img src="../images/oeil_caché.png" alt="oeil_caché" id="eyeicon" height="30px" />
              <input id="password" type="password" name="mdp" required/>
              <div class="inputBox">
                <input type="submit" name="login" value="Se Connecter"/>
              </div>
              <button id="btnToInscription" onclick="document.location='register.php'">Page inscription</button>
            </div>
          </div>
        </div>
      </form>
     
    </main>
    <div id="cursor"></div>
    <script src="../javascript/reglog.js"></script>
    <script src="../javascript/cursor.js"></script>

 

  </body>
</html>
