import { Route,  } from 'react-router-dom'
import { useContext } from 'react'
// import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    // let {user} = useContext(AuthContext)
    console.log('private works fine')
    return(
        // <Route {...rest}>{<Redirect to="/login" /> }</Route>
        console.log('private works fine')
    )
}

export default PrivateRoute;