import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "6441799b9b922c5569b13b85",
  //   username: "ran",
  //   email: "ran@gmail.com",
  //   profilePicture: "person/1.jpeg",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   followings: [],
  // },
  user: JSON.parse(localStorage.getItem("user")) || null,
  inFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  // useEffect(() => {
  //   // Load user information from local storage if available
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   console.log("Retrieved user from local storage: ", user);
  //   if (user) {
  //     dispatch({ type: "LOGIN_SUCCESS", payload: user });
  //   }
  // }, []);

  useEffect(() => {
    // Save user information to local storage
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
