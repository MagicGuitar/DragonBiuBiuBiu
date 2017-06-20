/**
 * Created by HZC on 2017/2/16.
 */
var planeEnemies = [];
var birdEnemis = [];
var ghostEnemis = [];
var bossEnemis = [];
// var boss;
//+++++++++++++++++++虾兵蟹将工厂+++++++++++++++++++
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} blood 血量
 * @param {number} speed 速度
 * @constructor
 */
function smallEnemy(imgSrc, x, y, blood, speed) {
    this.smallEnemyNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.explosionTime = 5;
    this.isHit = false;
    this.isDead = false;
    this.init();
}
//敌人初始化
smallEnemy.prototype.init = function () {
    this.smallEnemyNode.style.position = "absolute";
    this.smallEnemyNode.src = this.imgSrc;
    this.smallEnemyNode.style.left = this.x + "px";
    this.smallEnemyNode.style.top = this.y + "px";
    playView.appendChild(this.smallEnemyNode);
}
//敌人移动
smallEnemy.prototype.move = function () {
    this.smallEnemyNode.style.left = parseInt(this.smallEnemyNode.style.left) - this.speed + "px";
}

//+++++++++++++++++++Boss工厂+++++++++++++++++++
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} blood 血量
 * @param {number} speed 速度
 * @constructor
 */
function bossEnemy(imgSrc, x, y, blood, speed) {
    this.bossEnemyNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.explosionTime = 5;
    this.isHit = false;
    this.isDead = false;
    this.init();
}
//敌人初始化
bossEnemy.prototype.init = function () {
    this.bossEnemyNode.style.position = "absolute";
    this.bossEnemyNode.style.transition = ".5s";
    this.bossEnemyNode.src = this.imgSrc;
    this.bossEnemyNode.style.left = this.x + "px";
    this.bossEnemyNode.style.top = this.y + "px";
    playView.appendChild(this.bossEnemyNode);
}
bossEnemy.prototype.move = function () {
    if (parseInt(this.bossEnemyNode.style.top) < 0){
        this.bossEnemyNode.style.top = "0px";
    }
    else if(parseInt(this.bossEnemyNode.style.top) > 498){
        this.bossEnemyNode.style.top = "498px";
    }
    else {
        this.bossEnemyNode.style.top =parseInt(this.bossEnemyNode.style.top) + (Math.random()*50 - 25) + "px";
    }
}
bossEnemy.prototype.shoot = function () {
    var bullet = new bossBullet("images/enemy/boss/attackBall.gif",
        parseInt(this.bossEnemyNode.style.left), parseInt(this.bossEnemyNode.style.top) + 81, 10, 20);
    bossBullets.push(bullet);
}

