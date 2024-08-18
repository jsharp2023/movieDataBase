import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute'

function MainRouter(props) {
  return (
    <Router>
    <Nav handleUserLogout = {props.handleUserLogout} user = {props.user}/>
        <Routes>
            <Route path='/login' 
            element={<Login handleUserLogin = {props.handleUserLogin}/>}/>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path = "/profile" element={
              <PrivateRoute>
              <Profile/>
              </PrivateRoute>
              }/>
        </Routes>
    </Router>
  )
}

export default MainRouter