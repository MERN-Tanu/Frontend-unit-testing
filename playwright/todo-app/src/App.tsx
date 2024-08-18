import { useState } from 'react'
import { TodoList } from './components/TodoList'
import { Login } from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<string>(localStorage.getItem('isLoggedIn') ?? '');

  const handleLogout = () => {
    setIsLoggedIn('false');
    localStorage.setItem('isLoggedIn', 'false')
  }

  const handleLogin = (username: string, password: string) => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn('true');
      localStorage.setItem('isLoggedIn', 'true')
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {
        isLoggedIn === 'true' ? (
          <>
            <button className='absolute top-10 right-20 bg-zinc-900 px-3 py-2 rounded text-sm font-medium' onClick={handleLogout}>Logout</button>
            <TodoList />
          </>
        ) :
          <Login onLogin={handleLogin} />
      }
    </div>
  )
}

export default App
