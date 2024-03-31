document.addEventListener("DOMContentLoaded", function() {
    const board = document.querySelector('.game-board');
    let currentPlayer = 'X';
    let gameOver = false;

    // Initialize game board
    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', cellClick);
            board.appendChild(cell);
        }
    }

    function cellClick() {
        if (gameOver) return;
        if (this.textContent !== '') return;
        
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer.toLowerCase());

        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWin() {
        const cells = document.querySelectorAll('.cell');
        const boardSize = 50;

        // Check rows
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j <= boardSize - 5; j++) {
                const startIndex = i * boardSize + j;
                const row = [];
                for (let k = 0; k < 5; k++) {
                    row.push(cells[startIndex + k].textContent);
                }
                if (checkLine(row)) {
                    return true;
                }
            }
        }

        // Check columns
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j <= boardSize - 5; j++) {
                const startIndex = i + j * boardSize;
                const col = [];
                for (let k = 0; k < 5; k++) {
                    col.push(cells[startIndex + k * boardSize].textContent);
                }
                if (checkLine(col)) {
                    return true;
                }
            }
        }

        // Check diagonals
        for (let i = 0; i <= boardSize - 5; i++) {
            for (let j = 0; j <= boardSize - 5; j++) {
                const startIndex = i * boardSize + j;
                const diagonal1 = [];
                const diagonal2 = [];
                for (let k = 0; k < 5; k++) {
                    diagonal1.push(cells[startIndex + k * (boardSize + 1)].textContent);
                    diagonal2.push(cells[startIndex + (4 - k) * (boardSize - 1)].textContent);
                }
                if (checkLine(diagonal1) || checkLine(diagonal2)) {
                    return true;
                }
            }
        }

        return false;
    }

    function checkLine(line) {
        const symbol = line[0];
        if (symbol === '') {
            return false;
        }
        for (let i = 1; i < 5; i++) {
            if (line[i] !== symbol) {
                return false;
            }
        }
        return true;
    }

    function checkDraw() {
        const cells = document.querySelectorAll('.cell');
        for (const cell of cells) {
            if (cell.textContent === '') {
                return false;
            }
        }
        return true;
    }
});
