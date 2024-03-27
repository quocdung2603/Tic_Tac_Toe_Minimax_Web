//tạo mảng 2 chiều 3*3
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() { // vẽ cái ô lớn, khởi tạo chiều dài, rộng.
  let canvas=createCanvas(400, 400);
  canvas=canvas.position(windowWidth/2 - 200, windowHeight/2 - 200); // điều chỉnh nằm ở giữa màn hình
  w = width / 3;
  h = height / 3;
  //bestMove();
}

function equals3(a, b, c) { //so sánh
  return a == b && b == c && a != '';
}

function checkWinner() { // check coi có TH thẳng chưa
  let winner = null;

  // check ngang
  for (let i = 0; i < 3; i++) {
      if (equals3(board[i][0], board[i][1], board[i][2])) {
          winner = board[i][0];
      }
  }

  // dọc
  for (let i = 0; i < 3; i++) {
      if (equals3(board[0][i], board[1][i], board[2][i])) {
          winner = board[0][i];
      }
  }

  // đường chéo
  if (equals3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
              openSpots++;
          }
      }
  }

  if (winner == null && openSpots == 0) {
      return 'tie';
  } else {
      return winner;
  }
}

function mousePressed() { // check ô người dùng bấm 
  if (currentPlayer == human) {
      // giá trị cột , dòng mà người dùng chọn
      let i = floor(mouseX / w);
      let j = floor(mouseY / h);
      // kiểm tra xem ô mà người dùng chọn có trống không
      if (board[i][j] == '') {
          board[i][j] = human;
          currentPlayer = ai;
          bestMove();
      }
  }
}

function draw() { // vẽ khung
  background(220);
  strokeWeight(10);
  
  // Vẽ đường chia ô
  line(0, 0, 0, height);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(w * 3, 0, w * 3, height);
  line(0,0,width,0);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  line(0, h * 3, width, h * 3);

  //vẽ chữ O, X 
  for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
          let x = w * i + w / 2;
          let y = h * j + h / 2;
          let spot = board[i][j];
          textSize(32);
          let r = w / 4;
          if (spot == human) { //vẽ O
              noFill();
              ellipse(x, y, r * 2);
          } else if (spot == ai) { // vẽ X
              line(x - r, y - r, x + r, y + r);
              line(x + r, y - r, x - r, y + r);
          }
      }
  }

  let result = checkWinner();
  if (result != null) {
      noLoop();
      let resultP = createP('');
      resultP.style('font-size', '32pt').style('color','red').style('text-align','center').style('margin-top','450px');
      if (result == 'tie') {
          resultP.html('HÒA RỒI! CỐ TÝ NỮA ĐỂ THẮNG NÀO');
      } else if ( result == 'X') {
          resultP.html(`MÁY THẮNG RỒI! THỬ LẠI LẦN NỮA NHÉ @@`);
      } else {
          resultP.html(`BẠN THẮNG! CHÚC MỪNG BẠN <3`);
      }
  }
}
