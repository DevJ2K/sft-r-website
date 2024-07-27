<?php 		
    include 'database.php';
    global $db;

    $search = $_GET['search'];    

    // Vérifie si la variable search existe et n'est pas vide.
    if(isset($search) and !empty($search)){
        // Prend les pseudos de la table utilisateur uniquement si la recherche est dans le pseudo, ils sont mis dans l'ordre par la suite.
        $requete = $db -> query('SELECT pseudo, code, avatar FROM utilisateur WHERE pseudo LIKE "%'.$search.'%" ORDER BY pseudo');
    }
        
    if (!$requete)   // si la requete a envoyé une erreur
    {echo '<p>Erreur SQL !<br />'.$db->error.'</p>';}		
?>