import './App.css'
import Dashboard from './pages/Dashboard'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'
import { injectFn } from './utils/customAxios'
import { useEffect } from 'react'

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  injectFn(getAccessTokenSilently)

  // Kiểm tra trạng thái đăng nhập SSO: chỉ chạy 1 lần khi khởi tạo App
  useEffect(() => {
    const checkSSO = async () => {
      try {
        await getAccessTokenSilently()
      } catch (error) {
        console.log('🚀 ~ error:', error)
        // Điều hướng tới login page(tuỳ spec)
        // loginWithRedirect()
      }
    }
    checkSSO()
  }, []) // eslint-disable-line

  return (
    <div className="app-container">
      <div className="fixed-box">
        <h1>Auth0 SSO - 01 | minat</h1>
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
