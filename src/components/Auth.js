import { useState, useContext } from 'react';
import authContext from '../store/authContext';
import axios from 'axios';

const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(true);

    const authCtx = useContext(authContext);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleClick = () => {
        setRegister(!register);
    }

    const submitHandler = e => {
        e.preventDefault();
        let endpoint;

        if (register) {
            endpoint = 'register';
        } else {
            endpoint = 'login';
        }

        let url = `https://socialmtn.devmountain.com/${endpoint}`;

        axios.post(url, {
            username: username,
            password: password
        })
            .then(res => {
                const { token, exp, userId } = res.data;
                authCtx.login(token, userId, exp);
            })
            .catch(err => console.log(err))

        setPassword('');
        setUsername('');
    }

    return (
        <main>
            <h1>Welcome!</h1>
            <form className='form auth-form' onSubmit={submitHandler}>
                <input
                    className='form-input' type='text' placeholder='Username' value={username} onChange={handleUsernameChange} />
                <input
                    className='form-input' type='text' placeholder='password' value={password} onChange={handlePasswordChange} />
                <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <button onClick={handleClick} className='form-btn'>Need to {register ? 'Login' : 'Sign Up'}?</button>
        </main>
    )
}

export default Auth