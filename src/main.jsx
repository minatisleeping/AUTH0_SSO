import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { RENDER_API_ENDPOINT } from './utils/constants.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain='dev-gotr6iqppdutb6fm.us.auth0.com'
    clientId='gGkD8KUti3TJCLscxr0mstoirXuMRkzt'
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: RENDER_API_ENDPOINT
    }}
    cacheLocation='localstorage' // default value is 'memory'
  >
    <App />
  </Auth0Provider>
)
