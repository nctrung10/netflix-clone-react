import { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

import useInput from '../hooks/use-input';
import { UserAuth } from '../store/auth-context';
import Footer from '../components/Footer';
import { validateEmail, validatePassword } from '../utils/validation';
import { CgSpinner } from 'react-icons/cg';

const Signup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler
  } = useInput(validateEmail);
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler
  } = useInput(validatePassword);

  // If user is logged in, then can not access this page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const formIsValid = emailIsValid && passwordIsValid;

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    if (!formIsValid) return;

    try {
      await signUp(email, password);
      navigate('/browser');
    } catch (error: any) {
      setError(error.message.slice(10));
    }

    setLoading(false);
  };

  const submitBtn = loading ? (
    <>
      <CgSpinner className="animate-spin h-6 w-6 mr-2" /> Processing...
    </>
  ) : 'Sign Up';

  return (
    <div className="w-full h-screen">
      <div className="bg-black/50 fixed top-0 left-0 w-full h-screen"></div>
      <img
        className="hidden sm:block fixed w-full h-full object-cover -z-10"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/aa02ddf2-423e-4abb-929d-5ba8d950cad4/VN-en-20230612-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="/"
      />
      <div className="absolute w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white rounded-sm">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold mb-7">Sign Up</h1>
            {error && <p className="bg-red-400 p-3 mb-4">{error}</p>}

            <form onSubmit={submitHandler} className="flex flex-col">
              <div className="mb-4">
                <input
                  className={`bg-[#333] w-full h-[50px] rounded p-3 outline-none ${emailHasError && 'border-b-2 border-[#e87c03]'}`}
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                {emailHasError && <p className="text-[#e87c03] text-sm p-1">Please enter a valid email.</p>}
              </div>
              <div className="mb-4 relative">
                <input
                  className={`bg-[#333] w-full h-[50px] rounded p-3 outline-none ${passwordHasError && 'border-b-2 border-[#e87c03]'}`}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                {passwordHasError && <p className="text-[#e87c03] text-sm p-1">Your password must contain between 6 and 60 characters.</p>}
              </div>

              <button
                className="flex items-center justify-center bg-[#e50914] font-bold h-12 rounded p-4 mt-6 mb-3 disabled:bg-red-400 disabled:cursor-not-allowed"
                disabled={!formIsValid || loading}
              >
                {submitBtn}
              </button>

              <p className="text-[13px] text-gray-400 hover:underline cursor-pointer">Need help?</p>
            </form>
            <div className="mt-14 text-gray-400">
              Already subcribed to Netflix?
              <Link to='/login' className="ml-1 text-white hover:underline">Sign in.</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;