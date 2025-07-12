import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/user.context";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Login successful!");
        navigate("/home");
      })
      .catch((err) => {
        const errorData =
          err.response?.data?.errors ||
          err.response?.data?.error ||
          "Something went wrong";

        if (Array.isArray(errorData)) {
          errorData.forEach((errObj) => {
            toast.error(errObj.msg || "An error occurred");
          });
        } else {
          toast.error(errorData);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E293B] px-4">
      <div className="w-full max-w-sm bg-[#27374D] text-[#DDE6ED] rounded-xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">
          User Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#DDE6ED] py-2 px-1 focus:outline-none focus:border-blue-500 placeholder-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#DDE6ED] py-2 px-1 focus:outline-none focus:border-blue-500 placeholder-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full mt-4 py-2 bg-[#DDE6ED] text-[#27374D] font-semibold rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
