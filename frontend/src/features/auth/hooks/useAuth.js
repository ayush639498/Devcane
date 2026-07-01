import { useContext } from "react";
import { AuthContext } from "../services/auth.context";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  updateProfile,
  googleLogin,
  googleRegister,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const {
    user,
    setUser,
    loading,
    setLoading,
    logout: clearUser,
  } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);

      const data = await login({
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);

      const data = await register({
        name,
        email,
        password,
      });

      if (data.success) {
        setUser(data.user);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      const data = await logout();

      clearUser();

      return data;
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleGoogleRegister = () => {
    googleRegister();
  };

  const handleForgotPassword = async (email) => {
    try {
      setLoading(true);

      return await forgotPassword(email);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (token, password) => {
    try {
      setLoading(true);

      return await resetPassword(token, password);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (payload) => {
    try {
      setLoading(true);

      const data = await updateProfile(payload);

      if (data.success) {
        setUser(data.user);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGoogleLogin,
    handleGoogleRegister,
    handleForgotPassword,
    handleResetPassword,
    handleUpdateProfile,
  };
};