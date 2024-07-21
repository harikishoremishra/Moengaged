import { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useContext(AuthContext);

    const onSubmit = async e => {
        e.preventDefault();
        await signup(username, password);
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Signup</h2>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
