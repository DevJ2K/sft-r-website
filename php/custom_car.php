<!DOCTYPE html>
<html>
<head>
	<!-- The app title -->
	<title>Personnalisation SFT-R</title>
	<!-- Load the core stylesheet here -->
	<link rel="stylesheet" type="text/css" href="../css/personnalisation_car_only.css">	
	<link rel="stylesheet" type="text/css" href="../css/avatar.css">	
</head>

<body>
	<header>

		<?php
		session_start();

		include 'database.php';
   		global $db;

		if (isset($_GET['codeSaves'])) {
			$codeSaves = $_GET['codeSaves'];
			if (substr_count($codeSaves,"_") == 4){
				$requeteVerif = $db->prepare('UPDATE utilisateur SET code = :code WHERE pseudo = :pseudo');
				$requeteVerif->execute([
					"pseudo" => $_SESSION["pseudo"],
					"code" => $codeSaves
          	]);
			
			$_SESSION['code'] = $codeSaves;
			}
		};

		?>

		<div class="user"><?php echo $_SESSION["pseudo"].'<div class="avatar '.$_SESSION["avatar"].'"></div>' ?></div>
		<nav>
			<div class="multi-button">
			<button onclick="savesConfiguration();">Sauvegarder_</button>
			<button onclick="document.location='accueil.php'">Accueil_</button>
			<button onclick="document.location='custom_car.php'">Personnalisation_</button>
			<button onclick="document.location='communaute.php'">Communauté_</button>
			</div>
		</nav>
	</header>
	

	<div class="welcome-screen overlay">
		<div class="ws-wrapper">
			<h1 class="noselect">Bienvenue <?php echo $_SESSION["pseudo"] ?></h1>		
			<h3 class="noselect">Personnaliser votre SFT-R</h3>			
			<button onclick="SkipIntro();">Passer la présentation</button>
		</div>
	</div>

	<div class="preloader overlay">
		<div class="wrapper">
			<div class="icon"></div>
			<p class="title">Chargement</p>
			<p class="desc"></p>
		</div>	
	</div>

	<div class="screen-fader overlay"></div>	
	<div id="cursor"></div>
	<div id="utilisateur_select" style="display: none;"><?php echo $_SESSION["pseudo"] ?></div>
	<div id="code_user" style="display: none;"><?php echo $_SESSION["code"] ?></div>

</body>

<!-- Load required JS file here -->


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="../javascript/three.min.js"></script>
<script type="text/javascript" src="../javascript/RectAreaLightUniformsLib.js"></script>
<script type="text/javascript" src="../javascript/OrbitControls.js"></script>
<script type="text/javascript" src="../javascript/GLTFLoader.js"></script>
<script type="text/javascript" src="../javascript/tween.min.js"></script>
<script type="text/javascript" src="../javascript/stats.min.js"></script>
<script type="text/javascript" src="../javascript/Configurator.js"></script>
<script type="text/javascript" src="../javascript/cursor.js"></script>

</html>
