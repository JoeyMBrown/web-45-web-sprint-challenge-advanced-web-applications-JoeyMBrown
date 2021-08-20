import React, {useState} from "react";
import { useHistory } from "react-router";
import axios from 'axios';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const {push} = useHistory();

  const [formValues, setFormValues ] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  function handleInputChange(e) {
    const valueToUpdate = e.target.id;
    
    valueToUpdate === 'username' ? setFormValues({...formValues, username: e.target.value}) : setFormValues({...formValues, password: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formValues.username === 'Lambda' && formValues.password === 'School') {
      axios.post("http://localhost:5000/api/login", formValues)
      .then((res) =>{
        localStorage.setItem('token', res.data.payload)
        push('/bubbles-page')
      })
      .catch((err) => console.log(err))
    } else {
      const newFormValues = {
        username: "",
        password: ""
      }
      setError('Username or Password not valid.')
      return setFormValues(newFormValues);
    }
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Login</h2>
        <form>
          <label htmlFor='username'>Username: </label>
          <input type='text' placeholder='Username' id='username' value={formValues.username} onChange={handleInputChange}/>

          <label htmlFor='password'>Password: </label>
          <input type='password' placeholder='Password' id='password' value={formValues.password} onChange={handleInputChange}/>

          <button id='submit' type='submit' onClick={handleSubmit}> Login </button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"