import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { type } from "./../../../node_modules/react-otp-input/lib/index.d";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { signupData, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
  })

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }

  return (
    <div className="text-white flex items-center justify-center ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to you, Enter the code below</p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (<input {...props} placeholder="-"
                className="w-full p-6 bg-richblack-600 text-white"
              />)}
            />
            <button type="submit">verify Email</button>
          </form>

          <div>
            <Link to="/login">
              <p>Back to Login</p>
            </Link>
          </div>

          <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
            Resent Otp
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;





