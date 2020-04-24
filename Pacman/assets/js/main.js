// Collection des murs axe horizontal droite-gauche
const blockedSquaresToLeft = [
    {top:300, left:200},{top:500, left:200},{top:700, left:200},{top:200, left:300},{top:300, left:300},{top:500, left:300},{top:800, left:300},
    {top:0, left:500}, {top:200, left:500}, {top:600, left:500}, {top:800, left:500}, {top:400, left:600}, {top:200, left:700}, {top:300, left:700},
    {top:500, left:700}, {top:800, left:700}, {top:700, left:800},
//ligne en left 0
    {top:0, left:0}, {top:100, left:0}, {top:200, left:0}, {top:600, left:0}, {top:700, left:0}, {top:800, left:0},{top:900, left:0}
]
// Collection des murs axe horizontal gauche-droite
const blockedSquaresToRight = [
    {top:700, left:100}, {top:200, left:200}, {top:300, left:200}, {top:500, left:200}, {top:800, left:200}, {top:400, left:300},
    {top:0, left:400}, {top:200, left:400}, {top:600, left:400}, {top:800, left:400}, {top:200, left:600}, {top:300, left:600},
    {top:500, left:600}, {top:800, left:600}, {top:300, left:700}, {top:500, left:700}, {top:700, left:700},
//ligne en left 900
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900}
]
// Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    {top:400, left:0}, {top:600, left:0}, {top:800, left:0}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100}, {top:600, left:100},
    {top:400, left:100}, {top:700, left:100}, {top:900, left:100}, {top:900, left:200}, {top:100, left:300}, {top:300, left:300},
    {top:700, left:300}, {top:900, left:300}, {top:200, left:400}, {top:500, left:400}, {top:600, left:400}, {top:800, left:400},
    {top:200, left:500}, {top:500, left:500}, {top:600, left:500}, {top:800, left:500}, {top:100, left:600}, {top:300, left:600},
    {top:700, left:600}, {top:900, left:600}, {top:900, left:700}, {top:100, left:800}, {top:200, left:800}, {top:400, left:800},
    {top:600, left:800}, {top:700, left:800}, {top:900, left:800}, {top:400, left:900}, {top:600, left:900}, {top:800, left:900} ,
//ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
]
// Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    {top:200, left:0}, {top:400, left:0}, {top:700, left:0}, {top:0, left:100}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},
    {top:600, left:100}, {top:800, left:100}, {top:800, left:200}, {top:0, left:300}, {top:200, left:300}, {top:600, left:300}, {top:800, left:300},
    {top:100, left:400}, {top:300, left:400}, {top:500, left:400}, {top:700, left:400}, {top:100, left:500}, {top:300, left:500}, {top:500, left:500},
    {top:700, left:500}, {top:0, left:600}, {top:200, left:600}, {top:600, left:600}, {top:800, left:600}, {top:800, left:700}, {top:0, left:800},
    {top:100, left:800}, {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:800, left:800}, {top:200, left:900}, {top:400, left:900},
    {top:700, left:900},
//ligne en top 900
    {top:900, left:0}, {top:900, left:100}, {top:900, left:200}, {top:900, left:300}, {top:900, left:400}, {top:900, left:500}, {top:900, left:600},
    {top:900, left:700}, {top:900, left:800}, {top:900, left:900}
]

// Collection des Niveaux (7 en tout)
const levels = [
    {normal:3, smart:0, smart_fast:0}, {normal:2, smart:1, smart_fast:0}, {normal:1, smart:2, smart_fast:0}, 
    {normal:0, smart:3, smart_fast:0}, {normal:0, smart:2, smart_fast:1}, {normal:0, smart:1, smart_fast:2}, 
    {normal:0, smart:0, smart_fast:3}
]

// Collection des vitesses
const speeds = {
    normal:350, smart:500, smart_fast:400
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// Variables globales

const input = document.getElementById("input");
const button = document.getElementById("play");

let username;
let score = 0;

const anchor = document.getElementById("score");
anchor.innerHTML = score;

let gameLevel = 0; 

let abortFlag;

let overlay;

const map = document.querySelector('.map');

let ghosts;
let initGhosts;
let ghostInterval;
let speed;

let dots;

const pacMan = document.querySelector('img[src="./assets/img/pacman.gif"]');
let pacManInterval;

const removedDots = [
    {top:500, left:900}, {top:500, left:800}, {top:300, left:900}, {top:300, left:800}, {top:500, left:0}, {top:500, left:100}, {top:300, left:0}, {top:300, left:100},
    {top:400, left:400}, {top:400, left:500}
]

function getInputUsername(){
    username = input.value;

    if(username) {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
        button.style.opacity = 0.1;
        input.style.cursor = 'not-allowed';
        input.readOnly = true;
        input.value = '';
        input.placeholder = username;
        
        init();
    } else {
        alert("Hey ! Tu dois rentrer un nom avant de pouvoir jouer")
    }
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const init = () => {
    ghosts = [];
    initGhosts = [];
    ghostInterval = 0;
    pacManInterval = 0;

    overlay = document.querySelector('.overlay');
    overlay.parentNode.removeChild(overlay);

    console.log('PACMAN : stage as started');

    displayDots();
    console.log('init : dots matrix built');
        
    window.document.addEventListener('keydown', start, true) 
    console.log('init : registered event');   

    buildGhosts();
    console.log('init : built ghosts');
}

const start = (e) => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft');
            break;
        case 39:
            movePacMan('toRight');
            break;
        case 38:
            movePacMan('toTop');
            break;
        case 40:
            movePacMan('toBottom');
            break;
    }
}

