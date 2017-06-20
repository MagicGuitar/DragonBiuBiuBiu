/**
 * Created by HZC on 2017/2/15.
 */
var startView = document.getElementById("startView");
var btnStart = document.getElementById("btn_start");
var playView = document.getElementById("playView");
var btnBack = document.getElementById("btn_back");

var player;
var planeEnemies = [];
var birdEnemis = [];
var ghostEnemis = [];
var bossEnemis = [];
var bullets = [];

var upBtnStatus = false;
var downBtnStatus = false;
var leftBtnStatus = false;
var rightBtnStatus = false;
var blankBtnStatus = false;
//==========================开始界面方法=======================

function toPlayView() {
    btnStart.onclick = function () {
        startView.style.display = "none";
        playView.style.display = "block";
        //创建玩家
        player = new Player("images/dragon/small/stand.gif",
        0, 300, 10, 10);
        // 创建敌人
        setInterval(createEnemies, 3000);
        //敌人移动
        setInterval(enemyMove, 80);
        //删除敌人
        setInterval(deleteEnemy, 3000);
        //玩家移动
        setInterval(controlMove, 20);
        //子弹移动
        setInterval(bulletMove, 100);
        //删除子弹
    }
}

//==========================玩耍界面方法=======================
function toStartView() {
    btnBack.onclick = function () {
        startView.style.display = "block";
        playView.style.display = "none";
    }
}// 到开始界面

//=============================玩家============================
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} blood 玩家血量
 * @param {number} speed 玩家速度
 * @constructor
 */
function Player(imgSrc, x, y, blood, speed) {
    this.playerNode = document.createElement("img");//创建玩家图片节点
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.init = function () {
        //对玩家节点添加属性
        this.playerNode.style.position = "absolute";
        this.playerNode.src = this.imgSrc;
        this.playerNode.style.left = this.x + "px";
        this.playerNode.style.top = this.y + "px";
        //将玩家节点添加到游戏界面节点上
        playView.appendChild(this.playerNode);
    }//玩家初始化
    //玩家移动
    this.stand = function () {
        this.playerNode.src = "images/dragon/small/stand.gif";
    }
    this.upMove = function () {
        if(parseInt(this.playerNode.style.top) <= 0){//边界判断
            this.playerNode.style.top = "0px";
        }else {
            this.playerNode.style.top = parseInt(this.playerNode.style.top) - this.speed + "px";
        }
        this.playerNode.src = "images/dragon/small/move.gif";
    }//上移
    this.downMove = function () {
        if(parseInt(this.playerNode.style.top) >= 600){//边界判断
            this.playerNode.style.top = "600px";
        }else {
            this.playerNode.style.top = parseInt(this.playerNode.style.top) + this.speed + "px";
        }
        this.playerNode.src = "images/dragon/small/move.gif";
    }//下移
    this.leftMove = function () {
        if(parseInt(this.playerNode.style.left) <= 0){//边界判断
            this.playerNode.style.left = "0px";
        }else {
            this.playerNode.style.left = parseInt(this.playerNode.style.left) - this.speed + "px";
        }
        this.playerNode.src = "images/dragon/small/move.gif";
    }//左移
    this.rightMove = function () {
        if(parseInt(this.playerNode.style.left) >= 1297){//边界判断
            this.playerNode.style.left = "1297px";
        }else {
            this.playerNode.style.left = parseInt(this.playerNode.style.left) + this.speed + "px";
        }
        this.playerNode.src = "images/dragon/small/move.gif";
    }//右移
    this.shoot = function () {
        var bullet = new Bullet("images/dragon/small/hit.gif",
            parseInt(this.playerNode.style.left) + 57, parseInt(this.playerNode.style.top) + 10, 10, 20);
        bullets.push(bullet);
        this.playerNode.src = "images/dragon/small/magicmissile.gif";
    }


    this.init();
}//玩家构造函数
//玩家移动

document.onkeydown = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == 38){
        upBtnStatus = true;
    }
    if (e.keyCode == 40){
        downBtnStatus = true;
    }
    if (e.keyCode == 37){
        leftBtnStatus = true;
    }
    if (e.keyCode == 39){
        rightBtnStatus = true;
    }
    if (e.keyCode == 32){
        blankBtnStatus = true
        player.shoot();
    }

}// 上下左右按下

document.onkeyup = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == 38){
        upBtnStatus = false;
    }
    if (e.keyCode == 40){
        downBtnStatus = false;
    }
    if (e.keyCode == 37){
        leftBtnStatus = false;
    }
    if (e.keyCode == 39){
        rightBtnStatus = false;
    }
    if (e.keyCode == 32){
        blankBtnStatus = false;
    }
}// 上下左右弹起

