import { useState, useEffect } from "react"
import Axios from "../utils/Axios"

function Profile() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

 
    const getUserData = async () =>{
        try {
            console.log(Axios)
           const foundUser = await Axios.get('/api/user/get-user')
           if(foundUser){
            console.log(foundUser.data.payload)
           } 
           console.log('no good')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserData()
    }, [])
    return (
    <div>
        <div className="update-container">
            <h3>Update Profile</h3>
            <form>
                <div className="input-div">
                    <input 
                        placeholder='First Name'
                        value={firstName} 
                        name = "firstName"
                        onChange={e=>setFirstName(e.target.value)}/>
                </div>
                <div className="input-div">
                    <input 
                        placeholder='Last Name'
                        value={lastName} 
                        name = "lastName"
                        onChange={e=> setLastName(e.target.value)}/>
                </div>
                <div className="input-div">
                    <input 
                        placeholder='Username'
                        value={username} 
                        name = "username"
                        onChange={e=> setUsername(e.target.value)}/>
                </div>
                <div className="input-div">
                    <input 
                        placeholder='Email'
                        value={email} 
                        name = "email"
                        onChange={e=> setEmail(e.target.value)}/>
                </div>
            </form>
        </div>
      </div>
  )
}

export default Profile