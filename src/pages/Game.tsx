import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { makeMove, restartGame } from '../redux/game/gameSlice';
import '../styles/Game.css';
import { useNavigate } from 'react-router-dom';
import { saveGameDetails } from '../utils/gameUtils';
import Header from '../components/Header';


const Game: React.FC = () => {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.game.board);
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayer);
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
    const username = useSelector((state: RootState) => state.auth.currentUser);
    const moves = useSelector((state: RootState) => state.game.moves);
    const currentBoardSize = useSelector((state: RootState) => state.game.boardSize);
    const navigate = useNavigate();

    const handleCellClick = (x: number, y: number) => {
        if (board[y][x] === 0 && gameStatus === 'playing') {
            dispatch(makeMove({ x, y }));
        }
    }


    const handleLeave = () => {
        try {
            let winner: 'Black' | 'White' | 'Draw' | null = null; // Explicitly set the type
    
            if (gameStatus === 'win') {
                winner = currentPlayer === 1 ? 'Black' : 'White';
            } else if (gameStatus === 'draw') {
                winner = 'Draw';
            }
    
            // Only save the game if it is won or a draw
            if (gameStatus === 'win' || gameStatus === 'draw') {
                saveGameDetails(board, winner, username, moves);
            }
            navigate('/games');
        } catch (error) {
            console.error("An error occurred while saving game details:", error);
        }
    };
    
      
    const handleRestartGame = () => {
        dispatch(restartGame(currentBoardSize));
    };

    useEffect(() => {
        const savedBoardSize = localStorage.getItem('boardSize');
        const initialBoardSize = savedBoardSize ? JSON.parse(savedBoardSize) : 10;  // Default to 10 if not set
        dispatch(restartGame(initialBoardSize));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    return (
        <div>
            <Header />
            <main className='container'>
                <h2>Current Player: {currentPlayer === 1 ? 'Black' : 'White'}</h2>
                {gameStatus === 'win' && <h2>Winner: {currentPlayer === 1 ? 'Black' : 'White'}</h2>}
                {gameStatus === 'draw' && <h2>Draw!</h2>}
                <div className="board">
                    {board.map((row, y) => (
                        <div className="row" key={y}>
                            {row.map((cell, x) => (
                                <div 
                                    className={`cell ${cell === 1 ? 'black' : cell === 2 ? 'white' : ''}`} 
                                    key={x}
                                    onClick={() => handleCellClick(x, y)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="controls">
                    <div className="restart">
                    <button onClick={handleRestartGame}>Restart</button>
                    </div>
                    <div className="leave">
                    <button onClick={handleLeave}>Leave</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Game;
