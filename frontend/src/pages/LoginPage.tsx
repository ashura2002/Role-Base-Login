import { KeyRound, MailCheck, Loader2, Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useContext, useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LoadingContext from "../contexts/LoadingContext";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

export interface TokenPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const LoginPage = () => {
  const context = useContext(LoadingContext);
  if (!context) return <div>Loading...</div>;
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { loading, setLoading } = context;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill up all input");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        localStorage.setItem("email", decoded.email);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("firstName", decoded.firstName);
        localStorage.setItem("lastName", decoded.lastName);

        if (
          decoded.role === "admin" ||
          decoded.role === "hr" ||
          decoded.role === "program_head" ||
          decoded.role === "president"
        ) {
          navigate("/admin-homepage");
        } else {
          navigate("/client-homepage");
        }

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data?.message
        })
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong try again later!'
        })
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="bg-zinc-900 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 w-[400px] shadow-lg shadow-black/50">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Email</label>
            <div className="flex items-center gap-2 bg-zinc-800 border 
            border-zinc-700 rounded-xl px-3 py-2 focus-within:border-zinc-400 transition">
              <MailCheck className="text-zinc-400" size={18} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Password</label>
            <div className="flex items-center gap-2 bg-zinc-800 border
             border-zinc-700 rounded-xl px-3 py-2 focus-within:border-zinc-400 transition">
              <KeyRound className="text-zinc-400" size={18} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-sm"
              />
              {showPassword ? (
                <EyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <Eye onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-xl mt-2 p-2.5 font-medium transition duration-200
              ${loading
                ? "bg-zinc-700 cursor-not-allowed"
                : "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
