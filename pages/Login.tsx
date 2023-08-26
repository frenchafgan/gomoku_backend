import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { login } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ username, password }));
    }

    useEffect(() => {
        if (isAuthenticated) {
          navigate('/');
        }
      }, [isAuthenticated, navigate]);


      return (
        <div >
            <Header />
            <main className="login-main">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        className="login-input"
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        className="login-input"
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="login-button" type="submit">Login</button>
                    {error && <p className="login-error">{error}</p>}
                </form>
            </main>
        </div>
    );
};

export default Login;