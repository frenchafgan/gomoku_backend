import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkWin, isDraw } from '../../utils/gameUtils';

interface Move {
  x: number;
  y: number;
  color: string;
  order: number;
}

interface GameState {
    board: number[][];
    currentPlayer: number;
    gameStatus: 'playing' | 'draw' | 'win';
    boardSize: number; 
    currentUser: string | null;
    moves: Move[];
}

const initialBoard = Array.from({ length: 20 }, () => Array(20).fill(0));
const savedBoardSize = localStorage.getItem('boardSize');
const initialBoardSize = savedBoardSize ? JSON.parse(savedBoardSize) : 10;  // Default to 10 if not set
const moves: Move[] = [];

const initialState: GameState = {
  board: initialBoard,
  currentPlayer: 1,
  gameStatus: 'playing',
  boardSize: initialBoardSize,
  currentUser: null,
  moves: moves 
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove(state, action: PayloadAction<{ x: number; y: number }>) {
        const { x, y } = action.payload;
        if (state.board[y][x] === 0) {
            state.board[y][x] = state.currentPlayer;
    
            // Record the move
            const moveColor = state.currentPlayer === 1 ? 'black' : 'white';
            state.moves.push({ x, y, color: moveColor, order: state.moves.length + 1 });
        
            if (checkWin(state.board, x, y, state.currentPlayer)) {
                state.gameStatus = 'win';
            } else if (isDraw(state.board)) {
                state.gameStatus = 'draw';
            } else {
                state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
            }
        }
    },
    
    setBoardSize(state, action: PayloadAction<number>) {
      const size = action.payload;
      state.board = Array.from({ length: size }, () => Array(size).fill(0));
    },

    restartGame: (state, action: PayloadAction<number>) => {
      // You can now use action.payload as the board size
      const savedBoardSize = localStorage.getItem('boardSize');
      const boardSize = savedBoardSize ? JSON.parse(savedBoardSize) : action.payload;
    
      // Reset the board while keeping the size
      state.board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
      
      // Reset the player and game status
      state.currentPlayer = 1;
      state.gameStatus = 'playing';
      state.moves = [];
    },
    
  
  },
  
});

export const { makeMove, restartGame, setBoardSize } = gameSlice.actions;
export default gameSlice.reducer;
