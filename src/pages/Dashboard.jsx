import ReactJson from 'react-json-view'
import { useAuth0 } from '@auth0/auth0-react'

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log('🚀 ~ user:', user)
  console.log('🚀 ~ isAuthenticated:', isAuthenticated)
  console.log('🚀 ~ isLoading:', isLoading)

  if (!isAuthenticated) return null

  return (
    <div className='dashboard'>
      <div className='user-from-auth0'>
        <div className='title'>User from Auth0:</div>
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
        <div className='title'>User from our database:</div>
        <div className='preview-user'>
          {/* <div className='loading'>Loading...</div> */}
          <img className='user-avatar' src={'https://Minatisleeping.com/wp-content/uploads/2024/03/white-bg-main-avatar-circle-min-Minatisleeping-codetq-375.jpeg'} alt={'Minatisleeping'} />
          <div className='user-info'>
            <p>ID: <span className='value'>random-108184243235574894333</span></p>
            <p>Email: <span className='value'>Minatisleeping@gmail.com</span></p>
            <p>Name: <span className='value'>Minatisleeping</span></p>
          </div>
        </div>
        <div className='more-info'>
          <ReactJson
            enableClipboard={false}
            collapsed={true}
            theme={'google'}
            src={{
              'given_name': 'Ragdoll',
              'family_name': 'Cats',
              'nickname': 'quanlightning2',
              'name': 'Minatisleeping',
              'picture': 'https://Minatisleeping.com/wp-content/uploads/2024/03/white-bg-main-avatar-circle-min-Minatisleeping-codetq-375.jpeg',
              'updated_at': '2024-07-10T09:59:37.603Z',
              'email': 'quanlightning2@gmail.com',
              'email_verified': true,
              'sub': 'google-oauth2|108184243235574894333'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