//+++++++++++++++++++敌人操作+++++++++++++++++++
function createEnemies() {
    // 创建飞机敌人
    var planeEnemy = new smallEnemy("images/enemy/plane/move.gif",
        1300, Math.random()*500, 50, (Math.random()*10 + 1));
    planeEnemies.push(planeEnemy);
    // 创建鸟敌人
    var birdEnemy = new smallEnemy("images/enemy/bird/move.gif",
        1300, Math.random()*500, 30, (Math.random()*13 + 1));
    birdEnemis.push(birdEnemy);
    //创建幽灵敌人
    var ghostEnemy = new smallEnemy("images/enemy/ghost/move.gif",
        1300, Math.random()*500, 70, (Math.random()*7 + 1));
    ghostEnemis.push(ghostEnemy);

}
//创建boss
function createBoss() {
    var boss = new bossEnemy("images/enemy/boss/move.gif",
        1170, 249, 500, Math.random());
    bossEnemis.push(boss);
}
function bossShoot() {
    for (var i = 0; i < bossEnemis.length; i++){
        bossEnemis[i].shoot();
    }
}
function enemyMove() {
    //飞机移动
    for (var i = 0; i < planeEnemies.length; i++){
        if (planeEnemies[i].isDead == false){
            planeEnemies[i].move();
            planeEnemies[i].isHit = false;
            // if (planeEnemies[i].isHit == false){
            //     planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/move.gif";
            // }
            // planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/move.gif";
            deleteSmallEnemy(planeEnemies);// 删除超出界限飞机
        }else {
            planeEnemies[i].explosionTime--;
            if(planeEnemies[i].explosionTime <= 0){
                score = score + 5;
                exp = exp - 5;
                playView.removeChild(planeEnemies[i].smallEnemyNode);
                planeEnemies.splice(i, 1);
                // console.log(score);
            }
        }
    }
    //鸟人移动
    for (var j = 0; j < birdEnemis.length; j++){
        if (birdEnemis[j].isDead == false){
            birdEnemis[j].move();
            birdEnemis[j].isHit = false;
            deleteSmallEnemy(birdEnemis);// 删除超出界限飞机
        }else {
            birdEnemis[j].explosionTime--;
            if(birdEnemis[j].explosionTime <= 0){
                score = score + 3;
                exp = exp - 3;
                playView.removeChild(birdEnemis[j].smallEnemyNode);
                birdEnemis.splice(j, 1);
            }
        }
    }
    //幽灵移动
    for (var k = 0; k < ghostEnemis.length; k++){
        if (ghostEnemis[k].isDead == false){
            ghostEnemis[k].move();
            ghostEnemis[k].isHit = false;
            deleteSmallEnemy(ghostEnemis);// 删除超出界限幽灵
        }else {
            ghostEnemis[k].explosionTime--;
            if(ghostEnemis[k].explosionTime <= 0){
                score = score + 7;
                exp = exp - 7;
                playView.removeChild(ghostEnemis[k].smallEnemyNode);
                ghostEnemis.splice(k, 1);
            }
        }
    }
    //boss移动
    // for (var m = 0; m < bossEnemis.length; m++){
    //     //删除boss
    //     if (bossEnemis[m].isDead == false){
    //         bossEnemis[m].move();
    //         bossEnemis[m].isHit = false;
    //     }else {
    //         bossEnemis[m].explosionTime--;
    //         if(bossEnemis[m].explosionTime <= 0){
    //             playView.removeChild(ghostEnemis[m].bossEnemyNode);
    //             bossEnemis.splice(m, 1);
    //         }
    //     }
    // }

}
function deleteSmallEnemy(arr) {
    for (var i = 0; i < arr.length; i++){
        if (parseInt(arr[i].smallEnemyNode.style.left) < -100){
            playView.removeChild(arr[i].smallEnemyNode);
            arr.splice(i, 1);
        }
    }
}
function bossMove() {
    for (var m = 0; m < bossEnemis.length; m++){
        //删除boss
        if (bossEnemis[m].isDead == false){
            bossEnemis[m].move();
            bossEnemis[m].isHit = false;
        }else {
            bossEnemis[m].explosionTime--;
            if(bossEnemis[m].explosionTime <= 0){
                score = score + 10;
                exp = exp - 10;
                playView.removeChild(bossEnemis[m].bossEnemyNode);
                bossEnemis.splice(m, 1);
                // console.log(bossEnemis.length+"a");
                console.log(bossEnemis);
            }
        }
    }
}
//+++++++++++++++++++敌人爆炸+++++++++++++++++++
//飞机敌人碰撞检测
function planeDeadCheck(){
    //飞机与子弹碰撞
    for (var i = 0 ; i < planeEnemies.length; i++){
        for (var j = 0; j < playerBullets.length; j++){
            var bulletTop = parseInt(playerBullets[j].playerBulletNode.style.top);
            var bulletLeft = parseInt(playerBullets[j].playerBulletNode.style.left);
            var planeTop = parseInt(planeEnemies[i].smallEnemyNode.style.top);
            var planeLeft = parseInt(planeEnemies[i].smallEnemyNode.style.left);
            if (bulletLeft >= (planeLeft - 32) && bulletLeft <= (planeLeft + 59) &&
            bulletTop >= (planeTop - 21) && bulletTop <= (planeTop + 41)){
                // console.log("e! go die 吧!")
                playerBullets[j].playerBulletNode.src = "images/dragon/small/hit.gif";
                playerBullets[j].isDead = true;
                planeEnemies[i].isHit = true;
                if(planeEnemies[i].isHit = true){
                    planeEnemies[i].blood = planeEnemies[i].blood - 10;
                    // planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/hit.gif";
                    // console.log(planeEnemies[i].blood);
                    if(planeEnemies[i].blood <= 0){
                        // planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/move.gif";
                        planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/die.gif";
                        planeEnemies[i].isDead = true;
                    }
                }
            }
            else {
                // planeEnemies[i].smallEnemyNode.src = "images/enemy/plane/move.gif";
            }

        }

    }
    //飞机与恐龙的碰撞
    for (var i = 0; i < planeEnemies.length; i++){
        var dragonTop = parseInt(player.playerNode.style.top);
        var dragonLeft = parseInt(player.playerNode.style.left);
        var dragonWidth = parseInt(document.defaultView.getComputedStyle(player.playerNode, null).width);
        var dragonHeight = parseInt(document.defaultView.getComputedStyle(player.playerNode, null).height);
        console.log(dragonHeight);
    }
    // document.defaultView.getComputedStyle(player.playerNode, null).width;
    // console.log(document.defaultView.getComputedStyle(player.playerNode, null).width);
}
//鸟敌人碰撞检测
function birdDeadCheck(){
    for (var i = 0 ; i < birdEnemis.length; i++){
        for (var j = 0; j < playerBullets.length; j++){
            var bulletTop = parseInt(playerBullets[j].playerBulletNode.style.top);
            var bulletLeft = parseInt(playerBullets[j].playerBulletNode.style.left);
            var birdTop = parseInt(birdEnemis[i].smallEnemyNode.style.top);
            var birdLeft = parseInt(birdEnemis[i].smallEnemyNode.style.left);
            if (bulletLeft >= (birdLeft - 32) && bulletLeft <= (birdLeft + 58) &&
                bulletTop >= (birdTop - 21) && bulletTop <= (birdTop + 54)){
                // console.log("e! go die 吧!")
                playerBullets[j].isDead = true;
                playerBullets[j].playerBulletNode.src = "images/dragon/small/hit.gif";
                birdEnemis[i].isHit = true;
                if(birdEnemis[i].isHit = true){
                    birdEnemis[i].blood = birdEnemis[i].blood - 10;
                    if(birdEnemis[i].blood <= 0){
                        birdEnemis[i].smallEnemyNode.src = "images/enemy/bird/die.gif";
                        birdEnemis[i].isDead = true;
                    }
                }
            }
        }

    }
}
//幽灵碰撞检测
function ghostDeadCheck(){
    for (var i = 0 ; i < ghostEnemis.length; i++){
        for (var j = 0; j < playerBullets.length; j++){
            var bulletTop = parseInt(playerBullets[j].playerBulletNode.style.top);
            var bulletLeft = parseInt(playerBullets[j].playerBulletNode.style.left);
            var ghostTop = parseInt(ghostEnemis[i].smallEnemyNode.style.top);
            var ghostLeft = parseInt(ghostEnemis[i].smallEnemyNode.style.left);
            if (bulletLeft >= (ghostLeft - 32) && bulletLeft <= (ghostLeft + 107) &&
                bulletTop >= (ghostTop - 21) && bulletTop <= (ghostTop + 92)){
                // console.log("e! go die 吧!")
                playerBullets[j].isDead = true;
                playerBullets[j].playerBulletNode.src = "images/dragon/small/hit.gif";
                ghostEnemis[i].isHit = true;
                if(ghostEnemis[i].isHit = true){
                    ghostEnemis[i].blood = ghostEnemis[i].blood - 10;
                    if(ghostEnemis[i].blood <= 0){
                        ghostEnemis[i].smallEnemyNode.src = "images/enemy/ghost/die.gif";
                        ghostEnemis[i].isDead = true;
                    }
                }
            }
        }

    }
}
//boss碰撞检测
function bossDeadCheck() {
    for (var i = 0 ; i < bossEnemis.length; i++){
        for (var j = 0; j < playerBullets.length; j++){
            var bulletTop = parseInt(playerBullets[j].playerBulletNode.style.top);
            var bulletLeft = parseInt(playerBullets[j].playerBulletNode.style.left);
            var ghostTop = parseInt(bossEnemis[i].bossEnemyNode.style.top);
            var ghostLeft = parseInt(bossEnemis[i].bossEnemyNode.style.left);
            if (bulletLeft >= (ghostLeft - 32) && bulletLeft <= (ghostLeft + 107) &&
                bulletTop >= (ghostTop - 21) && bulletTop <= (ghostTop + 92)){
                // console.log("e! go die 吧!")
                playerBullets[j].isDead = true;
                playerBullets[j].playerBulletNode.src = "images/dragon/small/hit.gif";
                bossEnemis[i].isHit = true;
                if(bossEnemis[i].isHit = true){
                    bossEnemis[i].blood = bossEnemis[i].blood - 10;
                    if(bossEnemis[i].blood <= 0){
                        bossEnemis[i].bossEnemyNode.src = "images/enemy/boss/die.gif";
                        bossEnemis[i].isDead = true;
                    }
                }
            }
        }

    }
}
function isDeadCheck() {
    planeDeadCheck();
    birdDeadCheck();
    ghostDeadCheck();
    bossDeadCheck();
}

