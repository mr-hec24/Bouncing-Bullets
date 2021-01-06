document.addEventListener("DOMContentLoaded", function(event) {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let MAX_X_POSITION = window.innerWidth;
    let MAX_Y_POSITION = window.innerHeight;

    let gameIsLive = true;
    let points = 0;
    let sprites = {};

    let enemies = [
        {
        xPosition: 40,
        yPosition: 15,
        width: 25,
        height: 25,
        speed: 5
        }, {
        xPosition: 100,
        yPosition: 30,
        width: 25,
        height: 25,
        speed: 10
        }, {
        xPosition: 175,
        yPosition: 45,
        width: 25,
        height: 25,
        speed: 9
        }, {
        xPosition: 225,
        yPosition: 60,
        width: 25,
        height: 25,
        speed: 2
        }] ;
    
    let player = {
        xPosition: 10,
        yPosition: 150,
        width: 25,
        height: 25,
        speed: 12
    };

    let coin = {
        xPosition: 300,
        yPosition: 300,
        width: 10,
        height: 10
        
    };
    
    let step = function () {
        update();
        draw();
        if (gameIsLive) {
            window.requestAnimationFrame(step);
        }
    }

    /*
    Generate the random postion for coin and update points.
    */
    let updateCoin = function() {
        points++;
        coin.xPosition = Math.floor(Math.random()*MAX_X_POSITION - 50) + 25;
        console.log(coin.xPosition);
        coin.yPosition = Math.floor(Math.random()*MAX_Y_POSITION - 50) + 25;
    }

    /*
    Checks for collision between two rectangles. 
    */
    let checkForCollision = function(rect1, rect2){
        let closeOnWidth = Math.abs(rect1.xPosition - rect2.xPosition) <= Math.max(rect1.width, rect2.width);
        let closeOnHeight = Math.abs(rect1.yPosition - rect2.yPosition) <= Math.max(rect1.height, rect2.height);
        return closeOnHeight && closeOnWidth;
    }
    

    /*
    Theoretically, the following function should control the player using the W A S D keys on keyboard
    */
    document.addEventListener('keydown', function(event){
        let speed = player.speed;
        if(event.key == 'w') {
            player.yPosition -= speed;
        }
        else if (event.key == 's') {
            player.yPosition += speed;
        }
        else if (event.key == 'd') {
            player.xPosition += speed;
        }
        else if (event.key == 'a') {
            player.xPosition -= speed;
        }
    });

    /*
    Within the following function, add in any updates to values
    This will act as a way to move objects or change sizes
    */
    let update = function() {
        enemies.forEach(enemy => {
            //enemy.xPosition += enemy.speed;
            enemy.yPosition += enemy.speed;

            if (enemy.yPosition >= MAX_Y_POSITION - 50 || enemy.yPosition <= 0) {
                enemy.speed *= -1;
            }

            if (checkForCollision(player, coin)) {
                updateCoin();
            }

            if (checkForCollision(player, enemy)) {
                gameIsLive = false;
                gameOver();
                
            }
        });

    }

    let load = function() {
        sprites.player = new Image();
        sprites.player.src = "Images/hero.png";
        sprites.background = new Image();
        sprites.background.src = "Images/background.png";
        sprites.enemy = new Image();
        sprites.enemy.src = "Images/enemy-down.png";
        sprites.coin = new Image();
        sprites.coin.src = "Images/chest.png";
    };

    /*
    Within the following function, add in any shapes you want draw
    */
    let draw = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        MAX_X_POSITION = window.innerWidth;
        MAX_Y_POSITION = window.innerHeight;

        
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(points, canvas.width - 100, 25);

        // Draws the background
        ctx.drawImage(sprites.background, 0, 0);

        // Draws the player
        ctx.drawImage(sprites.player, player.xPosition, player.yPosition);

        // Draws all of the enimies
        enemies.forEach(function(element, index) 
                {
                ctx.drawImage(sprites.enemy, element.xPosition, element.yPosition);
                })

                //Draws the coin
        ctx.drawImage(sprites.coin, coin.xPosition, coin.yPosition);
    }

    let gameOver = function ()
        {
        ctx.clearRect(0, 0, MAX_X_POSITION, MAX_Y_POSITION);
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
        ctx.fillText("High Score: " + points, canvas.width/2, canvas.height/2 - 100);
        
        let button = document.createElement("button");
        button.innerHTML = "Play Again";

        let body = document.getElementById("body");
        body.appendChild(button);

        button.addEventListener("click", function() {
            window.location = "";
        })


        };
    
    load();
    step();
});