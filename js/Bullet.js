/**
 * Created by HZC on 2017/2/16.
 */
var playerBullets = [];
var bossBullets = [];
//+++++++++++++++++++玩家子弹工厂+++++++++++++++++++
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} power 子弹威力
 * @param {number} speed 子弹速度
 * @constructor
 */
function playerBullet(imgSrc, x, y, power, speed) {
    this.playerBulletNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.power = power;
    this.speed = speed;
    this.explosionTime = 1;
    this.isDead = false;
    this.iscollision = false;
    this.init();
}
//玩家子弹初始化
playerBullet.prototype.init = function () {
    this.playerBulletNode.style.position = "absolute";
    this.playerBulletNode.style.zIndex = "20";
    this.playerBulletNode.src = this.imgSrc;
    this.playerBulletNode.style.top = this.y + "px";
    this.playerBulletNode.style.left = this.x + "px";
    playView.appendChild(this.playerBulletNode);
}
//玩家子弹移动
playerBullet.prototype.move = function () {
    this.playerBulletNode.style.left = parseInt(this.playerBulletNode.style.left) + this.speed + "px";
}
//玩家所有子弹移动
function playerBulletMove() {
    for (var i = 0; i < playerBullets.length; i++){
        if (playerBullets[i].isDead == false){
            playerBullets[i].move();
            //玩家子弹超出边界删除
            if (parseInt(playerBullets[i].playerBulletNode.style.left) > 1333){
                playView.removeChild(playerBullets[i].playerBulletNode);
                playerBullets.splice(i, 1);
            }
        }else {
            console.log("e! go die 吧!")
            playerBullets[i].explosionTime--;
            if(playerBullets[i].explosionTime <= 0){
                playView.removeChild(playerBullets[i].playerBulletNode);
                playerBullets.splice(i, 1);
            }
        }

    }
}

//+++++++++++++++++++Boss子弹工厂+++++++++++++++++++
/**
 *
 * @param {string} imgSrc 图片路径
 * @param {number} x 起始x坐标
 * @param {number} y 起始y坐标
 * @param {number} power 子弹威力
 * @param {number} speed 子弹速度
 * @constructor
 */
function bossBullet(imgSrc, x, y, power, speed) {
    this.bossBulletNode = document.createElement("img");
    this.imgSrc = imgSrc;
    this.x = x;
    this.y = y;
    this.power = power;
    this.speed = speed;

    this.init();
}
//Boss子弹初始化
bossBullet.prototype.init = function () {
    this.bossBulletNode.style.position = "absolute";
    this.bossBulletNode.src = this.imgSrc;
    this.bossBulletNode.style.top = this.y + "px";
    this.bossBulletNode.style.left = this.x + "px";
    playView.appendChild(this.bossBulletNode);
}
//Boss子弹移动
bossBullet.prototype.move = function () {
    this.bossBulletNode.style.left = parseInt(this.bossBulletNode.style.left) - this.speed + "px";
}
//Boss所有子弹移动
function bossBulletMove() {
    for (var i = 0; i < bossBullets.length; i++){
        bossBullets[i].move();
        //Boss子弹超出边界删除
        if (parseInt(bossBullets[i].bossBulletNode.style.left) < -100){
            playView.removeChild(bossBullets[i].bossBulletNode);
            bossBullets.splice(i, 1);
        }
    }
}