const buildGhosts = () => {
    let level = gameLevel < 7 ? levels[gameLevel] : levels[6];
    let index = 0;

    for (let key in level) {
        for (let y = 0; y < level[key]; y++) {
            const ghost = document.createElement('div');
            ghost.setAttribute("id", index);
            ghost.classList.add('ghost');

            try {
                ghost.style.background = 'url("assets/img/ghosts/' + index + '.png") no-repeat';
                ghost.style.backgroundSize = "cover";
            }
            catch (e) {
                console.log(e);
            }

            document.querySelector('.map').appendChild(ghost);
            initGhosts.push(new Array(ghostInterval));
            
            switch(key) {
                case 'normal':
                    moveGhost(index, speeds['normal']);
                    break;
                case 'smart':
                    moveSmartGhost(index, speeds['smart']);
                    break;
                case 'smart_fast':
                    moveSmartGhost(index, speeds['smart_fast']);
            }

            index++;
        }
    }
}

const getGhosts = () => {
    return ghosts = document.querySelectorAll('.ghost');
}

const displayDots = () => {
    for (let  col = 0; col < 10; col++){
        for(let row = 0; row < 10; row++){
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.style.left = col*100+'px';
            dot.style.top = row*100+'px';
            map.insertBefore(dot, pacMan);
        }
    }

    const allDots = getDots();

    for (i = 0; i < allDots.length; i++) {

        const Dot = getComputedStyle(allDots[i]);
        const DotLeft = Dot.left;
        const DotTop = Dot.top;
        
        for (let removedDot of removedDots) {
            if (DotLeft == removedDot.left + "px" && DotTop == removedDot.top + "px") {
                map.removeChild(allDots[i]);
            }
        }
    }
}

const getDots = () => {
    return dots = document.querySelectorAll('.dot')
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const getPositionOf = (element) => {
	if (element != null) { 
		const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10);
    	const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10);
    	return { top, left };
    } else {
    	return;
    }
}

const isTheCharacterBlocked = (characterPosition, movingDirection) => {   
    let blockedSquares;
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft;
            break;
        case 'toRight':
            blockedSquares = blockedSquaresToRight;
            break;
        case 'toTop':
            blockedSquares = blockedSquaresToTop;
            break;
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom;
            break;
        default:
        	blockedSquares = blockedSquaresToTop;
    }

    return blockedSquares.some(square => {
        const topsAreEquals = characterPosition.top === square.top;
        const leftsAreEquals = characterPosition.left === square.left;
        return topsAreEquals && leftsAreEquals;
    })
}

const directions = ['toLeft', 'toRight', 'toTop', 'toBottom'];

// Déplacement du méchant fantôme suivant son index dans initGhost[]
const moveGhost = (index, speed) => {

    const ghost = document.getElementById(index);

    clearInterval(initGhosts[index]);

    let ghostPosition = getPositionOf(ghost);

    const randomInt = Math.floor(Math.random() * 4);
    const randomDirection = directions[randomInt];
    if (ghost != null) {
	    initGhosts[ghost.id][0] = setInterval(() => {
	        if (!abortFlag) {
		        if (!isTheCharacterBlocked(ghostPosition, randomDirection)) {
		            switch (randomDirection) {
		                case 'toLeft':
		                    ghost.style.left = ghostPosition.left === 0 ? 900 + "px" : ghostPosition.left - 100 + "px";
		                    break;
		                case 'toRight':
		                    ghost.style.left = ghostPosition.left === 900 ? 0 + "px" : ghostPosition.left + 100 + "px";
		                    break;
		                case 'toTop':
		                    ghost.style.top = ghostPosition.top - 100 + "px";
		                    break;
		                case 'toBottom':
		                    ghost.style.top = ghostPosition.top + 100 + "px";
		                    break;
		            }
		            ghostPosition = getPositionOf(ghost);
		        }
		        else {
		            moveGhost(index, speed);
		            return;
		        }
		    } else {
		    	return;
		    }
	    }, speed)
	}
}

const moveSmartGhost = (index, speed) => {

    const ghost = document.getElementById(index);

    clearInterval(initGhosts[index])
    ghostInterval = setInterval(() => {
        moveToPacMan(ghost)
        if (abortFlag) return;
    }, speed)
}

const move = (character, from, to) => {
    switch (to) {
        case 'toLeft':
            character.style.left = from.left === 0 ? 900 + "px" : from.left - 100 + "px";
            break;
        case 'toRight':
            character.style.left = from.left === 900 ? 0 + "px" : from.left + 100 + "px";
            break;
        case 'toTop':
            character.style.top = from.top - 100 + "px";
            break;
        case 'toBottom':
            character.style.top = from.top + 100 + "px";
            break;
    }
}

