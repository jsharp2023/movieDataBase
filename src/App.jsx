import MainRouter from "./MainRouter"
import "./App.css"
import {useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import setAxiosAuthToken from "./components/utils/setAxiosAuthToken"


function App() {
  const [user, setUser] = useState(null)

  useEffect(()=> {
    const jwt = window.localStorage.getItem('jwt')//grabs from local storage
    const currentUser = jwt ? jwtDecode(jwt) : null//decodes if exist
    if(currentUser && currentUser.exp > (Date.now()/1000)){//check if expired
      setUser({//set user
        username: currentUser.username,
        email: currentUser.email,
        id: currentUser.id

      })
      console.log(jwt)
      setAxiosAuthToken(jwt)
    }
    
  }, [])

  //login
  const handleUserLogin = (user) => {
    setUser(user)
  }

    //logout
  const handleUserLogout = () => {
    setUser(null)
    window.localStorage.removeItem('jwt')
   setAxiosAuthToken(null)
  }



  return (
    <MainRouter 
    user = {user}
    handleUserLogin = {handleUserLogin}
    handleUserLogout = {handleUserLogout}/>
  )
}

export default App