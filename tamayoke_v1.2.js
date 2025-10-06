/*
  変更テスト
*/

/*
  v1.0：作成
  v1.1：敵球の出現が、画面の上下左右からランダムで出現するようになりました
  v1.2：コードの可読性を上げました。（リファクタリング）
*/

let canvasSize = 400; //キャンバスサイズを指定
let ball_x = 0; //ball_x座標を格納する変数を作成（初期値０）
let ball_y = 0; //ball_y座標を格納する変数を作成（初期値０）
let ball_dx = 0; //ball_x座標の差分
let ball_dy = 0; //ball_y座標の差分
let speed = 7; //弾速を設定
let ball_diameter = canvasSize/4; //直径
let ball_radius = ball_diameter/2; //半径

/*
  初期実行関数
  引数：なし
  戻り値：なし
*/
function setup() {
  createCanvas(canvasSize, canvasSize);
  createBall();
}

/*
  描画関数（秒間60回実行)
  引数：なし
  戻り値：なし
*/
function draw() {
  background(220); //背景をグレー度220で塗る
  circle(ball_x, ball_y, ball_diameter); //Ballを描画する
  circle(mouseX, mouseY, 10); //自機を描画する

  //Ballがキャンバス内になければBallを作成する
  if (isBallInCanvas() == false) {
    createBall();
  }  
  
  //Ballを動かす
  ball_x += ball_dx;
  ball_y += ball_dy;
  
  //接触判定チェック
  if (isCollision() == true) {
    showGameover();
    noLoop(); //画面を停止する
  }
}

/*
  Ballを作成し、移動量もインプットする。
  引数：なし
  戻り値：なし
*/
function createBall() {
  let randomNum = random(0, 4); //ランダム数を格納する。これの数でどの画面外から弾が出るかを判定する。
  if (randomNum >= 0 && randomNum < 1) { //画面上
    ball_x = random(0, canvasSize);
    ball_y = 0;
    ball_dx = 0;
    ball_dy = speed;
  } else if (randomNum >= 1 && randomNum < 2) { //画面右
    ball_x = canvasSize;
    ball_y = random(0, canvasSize);
    ball_dx = -speed;
    ball_dy = 0;
  } else if (randomNum >= 2 && randomNum < 3) { //画面下
    ball_x = random(0, canvasSize);
    ball_y = canvasSize;
    ball_dx = 0;
    ball_dy = -speed;
  } else if (randomNum >= 3 && randomNum < 4) { //画面左
    ball_x = 0;
    ball_y = random(0, random(0, canvasSize));
    ball_dx = speed;
    ball_dy = 0;
  }
}


/*
  Ballがキャンバス内にあるかを判定する。
  引数：なし
  戻り値：Boolean
*/
function isBallInCanvas() {
  if (ball_x < 0 || ball_y < 0 || ball_x > canvasSize || ball_y > canvasSize) {
    return false;
  } else {
    return true;
  }
}

/*
  自機とボールがぶつかっているかどうかを判定する。
  引数：なし
  戻り値：Boolean
*/
function isCollision() {
  if (mouseX >= ball_x-ball_radius && mouseX <= ball_x+ball_radius) {
    if (mouseY >= ball_y-ball_radius && mouseY <= ball_y+ball_radius) {
      return true;
    }
  }
  
  return false;
}

/*
  ゲームオーバーを表示する。
  引数：なし
  戻り値：なし
*/
function showGameover() {
  textAlign(CENTER);
  textSize(20);
  text("GAME OVER", canvasSize/2, canvasSize/2);
}
