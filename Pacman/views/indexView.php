<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="UTF-8">
    <title>Vanilla Pac-Man</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" href="assets/img/pacman.gif" type="image/gif" >
</head>
<body>
    <div class="options">
    	<div class="score">
    		<h2>Score : <span id="score"></span></h2>
    	</div>
    	<div class="inputform">
    		<input type="text" placeholder="Rentre ton pseudo" id="input">
    	</div>
    	<div class="ux">
        	<button type="button" onclick="getInputUsername();" id="play">Play</button>
        	<button onClick="window.location.reload();">Restart</button>
        	<button onClick="highScore();" id="highScore">High Score</button>
    	</div>
        <div class="divScore">
            <h1>High Score</h1>
            <div>
                <table class="allScores" >
                    <tr>
                        <td><h2>Pseudo</h2></td>
                        <td><h2>Score</h2></td>
                    </tr>
                </table>
                <table id="table" class="infoScores"></table>
            </div>
        </div>
    </div>
    <div class="pacman">
        <div class="map">
            <div class="overlay"></div>
            <img src="./assets/img/pacman.gif" alt="Pacman">
            <img src="./assets/img/background.svg" alt="Labyrinthe">
        </div>
    </div>
</body>
<script src="./assets/js/main.js"></script>
</html>