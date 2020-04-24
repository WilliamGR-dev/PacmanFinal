<?php
require '../helpers.php';
    $db= dbConnect();
    $fetch_hight_score = $db->query('SELECT * FROM scores ORDER BY score DESC LIMIT 10');
    $top_ten_scores = $fetch_hight_score->fetchAll();
    echo json_encode($top_ten_scores);


