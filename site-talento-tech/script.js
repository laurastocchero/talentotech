const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let isXNext = true;
let board = Array(9).fill(null);

function handleClick(e) {
    const index = Array.from(cells).indexOf(e.target);
    if (board[index] || checkWinner()) return;
    board[index] = isXNext ? 'X' : 'O';
    e.target.textContent = board[index];
    isXNext = !isXNext;
    const winner = checkWinner();
    if (winner) {
        setTimeout(() => alert(`Jogador ${winner} venceu!`), 10);
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Adiciona a classe 'winner' às células vencedoras
            combo.forEach(index => cells[index].classList.add('winner'));
            return board[a];
        }
    }
    return null;
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner'); // Remove a classe 'winner' ao resetar o jogo
    });
    isXNext = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