const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan);
    const ghostPosition = getPositionOf(ghost);
    const delta = getDelta(pacManPosition, ghostPosition);

    let direction;

    if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)];
    if (delta.topDirection === null) direction = delta.leftDirection;
    else if (delta.leftDirection === null) direction = delta.topDirection;
    else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection;
    
    if (isTheCharacterBlocked(ghostPosition, direction)) {
        direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection;
        if (direction === null) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection);
            direction = otherDirections[Math.floor(Math.random() * 2)];
        }
    }

    while (isTheCharacterBlocked(ghostPosition, direction)) {
        let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection);
        direction = otherDirections[Math.floor(Math.random() * 2)];
    }

    move(ghost, ghostPosition, direction);
}

const getDelta = (pacManPosition, ghostPosition) => {
    const top = pacManPosition.top - ghostPosition.top;
    const left = pacManPosition.left - ghostPosition.left;
    let topDirection, leftDirection;
    if (top === 0) topDirection = null;
    else topDirection = top > 0 ? 'toBottom' : 'toTop';
    if (left === 0) leftDirection = null;
    else leftDirection = left > 0 ? 'toRight' : 'toLeft';
    return { top, left, topDirection, leftDirection };
}

// Déplacement du frère Pacman
async function movePacMan(to) {

    clearInterval(pacManInterval);;
    pacMan.className = to;

    let pacManPosition = getPositionOf(pacMan);

    pacManInterval = setInterval(() => {

        if (!isTheCharacterBlocked(pacManPosition, to)) {

            switch (to) {
                case 'toLeft':
                    pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" : pacManPosition.left - 100 + "px";
                    break;
                case 'toRight':
                    pacMan.style.left = pacManPosition.left === 900 ? 0 : pacManPosition.left + 100 + "px";
                    break;
                case 'toTop':
                    pacMan.style.top = pacManPosition.top - 100 + "px";
                    break;
                case 'toBottom':
                    pacMan.style.top = pacManPosition.top + 100 + "px";
                    break;
            }

            pacManPosition = getPositionOf(pacMan);
        }

        const allDots = getDots();

        allDots.forEach((dot) => {

            const Dot = getComputedStyle(dot);
            const DotLeft = Dot.left;
            const DotTop = Dot.top;

            if(pacManPosition.top + "px" == DotTop && pacManPosition.left + "px" == DotLeft){
                map.removeChild(dot);
                updateScore();
            }
        })

        if (allDots.length == 0) nextlevel();

        getGhosts().forEach((ghost) => {

            const Ghost = getComputedStyle(ghost);
            const GhostLeft = Ghost.left;
            const GhostTop = Ghost.top;

            if(pacManPosition.top + "px" == GhostTop && pacManPosition.left + "px" == GhostLeft){
                setGameOver();
            }
        });

    if (abortFlag) return;

    }, 150)
}

async function updateScore() {
    score += 10;
    anchor.innerHTML = score;
}

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

const nextlevel = () => {
    abortFlag = true;

    map.appendChild(overlay);

    clearInterval(pacManInterval);

	window.document.removeEventListener('keydown', start, true);
    getGhosts().forEach((ghost) => { setTimeout(e => {
    	map.removeChild(ghost);
    }, 1000); });

    gameLevel++;
    setTimeout(init, 2000);

    abortFlag = false;
}

const highScore = () => {
    const url = './models/highScores.php'
    let scores = []
    const button = document.getElementById('highScore');
    const table = document.getElementById('table')

    fetch(url).then(result => {
            return result.json()
        }
    ).then(
        json => {
            scores = json
            const scoresList = scores.map(score => `<tr><td>${ score.nickname }</td><td>(${ score.score })</td> </tr>`)
            const tableContent = scoresList.join('')
            table.innerHTML = tableContent
        }
    ).catch(
        error => console.error(error)
    )

}

const setGameOver = () => {
    map.appendChild(overlay);
    clearInterval(pacManInterval, 10000);

    let gameover = document.createElement('img'); 
    gameover.classList.add('gameover');
    gameover.src = './assets/img/gameover.png';
    map.appendChild(gameover);

    if (!document.contains(document.getElementById("sendForm"))) {
        let form = document.createElement("form");
        let button = document.createElement("button");

        form.setAttribute("id", "sendForm");
        button.setAttribute("type","submit");
        button.innerHTML = "Save Score"

        document.querySelector('.ux').appendChild(form);
        document.getElementById("sendForm").appendChild(button);

        window.document.removeEventListener('keydown', start, true);

        let registerForm = document.getElementById('sendForm')

        let createObjectPerson = function (username, score) {
            let obj = {
                username: username,
                score: score,
            }
            return obj
        }
        let Register = function () {

            let user = createObjectPerson(username, score)


            fetch('./models/addUser.php', {
                method: 'POST',
                headers : new Headers(),
                body: JSON.stringify(user)
            }).then((res) => res.text())
                .then((data) => {
                    console.log(data)
                })
        }

        registerForm.addEventListener('submit', function (e) {
            e.preventDefault()
            Register()
        })

    }
}