import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/auth/authSlice';  // Import the signUp action
import Header from '../components/Header';
import '../styles/SignUp.css';
import { AppDispatch } from '../redux/store';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch: AppDispatch = useDispatch<AppDispatch>();  // Explicitly type dispatch

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
        dispatch(signUp({ username, password }));
        } else {
        // Show some error message
        }
    };


return (
    <div>
        <Header />
        <main className="signup-main">
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            </div>
            <button type="submit">Sign Up</button>
        </form>
        </main>
    </div>
    );
      
};

export default SignUp;
