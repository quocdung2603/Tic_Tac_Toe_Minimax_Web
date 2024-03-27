let w; // = width / 3;
let h;
let board = [];
// Tạo bảng 100x100 với các phần tử rỗng
for (let i = 0; i < 15; i++) {
    let row = [];
    for (let j = 0; j < 15; j++) {
        row.push('');
    }
    board.push(row);
}


let human = "X";
let ai = "O";
let currentPlayer = human;
function setup() {
    let cv = createCanvas(1000, 1000);
    cv = cv.position(windowWidth / 2 - 500, windowHeight / 2 - 500);
    w = width / 15;
    h = height / 15;
    // bestMove();
}
function mousePressed() {
    if (currentPlayer == human) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        if (board[i][j] == '') {
            board[i][j] = human;
            //currentPlayer=ai;
            bestMove();
        }
    }
}

function equals5(a, b, c, d, e) {
    return a == b && b == c && a == d && a == e && a != '';
}
function kiemTraDuongCheoLienTiep(x, y) {
    // Kiểm tra hàng ngang
    if (equals5(board[x][y], board[x][y + 1], board[x][y + 2], board[x][y + 3], board[x][y + 4]))
        return board[x][y];

    //Kiểm tra hàng dọc
    if (equals5(board[x][y], board[x + 1][y], board[x + 2][y], board[x + 3][y], board[x + 4][y]))
        return board[x][y];

    //Kiểm tra chéo chính
    if (equals5(board[x][y], board[x + 1][y + 1], board[x + 2][y + 2], board[x + 3][y + 3], board[x + 4][y + 4]))
        return board[x][y];

    //Kiểm tra chéo phụ
    if (equals5(board[x][y], board[x + 1][y - 1], board[x + 2][y - 2], board[x + 3][y - 3], board[x + 4][y - 4]))
        return board[x][y];
    return false;
}
function checkWinner() {
    let winner = null;

    // Kiểm tra các hàng và cột
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (equals5(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3], board[i][j + 4])) {
                winner = board[i][j];
            }
            if (equals5(board[j][i], board[j + 1][i], board[j + 2][i], board[j + 3][i], board[j + 4][i])) {
                winner = board[j][i];
            }
        }
    }

    // Kiểm tra các đường chéo
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (equals5(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2], board[i + 3][j + 3], board[i + 4][j + 4])) {
                winner = board[i][j];
            }
            if (equals5(board[i][9 - j], board[i + 1][8 - j], board[i + 2][7 - j], board[i + 3][6 - j], board[i + 4][5 - j])) {
                winner = board[i][9 - j];
            }
        }
    }

    let openSpots = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
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

function draw() {
    background(220);
    strokeWeight(4);
    //Vẽ đường từ trên xuống
    for (let i = 5; i < 11; i++) {
        line(w * i, h * 5, w * i, height - w * 5);
    }
    //Vẽ trục dọc
    for (let i = 5; i < 11; i++) {
        line(w * 5, h * i, width - h * 5, h * i);
    }

    for (let j = 5; j < 10; j++) {
        for (let i = 5; i < 10; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = board[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == human) {
                noFill();
                ellipse(x, y, r * 2);
            } else if (spot == ai) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }
        }
    }
    let result = checkWinner();
    if (result != null) {
        noLoop();
        alert("End game");
    }
}