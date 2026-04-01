import React, { useState } from "react";
import NameInput from "../components/NameInput";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import AuthHeader from "../components/AuthHeader";
import EncryptionBadge from "../components/EncryptionBadge";
import Username from "../components/Username";
import { registerService } from "../api/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerService(formData);
      setMessage(res.message);
      setTimeout(() => {
        setMessage("");
        naviagate("login");
      }, 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f7fd] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-50 rounded-full blur-3xl opacity-50" />

      <AuthHeader header={"Join the ethereal workspace."} />

      <div className="w-full max-w-md bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-10 z-10 border border-white/50">
        {error ? <p className="text-red-600 text-center">{error}</p> : ""}
        {message ? <p className="text-green-500 text-center">{message}</p> : ""}
        <form className="space-y-6">
          <NameInput handleChange={handleChange} value={formData.name} />
          <EmailInput handleChange={handleChange} value={formData.email} />
          <Username handleChange={handleChange} value={formData.username} />
          <PasswordInput
            handleChange={handleChange}
            value={formData.password}
          />

          <button
            className="w-full bg-[#5c586d] hover:bg-[#4a4658] text-white font-bold py-5 rounded-3xl shadow-xl shadow-purple-200 transition-all active:scale-[0.98] mt-4"
            onClick={(e) => {
              e.preventDefault();
              setError("");
              handleRegister();
            }}
          >
            {loading ? "Registering" : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-[#8e8ba2]">
          Already have an account?{" "}
          <a href="/login" className="text-[#4a4658] font-bold hover:underline">
            Login
          </a>
        </div>
        <EncryptionBadge />
      </div>

      <div className="mt-12 text-center max-w-xs">
        <p className="text-[10px] text-[#a19fb1] leading-relaxed">
          By joining, you agree to Fluid Chat's{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          . We ensure your data is as secure as a whisper in a dream.
        </p>
      </div>
    </div>
  );
};

export default Register;
