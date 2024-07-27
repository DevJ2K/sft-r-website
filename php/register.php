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
      <form method="post" id="inscription">
        <h2>Inscription</h2>
        <?php include 'reglog.php';?>


        <h1>Choisis un avatar</h1>

        <div class="custom-radios">
          <div>
            <input type="radio" id="color-1" name="color" value="avtr1" checked>
            <label for="color-1">
              <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
              </span>
            </label>
          </div>
          
          <div>
            <input type="radio" id="color-2" name="color" value="avtr2">
            <label for="color-2">
              <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
              </span>
            </label>
          </div>
          
          <div>
            <input type="radio" id="color-3" name="color" value="avtr3">
            <label for="color-3">
              <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
              </span>
            </label>
          </div>

          <div>
            <input type="radio" id="color-4" name="color" value="avtr4">
            <label for="color-4">
              <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
              </span>
            </label>
          </div>

          <div>
            <input type="radio" id="color-5" name="color" value="avtr5">
            <label for="color-5">
              <span>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg" alt="Checked Icon" />
              </span>
            </label>
          </div>
        </div>


        <div class="input">
          <div class="inputBox">
            Pseudo
            <input type="text" name="pseudo" placeholder="Exemple123" required minlength="2" maxlength="18"/>
            <div class="inputBox">
              Mot de Passe <img src="../images/oeil_caché.png" alt="oeil_caché" id="eyeicon" height="30px" />
              <input id="password" type="password" name="mdp" placeholder="..." required minlength="1" maxlength="20"/>
              Confirmer Votre Mot de Passe
              <input id="cpassword" type="password" name="mdpConfirm" placeholder="..." required/>
              <div class="inputBox">
                <input type="submit" name="register" value="S'inscrire"/>
                <button id="btnToConnexion" onclick="document.location='login.php'">Page connexion</button>
              </div>
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
