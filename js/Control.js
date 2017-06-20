/**
 * Created by HZC on 2017/2/16.
 */
var startView = document.getElementById("startView");
var btnStart = document.getElementById("btn_start");
var playView = document.getElementById("playView");
var btnBack = document.getElementById("btn_back");
var playerScore = document.getElementById("player_score");
var bossShootInterval;
var bossBulletMoveInterval;
var bossMoveInterval;
var score = 0;
var exp = 110;
//开始游戏
function start() {
    btnStart.onclick = function () {
        startView.style.display = "none";
        playView.style.display = "block";
        createPlayer();//创建一个玩家
        // console.log(bullets);
        setInterval(controlMove, 20);//玩家移动
        setInterval(playerBulletMove, 100);//子弹移动
        setInterval(createEnemies, 4000);// 创建敌人
        setInterval(enemyMove, 100);//敌人移动
        createBoss();//创建Boss
        bossMoveInterval = setInterval(bossMove, 100);//boss移动
        bossShootInterval = setInterval(bossShoot, 3000);//Boss射击
        bossBulletMoveInterval = setInterval(bossBulletMove, 100);//Boss子弹移动
        setInterval(function () {
            playerScore.innerText =  score + "分";
        }, 100);
        setInterval(isDeadCheck, 100)//检查敌人死亡状态
    }
}


//返回主界面
function toStartView() {
    btnBack.onclick = function () {
        startView.style.display = "block";
        playView.style.display = "none";
    }
}
function bossAbout() {
    if (bossEnemis.length == 0){
        clearInterval(bossMoveInterval);
        clearInterval(bossShootInterval);
        clearInterval(bossBulletMoveInterval);
    }else {
        bossMoveInterval = setInterval(bossMove, 100);//boss移动
        bossShootInterval = setInterval(bossShoot, 3000);//Boss射击
        bossBulletMoveInterval = setInterval(bossBulletMove, 100);//Boss子弹移动
    }
}
start();
toStartView();