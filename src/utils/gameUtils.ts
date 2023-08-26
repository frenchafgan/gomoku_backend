interface Move {
  x: number;
  y: number;
  color: string;
  order: number;
}


export const saveGameDetails = (board: number[][], winner: 'Black' | 'White' | 'Draw' | null, currentUser: string | null, moves: Move[]) => {
  // Retrieve the existingGames from local storage
  const existingGames = JSON.parse(localStorage.getItem('games') || '[]');

  // Retrieve the last used ID for the current user
  const lastGameForCurrentUser = existingGames.filter((game: any) => game.username === currentUser).sort((a: any, b: any) => b.id - a.id)[0];

  // Generate a new ID based on the last used ID for the current user
  const newGameId = lastGameForCurrentUser ? lastGameForCurrentUser.id + 1 : 1;

  const gameDetails = {
    id: newGameId,
    boardSize: board.length,
    date: new Date().toISOString(),
    result: winner ? winner : 'Draw',
    moves: moves,
    username: currentUser
  };

  // console.log("Game details:", gameDetails);
  // console.log("Winner is:", gameDetails.result);

  // Add the new game to the list of existing games
  existingGames.push(gameDetails);
  
  // console.log("Saving game details:", gameDetails);
  
  // Save the updated games list back to local storage
  localStorage.setItem('games', JSON.stringify(existingGames));
};


export const saveMove = (x: number, y: number, color: string, order: number) => {
  const move: Move = { x, y, color, order };
  return move;
};

export const createMove = (x: number, y: number, currentPlayer: number, order: number): Move => {
  return {
      x,
      y,
      color: currentPlayer === 1 ? 'black' : 'white',
      order
  };
};

export const checkWin = (board: number[][], x: number, y: number, currentPlayer: number): boolean => {
    const directions: [number, number][] = [
      [1, 0], // Horizontal
      [0, 1], // Vertical
      [1, 1], // Diagonal \
      [1, -1] // Diagonal /
    ];
  
    for (let [dx, dy] of directions) {
      let count = 1; 
  
      // Check in the positive direction
      for (let i = 1; i < 5; i++) {
        if (board[y + dy * i] && board[y + dy * i][x + dx * i] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }
  
      // Check in the negative direction
      for (let i = 1; i < 5; i++) {
        if (board[y - dy * i] && board[y - dy * i][x - dx * i] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }
  
      if (count >= 5) return true;
    }

    return false;
  };

  
  export const isDraw = (board: number[][]): boolean => {
    for (let row of board) {
      for (let cell of row) {
        if (cell === 0) {
          return false;
        }
      }
    }
    return true;
  };
  
