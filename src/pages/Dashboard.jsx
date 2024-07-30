import ReactJson from 'react-json-view'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { RENDER_API_ENDPOINT, LOCAL_API_ENDPOINT } from '../utils/constants'

const Dashboard = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0()
  // console.log('🚀 ~ user:', user)
  // console.log('🚀 ~ isAuthenticated:', isAuthenticated)
  // console.log('🚀 ~ isLoading:', isLoading)
  const [privateUsers, setPrivateUsers] = useState(null)

  useEffect(() => {
    const fetchPrivateUser = async () => {
      const accessToken = await getAccessTokenSilently()
      // console.log('🚀 ~ accessToken:', accessToken)
      
      // const res = await axios.get(`${LOCAL_API_ENDPOINT}/api-v1/users/private/get-all`, {
      //   headers: { Authorization: `Bearer ${accessToken}` }
      // })
      const res = await axios.get(`${RENDER_API_ENDPOINT}/api-v1/users/private/get-all`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      setPrivateUsers(res.data)
    }
    fetchPrivateUser()
  }, [getAccessTokenSilently])

  console.log('🚀 ~ privateUsers:', privateUsers)

  if (!isAuthenticated) return null

  return (
    <div className='dashboard'>
      <div className='user-from-auth0'>
        <div className='title'>Current user from Auth0:</div>
        <div className='preview-user'>
          {isLoading 
            ? <div className='loading'>Loading...</div>
            : <>
                <img className='user-avatar' src={user?.picture} alt={user.name} />
                <div className='user-info'>
                  <p>Sub: <span className='value'>{user?.sub}</span></p>
                  <p>Email: <span className='value'>{user?.email}</span></p>
                  <p>Name: <span className='value'>{user?.name}</span></p>
                </div>
              </>
          }
        </div>
        {user &&
          <div className='more-info'>
            <ReactJson
              enableClipboard={false}
              collapsed={true}
              theme={'google'}
              src={user}
            />
          </div>
        }
        
      </div>

      <div className='user-from-our-database'>
        <div className='title'>
          All users from our database:&nbsp;
          <span className='highlight'>{privateUsers?.length}</span>
        </div>
        <img className='user-avatar' src={'https://trungquandev.com/wp-content/uploads/2020/08/logo-trungquandev-white-bg.jpg'} alt={'trungquandev'} />
        { !privateUsers
          ? <div className='loading'>Loading...</div>
          : <div className='more-info'>
              <ReactJson
                enableClipboard={false}
                collapsed={true}
                theme={'google'}
                src={privateUsers}
              />
            </div>
        }
      </div>
    </div>
  )
}

export default Dashboard
