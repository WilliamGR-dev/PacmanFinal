<?php
require '../helpers.php';
header("Access-Control-Allow-Origin: *");
$data = file_get_contents('php://input');
$json = json_decode($data);
$nickname = $json->{'username'};
$score = $json->{'score'};

$db= dbConnect();
$response = new stdClass();

if ($nickname == '' || $score == ''):
    $response->type = 0;
    $response->msg = "Aucun utilisteur n'a pu être enregistré en base";
    echo json_encode($response);
else:
    $selectUser = $db->prepare("SELECT * FROM scores WHERE nickname = :nickname");
    $selectUser->execute(
        [
            'nickname' => $nickname,
        ]);
    $userExist = $selectUser->fetch();
    if ($userExist):
        if($userExist['score']<$score):
            $query_user = $db->prepare('UPDATE scores SET score = :score WHERE nickname = :nickname');
            $query_user->execute(
                [
                    'score' => $score,
                    'nickname' => $nickname,
                ]);
        else:
            $response->type = 0;
            $response->msg = "Fait un meilleur score";
            echo json_encode($response);
        endif;
    else:
        $query_user = $db->prepare('INSERT INTO scores (nickname, score) VALUES (?, ?)');
        $query_user->execute(
            array(
                $nickname,
                $score
            ));
    endif;
endif;
