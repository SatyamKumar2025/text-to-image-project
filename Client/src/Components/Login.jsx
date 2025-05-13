//imports
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [codeSent, setCodeSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  const sendCode = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-code`, {
        email,
      });
      if (data.success) {
        toast.success("Verification code sent!");
        setCodeSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send code");
    }
  };

  const verifyCode = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-code`, {
        email,
        code: codeInput,
      });
      if (data.success) {
        toast.success("Email verified!");
        setEmailVerified(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (state === "Login") {
      try {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.sucess) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Login failed");
      }
    } else {
      if (!emailVerified) {
        toast.error("Please verify your email first.");
        return;
      }

      try {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.sucess) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Registration failed");
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-full max-w-md"
      >
        <h1 className="text-center font-medium text-2xl text-neutral-700">
          {state}
        </h1>
        <p className="text-sm mt-2.5">
          Welcome back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} width={26} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
                className="outline-none text-sm flex-1"
              />
              {!emailVerified && (
                <button
                  type="button"
                  className="text-blue-600 text-sm"
                  onClick={sendCode}
                >
                  Send Code
                </button>
              )}
            </div>

            {codeSent && !emailVerified && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  className="flex-1 border px-4 py-2 rounded-full text-sm"
                />
                <button
                  type="button"
                  className="text-blue-600 text-sm"
                  onClick={verifyCode}
                >
                  Verify
                </button>
              </div>
            )}

            {emailVerified && (
              <>
                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                  <img src={assets.user_icon} width={26} />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Full Name"
                    required
                    className="outline-none text-sm flex-1"
                  />
                </div>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                  <img src={assets.password_icon} width={26} />
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="outline-none text-sm flex-1"
                  />
                </div>
              </>
            )}
          </>
        )}

        {state === "Login" && (
          <>
            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <img src={assets.email_icon} width={26} />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                required
                className="outline-none text-sm flex-1"
              />
            </div>

            <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
              <img src={assets.password_icon} width={26} />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                required
                className="outline-none text-sm flex-1"
              />
            </div>
          </>
        )}

        <button className="bg-blue-600 text-white w-full rounded-full py-2 mt-6">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        <p className="mt-3 text-center">
          {state === "Login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setState("Login")}
              >
                Sign In
              </span>
            </>
          )}
        </p>

        <img
          src={assets.close_icon}
          width={25}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
