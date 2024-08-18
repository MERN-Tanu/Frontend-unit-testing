import React, { useState } from 'react'

export const Login = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLoginClick = () => {
        onLogin(username, password);
    }

    return (
        <div>
            <h2 className='text-2xl font-medium mb-4 text-center'>Login Form</h2>
            <form className='flex flex-col gap-3'>
                <input className='px-3 py-1 rounded' type="text" placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='px-3 py-1 rounded' type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='bg-black transition hover:bg-blue-900 mt-3 p-2 treansition rounded font-bold' onClick={handleLoginClick}>Login</button>
            </form>
        </div>
    )
}
