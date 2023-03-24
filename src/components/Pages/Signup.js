import { BACK_Url } from "../utils/Img";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    const emailref = useRef();
  const passwordref = useRef();
  const confirmPasswordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailref.current.value;
    const enteredPassword = passwordref.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredConfirmPassword !== enteredPassword) {
        alert("password is not matched");
      }

      fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb1PyhtvnCUfBwxNI7BihjOf_XBkn5mXU", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
       
        if (response.ok) {
          
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;

              throw new Error(errorMessage);
            }

            console.log(data);
          });
        }
      })
      .then((data) => {
        
        
        
        
       
        alert("signUp successful");
       
      })
      .catch((error) => {
        alert(error.message);
      });
  }

    return (
       <>
      <div className="relative w-full h-screen bg-zinc-600">
        <img className="absolute w-full h-full object-cover mix-blend-overlay " src={BACK_Url} alt="/"/>
      <div className="flex flex-col items-center justify-center pt-32 pb-32   ">
       
        <div className="px-10 py-10 text-left bg-white border-2 border-indigo-300 shadow-2xl pl-28 pr-28 rounded-2xl">
          <h3 className="text-2xl font-bold text-center">
           SignUp
          </h3>
          <form onSubmit={submitHandler} >
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  ref ={emailref}
                  className="w-full relative px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="on"
                  placeholder="******"
                  ref={passwordref}
                  className="w-full relative px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="on"
                  placeholder="******"
                  ref={confirmPasswordRef}
                  className="w-full relative px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
              <div className="flex justify-center">
                <button className="px-6 py-2 mt-4 relative text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  SignUp
                </button>
               
                  
              </div>
              <div className="relative flex justify-center p-2">
                <h3>Existing User ?? <Link to="/login" className="text-blue-800 hover:underline">login here</Link></h3>
               </div>
              
            </div>
          </form>
        </div>
      </div>
      </div>
       </>
    )
}

export default Signup;