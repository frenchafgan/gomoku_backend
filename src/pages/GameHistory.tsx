import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Header from '../components/Header';
import GameHistoryRow from '../components/GameHistoryRow';
import '../styles/GameHistory.css';


interface GameLog {
  id: number;
  dateAndTime: string;
  winner: 'Black' | 'White' | null;
  username: string;
}

  const GameHistory: React.FC = () => {
    // const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  
    // Retrieve all games from localStorage and explicitly type them
    const allGames: GameLog[] = JSON.parse(localStorage.getItem('games') || '[]');
    console.log("Retrieved games:", allGames);
  
    // Filter the games based on the currently logged-in user
    const userGameLogs = allGames.filter((game: GameLog) => game.username === currentUser);
    console.log("Filtered games for user:", userGameLogs);  
  
    return (
      <div> 
        <Header />
        <main className='game-history-container'> 
          {userGameLogs.map((game: any, index) => (      

            
            <GameHistoryRow 
              key={game.id || index}    
              id={game.id}
              dateAndTime={new Date(game.dateAndTime)}
              winner={game.result}
            />
          ))}
          {userGameLogs.length === 0 && <p>No game logs found.</p>}
        </main>
      </div>
    );
  }
  
  export default GameHistory;