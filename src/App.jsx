import './App.css'
import Dashboard from './pages/Dashboard'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="app-container">
      <div className="fixed-box">
        <h1>Auth0 SSO | Minatisleeping</h1>
        <div className="actions">
          { isLoading
            ? <div className='loading'>Loading..</div>
            : (!isAuthenticated ? <LoginButton /> : <LogoutButton />)
          }
        </div>
        {/* Phần dashboard sau khi đăng nhập */}
        <Dashboard />
      </div>      
    </div>
  )
}

export default App
