import { useRef } from "react";
import "./login.css";
import {loginCall} from "../../apiCalls";
import { useContext } from "react";
import {AuthContext } from "../../context/AuthContext"
import { CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { white } from '@mui/material/colors';
// const theme = createTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: white[500],
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#fff',
//     },
//   },
// });

function Login() {
  
  // how are we going to handle the form submission?
  // can also use usestate but every time you type it will rerender you should prevent that as much as you can
  const email = useRef();
  const password = useRef();
  const {  user,isFetching,error, dispatch} = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({
      email:email.current.value, password:password.current.value
    },dispatch)
  };
  console.log(user);
  

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">Lamasocial</div>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput"  required ref={email}/>
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              className="loginInput" required ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ?<CircularProgress color= "secondary" size="20px" />:"Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching ? <CircularProgress color= "secondary" size="20px" /> :"Create a New Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
