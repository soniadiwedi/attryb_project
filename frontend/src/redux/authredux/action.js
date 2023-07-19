import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actinType"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = (token) => {
  return { type: LOGIN_SUCCESS, payload: token };
};

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
});

export const logoutData=()=>{
  return {type:LOGOUT}
}

export const Signupfun = (user,navigate) => async (dispatch) => {
  // dispatch(signupRequest())
  try {
    let res = await axios.post(
      `https://frightened-flannel-shirt-ox.cyclic.app/user/signin`,
      user
    );
    console.log("res", res);
    dispatch(signupSuccess(res.data))
    toast.success(res.data.msg);
    navigate("/login")
  } catch (err) {
    dispatch(signupFailure())
    toast.error(err);
    console.log(err.message);
  }
};

export const loginFun = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/user/login",
      {
        email,
        password,
      }
    );

    const { token } = response.data;
    // console.log(token)
    localStorage.setItem("token", JSON.stringify(token));
    dispatch(loginSuccess(response.data));
    toast.success(response.data.msg);
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error(error.message);
    console.log(error.message);
  }
};


