import toast from "react-hot-toast";
import { setLoading, setToken } from "../../Slices/authSlice"
import { apiConnector } from "../apiconnector";
import { setUser } from "../../Slices/profileSlice";




export function signUp() {

}

export function login(email, password, navigate) {

}


export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out")
    navigate("/")
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email })
      console.log("RESET PASSWORD TOKEN RESPONSE.....", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR");
      toast.error("unable to find the user")
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
      console.log("RESET PASSWORD RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
    } catch (error) {

    }
    dispatch(setLoading(false));
  }
}
