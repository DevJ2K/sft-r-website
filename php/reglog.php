<?php
    //DEMARRER LA SESSION
    session_start();

    // setcookie("pseudo", $pseudo)
    //REGISTER
    
    include 'database.php';
    global $db;


    if (isset($_POST['register'])) {
      
      // Récupère toutes les variables $_POST pour éviter d'écrire tout le temps '$_POST["..."]'
      extract($_POST);
      
      // Vérifie que le formulaire n'est pas vide.
      if (!empty($pseudo) && !empty($mdp) && !empty($mdpConfirm)) {

        // Vérifie que les mots de passe sont identiques.
        if ($mdp == $mdpConfirm) {
          
          $requeteVerif = $db->prepare('SELECT pseudo FROM utilisateur WHERE pseudo = :pseudo');
          $requeteVerif->execute([
            "pseudo" => $pseudo
          ]);

          $resultat = $requeteVerif->rowCount();
          $avatar = $color;
          $code = "0_0_0_0_0";
          if ($resultat == 0){
            $requeteEnvoi = $db->prepare('INSERT INTO utilisateur VALUES (:pseudo, :mdp, :avatar, :code)');
            $requeteEnvoi->execute([
              "pseudo" => $pseudo,
              "mdp" => $mdp,
              "avatar" => $avatar,
              "code" => $code
            ]);
            echo "<p class='valid'>Le compte a été crée</p>";
            $_SESSION['pseudo'] = $pseudo;
            $_SESSION['mdp'] = $mdp;
            $_SESSION['avatar'] = $avatar;
            $_SESSION['code'] = $code;

            header("Location: ./accueil.php");

          } else {
            echo "<p class='error'>Ce pseudo est déjà utilisé</p>";
          }

        } else {
          echo "<p class='error'>Les mots de passe ne sont pas identiques !</p>";
        };
        };

      }
    
      //LOGIN
    if (isset($_POST['login'])) {

      extract($_POST);
      
      if (!empty($pseudo) && !empty($mdp)) {
        $requete = $db -> prepare("SELECT * FROM utilisateur WHERE pseudo = :pseudo");
        $requete -> execute([
          "pseudo" => $pseudo
        ]);
        $resultat = $requete->fetch();
        if ($resultat == true) {
          $db_password = $resultat['mdp'];
          if ($db_password == $mdp) {
            echo "<p class='valid'>Le mot de passe est correcte ! Connexion en cours...</p>";
            $_SESSION['pseudo'] = $pseudo;
            $_SESSION['mdp'] = $mdp;
            $_SESSION['avatar'] = $resultat['avatar'];
            $_SESSION['code'] = $resultat['code'];
            header("Location: ./accueil.php");

          } else {
            echo "<p class='error'>Le mot de passe est incorrect !</p>";
          }

        } else {
          echo '<p class="error">Ce compte n\'existe pas ! Vous pouvez vous créer un compte en cliquant <a href="register.php">ici</a></p>';
        }
      
      } else {
        echo "<p class='error'>Veuillez compléter toutes les informations.</p>";
      }

    } ;
    ?>