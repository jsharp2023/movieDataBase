import { useState } from "react";
import axios from 'axios';

function SignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/sign-up', {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      });
      // Clear the form
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      console.log(response.data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-text">Sign Up</div>
      <div className="form-div">
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="form-group-block">
          <div className="block-container">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="block-container">
              <label htmlFor="lastName">lastName</label>
              <input
                type="text"
                id="Last Name"
                placeholder="Last Name"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>
            <div className="block-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              />
            </div>
          </div>
          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
          <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
            <div className="form-group-block">
            <div className="block-container">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
          </div>
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
