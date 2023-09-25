import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import {logout} from '../redux/auth/authSlice';
import '../styles/Header.css';  

const Header: React.FC = () => {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());  
        };

    

    return (
        <header className="header-container">
            <Link to="/" className="gomoku-header">GOMOKU</Link>
            
            <div className="header-actions">
                {!isAuthenticated && <Link to="/login" className="header-link">Login</Link>}
                {!isAuthenticated && <Link to="/games" className="header-link">Previous Games</Link>}
                {isAuthenticated && <Link to="/login" className="header-link">Login</Link>}
                {isAuthenticated && <Link to="/games" className="header-link">Previous Games</Link>}
            <div className="logout-button">
                {isAuthenticated && <button onClick={handleLogout} className="header-link">Logout</button>}  {/* Logout button */}
            </div>
            </div>
        </header>
    );
}

export default Header;
