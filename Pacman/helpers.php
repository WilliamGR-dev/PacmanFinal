<?php
function dbConnect()
{
    try{
        $db = new PDO('mysql:host=localhost:3306;dbname=dv19girard;charset=utf8', 'dv19girard','iyhS36_8', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    }
    catch (Exception $exception){
        die( 'Erreur'.$exception->getMessage());
    }
    return $db;
}
