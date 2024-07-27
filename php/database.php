<?php
    // Variable par défautt de la BDD
    define("HOST", 'localhost');
    define("DB_NAME", "sft_database");
    define("USER", "root");
    define("PASS", "root");

    try{
        $db = new PDO("mysql:host=" . HOST . ";dbname=" . DB_NAME, USER, PASS);
        $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo "connexion -> OK !";
    } catch(PDOException $e){
        echo $e;
    }

?>