function controlMove() {
    if (upBtnStatus == true){
        player.upMove();
    }
    if (downBtnStatus == true){
        player.downMove();
    }
    if (leftBtnStatus == true){
        player.leftMove();
    }
    if (rightBtnStatus == true){
        player.rightMove();
    }
    if (upBtnStatus == false && downBtnStatus == false && leftBtnStatus == false
        && rightBtnStatus == false && blankBtnStatus == false){
        player.stand();
    }
}// 监听开关

//=============================敌人============================
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} blood 敌人血量
 * @param {number} speed 敌人速度
 * @constructor
 */
function Enemy(imgSrc, x, y, blood, speed) {
    this.enemyNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.init = function () {
        this.enemyNode.style.position = "absolute";
        this.enemyNode.src = this.imgSrc;
        this.enemyNode.style.right = this.x + "px";
        this.enemyNode.style.top = this.y + "px";
        playView.appendChild(this.enemyNode);
    }//敌人初始化
    this.move = function () {
        this.enemyNode.style.right = parseInt(this.enemyNode.style.right) + speed + "px";
    }//敌人移动

    this.init();
}//敌人构造函数

function createEnemies() {
    // 创建飞机敌人
    var planeEnemy = new Enemy("images/enemy/plane/move.gif",
    Math.random()*30, Math.random()*500, 10, (Math.random()*10 + 1));
    planeEnemies.push(planeEnemy);
    // 创建鸟敌人
    var birdEnemy = new Enemy("images/enemy/bird/move.gif",
        Math.random()*30, Math.random()*500, 10, (Math.random()*13 + 1));
    birdEnemis.push(birdEnemy);
    //创建幽灵敌人
    var ghostEnemy = new Enemy("images/enemy/boss/move.gif",
        Math.random()*30, Math.random()*500, 10, (Math.random()*7 + 1));
    ghostEnemis.push(ghostEnemy);
    //创建boss
    var bossEnemy = new Enemy("images/enemy/ghost/move.gif",
        Math.random()*30, Math.random()*500, 10, 3);
    bossEnemis.push(bossEnemy);
    // console.log(enemies.length);
}//创建飞机敌人
function deleteEnemy() {
    // 删除飞机
    for (var i = 0;  i < planeEnemies.length; i++){
        if (parseInt(planeEnemies[i].enemyNode.style.right) > 1000){
            playView.removeChild(planeEnemies[i].enemyNode);
            planeEnemies.splice(i, 1);
        }
    }
    // 删除鸟人
    for (var j = 0; j < birdEnemis.length; j++){
        if (parseInt(birdEnemis[j].enemyNode.style.right) > 1000){
            playView.removeChild(birdEnemis[j].enemyNode);
            birdEnemis.splice(j, 1);
        }
    }
    //删除幽灵
    for (var k = 0; k < ghostEnemis.length; k++){
        if (parseInt(ghostEnemis[k].enemyNode.style.right) > 1000){
            playView.removeChild(ghostEnemis[k].enemyNode);
            ghostEnemis.splice(k, 1);
        }
    }
    //删除boss
    for (var m = 0; m < bossEnemis.length; m++){
        if (parseInt(bossEnemis[m].enemyNode.style.right) > 1000){
            playView.removeChild(bossEnemis[m].enemyNode);
            bossEnemis.splice(m, 1);
        }
    }
    console.log(planeEnemies.length)
}//删除敌人
function enemyMove() {
    for (var i = 0; i < planeEnemies.length; i++){
        planeEnemies[i].move();
    }
    for (var j = 0; j < birdEnemis.length; j++){
        birdEnemis[j].move();
    }
    for (var k = 0; k < ghostEnemis.length; k++){
        ghostEnemis[k].move();
    }
    for (var m = 0; m < bossEnemis.length; m++){
        bossEnemis[m].move();
    }
}//所有敌人移动


//=============================子弹============================
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} power 子弹威力
 * @param {number} speed 子弹速度
 * @constructor
 */
function Bullet(imgSrc, x, y, power, speed) {
    this.bulletNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.power = power;
    this.speed = speed;
    this.init = function () {
        this.bulletNode.style.position = "absolute";
        this.bulletNode.src = this.imgSrc;
        this.bulletNode.style.top = this.y + "px";
        this.bulletNode.style.left = this.x + "px";
        playView.appendChild(this.bulletNode);
    }
    this.move = function () {
        this.bulletNode.style.left = parseInt(this.bulletNode.style.left) + this.speed + "px";
    }
    this.init();
}//子弹构造函数

function bulletMove() {
    for (var i = 0; i < bullets.length; i++){
        bullets[i].move();
        if (parseInt(bullets[i].bulletNode.style.left) > 1200){
            playView.removeChild(bullets[i].bulletNode);
            bullets.splice(i, 1);
        }
    }
}
// function deleteBullet() {
//     for (var i = 0;  i < bullets.length; i++){
//         if (parseInt(bullets[i].bulletNode.style.left) > 1200){
//             playView.removeChild(bullets[i].bulletNode);
//             bullets.splice(i, 1);
//         }
//     }
// }
//====================方法调用=====================
toPlayView();
toStartView();
