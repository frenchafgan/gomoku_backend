import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { createGame, updateGame, makeMove, restartGame, updateGamesList } from '../redux/game/gameSlice';
import '../styles/Game.css';
import { useNavigate } from 'react-router-dom';
import { saveGameDetails } from '../utils/gameUtils';
import Header from '../components/Header';
import { AppDispatch } from '../redux/store';
import { getGamesList as getGamesListApi } from '../api';  // Update the path according to your project structure





const Game: React.FC = () => {
    const board = useSelector((state: RootState) => state.game.board);
    const currentPlayer = useSelector((state: RootState) => state.game.currentPlayer);
    const gameStatus = useSelector((state: RootState) => state.game.gameStatus);
    const username = useSelector((state: RootState) => state.auth.currentUser);
    const moves = useSelector((state: RootState) => state.game.moves);
    const currentBoardSize = useSelector((state: RootState) => state.game.boardSize);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [gameId, setGameId] = useState<string | null>(null);  // Add this line to hold the game ID
    const token = useSelector((state: RootState) => state.auth.token);  // Get the token from Redux store




    const handleCellClick = (x: number, y: number) => {
        if (board[y][x] === 0 && gameStatus === 'playing') {
            dispatch(makeMove({ x, y }));
            if (gameId) {  // Make sure gameId is available
                dispatch(updateGame({ gameId, gameData: { board, currentPlayer, gameStatus, moves }}));
            }
        }
    }


    const handleLeave = async () => {
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
            const gameData = {
                id: gameId,  // Make sure this is not null
                boardSize: currentBoardSize,
                date: new Date().toISOString(),
                result: winner,
                username: username,
              };
            const action = await dispatch(createGame(gameData));
            if (createGame.fulfilled.match(action)) {
                setGameId(action.payload._id);  // Update the game ID here
            }
            navigate('/games');
        } catch (error) {
            console.error("An error occurred while saving game details:", error);
        }
    };
    
    
    
    
      
    const handleRestartGame = async () => {
        // Check if the game is complete and there's a winner
        if (gameStatus === 'win' || gameStatus === 'draw') {
            let winner: 'Black' | 'White' | 'Draw' | null = null; // Explicitly set the type
    
            if (gameStatus === 'win') {
                winner = currentPlayer === 1 ? 'Black' : 'White';
            } else if (gameStatus === 'draw') {
                winner = 'Draw';
            }
    
            // Save the game details to the database
            try {
                const action = await dispatch(createGame({ 
                    board: board, 
                    winner: winner, 
                    username: username, 
                    moves: moves 
                }));
                
                if (createGame.fulfilled.match(action)) {
                    setGameId(action.payload._id);  // Update the game ID here
                }
            } catch (error) {
                console.error("An error occurred while saving game details:", error);
                return;  // Exit the function if there's an error
            }
        }
    
        // Restart the game
        dispatch(restartGame(currentBoardSize));
    };
    
    

    useEffect(() => {
        const savedBoardSize = localStorage.getItem('boardSize');
        const initialBoardSize = savedBoardSize ? JSON.parse(savedBoardSize) : 10;  // Default to 10 if not set
        dispatch(restartGame(initialBoardSize));
    
        // Function to fetch games list
        const fetchGamesList = async () => {
            try {
                // Check if the token exists before making the API call
                if (token) {
                    const response = await getGamesListApi(token);
                    
                    // Dispatch an action to update the Redux store with the fetched games
                    dispatch(updateGamesList(response.data));
                }
            } catch (error) {
                // Handle the error here
                // For example, you can log the error or show a notification
                console.error("An error occurred while fetching the games list:", error);
            }
        };
    
        // Call the function to fetch games list
        fetchGamesList();
    
        // Add token and dispatch as dependencies
    }, [token, dispatch]);

    
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
