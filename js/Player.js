/**
 * Created by HZC on 2017/2/16.
 */
var player;
var playerBloodBg = document.getElementById("player_blood_bg")
var playerBloodFrame = document.getElementById("player_blood_frame");
var playerExp = document.getElementById("player_exp");
//+++++++++++++++++++玩家工厂+++++++++++++++++++
/**
 *
 * @param {string} imgSrc 玩家图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} blood 血量
 * @param {number} speed 速度
 * @constructor
 */
function  Player(imgSrc, x, y, blood, speed) {
    this.playerNode = document.createElement("img");//创建玩家图片节点
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.blood = blood;
    this.speed = speed;
    this.isDead = false;
    this.explosionTime = 5;
    this.level = 1;
    this.init();
}
//玩家初始化
Player.prototype.init = function () {
    //对玩家节点添加属性
    this.playerNode.style.position = "absolute";
    this.playerNode.src = this.imgSrc;
    this.playerNode.style.left = this.x + "px";
    this.playerNode.style.top = this.y + "px";
    //将玩家节点添加到游戏界面节点上
    playView.appendChild(this.playerNode);
}
//+++++++++++++++++++玩家控制+++++++++++++++++++
//站着
Player.prototype.stand = function () {
    // this.playerNode.src = "images/dragon/small/stand.gif";
}
//上移
Player.prototype.upMove = function () {
    if(parseInt(this.playerNode.style.top) <= 10){//边界判断
        this.playerNode.style.top = "10px";
    }else {
        this.playerNode.style.top = parseInt(this.playerNode.style.top) - this.speed + "px";
    }
    // this.playerNode.src = "images/dragon/small/move.gif";
}
//下移
Player.prototype.downMove = function () {
    if(parseInt(this.playerNode.style.top) >= 600){//边界判断
        this.playerNode.style.top = "600px";
    }else {
        this.playerNode.style.top = parseInt(this.playerNode.style.top) + this.speed + "px";
    }
    // this.playerNode.src = "images/dragon/small/move.gif";
}
//左移
Player.prototype.leftMove = function () {
    if(parseInt(this.playerNode.style.left) <= 0){//边界判断
        this.playerNode.style.left = "0px";
    }else {
        this.playerNode.style.left = parseInt(this.playerNode.style.left) - this.speed + "px";
    }
    // this.playerNode.src = "images/dragon/small/move.gif";
}
//右移
Player.prototype.rightMove = function () {
    if(parseInt(this.playerNode.style.left) >= 1297){//边界判断
        this.playerNode.style.left = "1297px";
    }else {
        this.playerNode.style.left = parseInt(this.playerNode.style.left) + this.speed + "px";
    }
    // this.playerNode.src = "images/dragon/small/move.gif";
}
Player.prototype.shoot = function () {
    var bullet = new playerBullet("images/dragon/small/att.gif",
        parseInt(this.playerNode.style.left) + 57, parseInt(this.playerNode.style.top) + 18, 10, 20);
    playerBullets.push(bullet);
}
//按键按下
document.onkeydown = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == keyCode.upBtn){
        keyStatus.upBtnStatus = true;
    }
    if (e.keyCode == keyCode.downBtn){
        keyStatus.downBtnStatus = true;
    }
    if (e.keyCode == keyCode.leftBtn){
        keyStatus.leftBtnStatus = true;
    }
    if (e.keyCode == keyCode.rightBtn){
        keyStatus.rightBtnStatus = true;
    }
    if (e.keyCode == keyCode.spaceBtn){
        // keyStatus.spaceBtnStatus = true
        player.shoot();
    }

}
//按键弹起
document.onkeyup = function () {
    var e = window.event || arguments[0];
    if (e.keyCode == keyCode.upBtn){
        keyStatus.upBtnStatus = false;
    }
    if (e.keyCode == keyCode.downBtn){
        keyStatus.downBtnStatus = false;
    }
    if (e.keyCode == keyCode.leftBtn){
        keyStatus.leftBtnStatus = false;
    }
    if (e.keyCode == keyCode.rightBtn){
        keyStatus.rightBtnStatus = false;
    }
    if (e.keyCode == keyCode.spaceBtn){
        keyStatus.spaceBtnStatus = false;
    }
}

function controlMove() {
    player.playerBloodFrame();
    player.playerExperience();
    if (keyStatus.upBtnStatus == true){
        player.upMove();
    }
    if (keyStatus.downBtnStatus == true){
        player.downMove();
    }
    if (keyStatus.leftBtnStatus == true){
        player.leftMove();
    }
    if (keyStatus.rightBtnStatus == true){
        player.rightMove();
    }
    if (keyStatus.spaceBtnStatus == true){
        // player.shoot();
    }
    if (keyStatus.upBtnStatus == false && keyStatus.downBtnStatus == false &&
        keyStatus.leftBtnStatus == false && keyStatus.rightBtnStatus == false && keyStatus.spaceBtnStatus == false){
        player.stand();
    }
}
//+++++++++++++++++++创建玩家+++++++++++++++++++
function createPlayer() {
    player = new Player("images/dragon/small/stand.gif",
        0, 300, 56, 5);
}
//+++++++++++++++++++玩家血量+++++++++++++++++++
Player.prototype.playerBloodFrame = function () {
    playerBloodBg.style.top = parseInt(this.playerNode.style.top) - 8 + "px";
    playerBloodBg.style.left = parseInt(this.playerNode.style.left) + 5 + "px";
    playerBloodBg.style.display = "block";
}
Player.prototype.playerExperience = function () {
    if (exp <= 0) {
        exp = 110;
        this.level = this.level + 1;
        // this.level = 2;
        if (this.level == 2) {
            this.playerNode.src = "images/dragon/middle/stand.gif";
            playerBloodBg.style.left = parseInt(this.playerNode.style.left) + 100 + "px";
            // this.playerNode.src = "images/dragon/small/move.gif";
            console.log(this.playerNode.src);
        }
        else if (this.level == 3) {
            this.playerNode.src = "images/dragon/large/stand.gif";
            console.log("levle3")
        }else if (this.level == 4) {
            this.playerNode.src = "images/dragon/final/stand.gif";
            console.log("levle 4")
        }
        console.log(this.level);
    }
    playerExp.style.clip = "rect("+ exp + "px 31px 166px 0)"
}
Player.prototype.levelUp = function () {

}