<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../css/accueil.css" />
    <link rel="stylesheet" type="text/css" href="../css/avatar.css">	

    <link rel="icon" type="image/png" href="../images/logo.png" />
    <title>Accueil_</title>
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


    <!-- La vidéo de fond -->
      <video id="background-video" autoplay loop muted>
        <source src="../video/porscheGT3cinematic.mp4" type="video/mp4" />
      </video>
      
    <!-- Tout le contenu -->
      <main>
        <!-- Les compteurs -->
        <section class="one">
          <div class="progressWrapper1">
            <div class="progress1"></div>
          </div>
          <div class="progressWrapper2">
            <div class="progress2"></div>
          </div>
          <div class="progressWrapper3">
            <div class="progress3"></div>
          </div>
        </section>

        <!-- La voiture qui tourne avec le curseur -->
        <div class="two">
          <h2>Visualisation 360°</h2>
          <div class="container">
            <!-- imageCircle1 = Voiture Grise // imageCircle2 = Voiture Bleue(0026ff) -->
            <img id="carImage" src="../images/imageCircle1/0000.jpg" alt="logo"/>
            <input type="range" id="slider" min="0" max="70" value="0" step="1" oninput="changerImage()">
          </div>
        </div>

      <div class="three">
        <div class="carousel">
          <div class="content">
              <div class="image"><span>Des performances testées sur banc.</span></div>
              <div class="image"><span>Des courbes designées par Ferdinand Alexander Porsche.</span></div>
              <div class="image"><span>Le mélange parfait entre confort et performances.</span></div>
              <div class="image"><span>Des sièges bacquets signés Techart.</span></div>
              <div class="image"><span>Une Supercar légère de 870kg.</span></div>
              <div class="image"><span>Un design simple et épuré.</span></div>
              <div class="image"><span>Testé sur le circuit du Nürburgring.</span></div>
              <div class="image"><span>Une adhérence exceptionnelle dans n'importe quelle circonstence.</span></div>
              <div class="image imgTournante"><span>SFT-R, l'innovation automobile.</span></div>
          </div>
        </div>
      </div>

      <div class="four">

      <div class="container">
        <!-- <video loop="infinite" src="../video/porscheGT3cinematic.mp4" class="video"></video> -->
        <img class="img" src="../images/customsftr.png" alt="logo"/>
        <div class="blur">
          <div class="load center" id="btn">
              <p id="msgBtn">Configurer votre SFT-R</p>
          </div>
        </div>
      </div>

      </div>

      </main>
      <footer class="footer">
        <h2>All Right Reserved By <span>@SFT-R</span></h2>
        <div class="discord">
          <h3>Contact us on <span>Discord</span> :</h3>
          <ul>
            <li>Noot#0466</li>
            <li>J2K#7074</li>
          </ul>
        </div>
		  </footer>

    <!-- Les scripts -->
    <div id="cursor"></div>
   <script src="../javascript/cursor.js"></script>
   <script src="../javascript/progressWrappers.js"></script>
   <script src="../javascript/img_bar.js"></script>
   <script src="../javascript/imageInCarousel.js"></script>
   <script src="../javascript/accueil.js"></script>
  </body>
</html>
