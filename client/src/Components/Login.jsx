import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Config } from '../../URL/Config';
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import api from '../../URL/CustomApi';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();
    const { setAuth, setUser, checkAuth } = useContext(AuthContext);

    const Submit = async (data) => {
        setErrors("");
        setIsLoading(true);
        try {
            const response = await api.post(Config.LOGINUrl, {
                email: data.email,
                password: data.password
            });
            if (response) {
                await checkAuth();
                navigate("/HomePage");
            }
        } catch (error) {
            setErrors(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setIsLoading(true);
            setErrors("");
            const userInfoResponse = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
            );
            const googleUser = userInfoResponse.data;
            const response = await api.post(Config.GoogleSignUpUrl, {
                email: googleUser.email,
                name: googleUser.name,
                googleId: googleUser.sub,
                picture: googleUser.picture
            });
            if (response.data) {
                await checkAuth();
                navigate("/HomePage");
            }
        } catch (error) {
            setErrors(error.response?.data?.message || "Failed to login with Google");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => setErrors("Failed to login with Google")
    });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                .login-root { font-family: 'DM Sans', sans-serif; }
                .login-title { font-family: 'Syne', sans-serif; }
                .glow-orb-1 {
                    position: absolute; width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
                    border-radius: 50%; top: -100px; left: -100px; pointer-events: none;
                    animation: floatOrb 8s ease-in-out infinite;
                }
                .glow-orb-2 {
                    position: absolute; width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%);
                    border-radius: 50%; bottom: -80px; right: -80px; pointer-events: none;
                    animation: floatOrb 10s ease-in-out infinite reverse;
                }
                .glow-orb-3 {
                    position: absolute; width: 200px; height: 200px;
                    background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
                    border-radius: 50%; top: 50%; right: 10%; pointer-events: none;
                    animation: floatOrb 12s ease-in-out infinite;
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-30px) scale(1.05); }
                }
                .glass-card {
                    background: rgba(18, 18, 26, 0.85);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(124,58,237,0.3);
                    box-shadow: 0 0 60px rgba(124,58,237,0.15), 0 32px 64px rgba(0,0,0,0.5);
                }
                .input-field {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(124,58,237,0.25);
                    color: #f1f5f9;
                    transition: all 0.3s ease;
                }
                .input-field:focus {
                    outline: none;
                    border-color: rgba(168,85,247,0.7);
                    background: rgba(124,58,237,0.08);
                    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
                }
                .input-field::placeholder { color: rgba(148,163,184,0.5); }
                .google-btn {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.12);
                    transition: all 0.3s ease;
                }
                .google-btn:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.25);
                    transform: translateY(-1px);
                }
                .submit-btn {
                    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #7c3aed 100%);
                    background-size: 200% auto;
                    transition: all 0.4s ease;
                    box-shadow: 0 4px 24px rgba(124,58,237,0.4);
                }
                .submit-btn:hover {
                    background-position: right center;
                    box-shadow: 0 8px 32px rgba(124,58,237,0.6);
                    transform: translateY(-2px);
                }
                .submit-btn:active { transform: translateY(0); }
                .divider-line { background: linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent); }
                .shield-icon {
                    width: 56px; height: 56px;
                    background: linear-gradient(135deg, #7c3aed, #a855f7);
                    border-radius: 16px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 8px 32px rgba(124,58,237,0.5);
                    font-size: 24px;
                }
                .grid-bg {
                    background-image: linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
            `}</style>

            <div className="login-root min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
                {/* Grid background */}
                <div className="absolute inset-0 grid-bg opacity-60" />

                {/* Glow orbs */}
                <div className="glow-orb-1" />
                <div className="glow-orb-2" />
                <div className="glow-orb-3" />

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-md z-10"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="flex justify-center mb-5"
                        >
                            <div className="shield-icon">🛡️</div>
                        </motion.div>
                        <motion.h1
                            className="login-title text-4xl font-bold text-white mb-2 tracking-tight"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Welcome back
                        </motion.h1>
                        <motion.p
                            className="text-slate-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Sign in to your Shakti Shield account
                        </motion.p>
                    </div>

                    {/* Card */}
                    <motion.div
                        className="glass-card rounded-3xl p-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6 }}
                    >
                        {/* Google Button */}
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleGoogleLogin()}
                            className="google-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl text-slate-200 font-medium text-sm mb-6 disabled:opacity-50"
                        >
                            <img src="/google.jfif" alt="Google" className="w-5 h-5 rounded-full" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="divider-line h-px flex-1" />
                            <span className="text-slate-500 text-xs uppercase tracking-widest">or</span>
                            <div className="divider-line h-px flex-1" />
                        </div>

                        {/* Error */}
                        {errors && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-5 px-4 py-3 rounded-xl text-sm"
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}
                            >
                                {errors}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(Submit)} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    className="input-field w-full px-4 py-3 rounded-xl text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", { required: true, maxLength: 20 })}
                                        className="input-field w-full px-4 py-3 rounded-xl text-sm pr-11"
                                        placeholder="••••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="submit-btn w-full text-white font-semibold py-3.5 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </motion.button>
                        </form>

                        {/* Sign up link */}
                        <p className="text-center text-slate-500 text-sm mt-6">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Create one
                            </Link>
                        </p>
                    </motion.div>

                    {/* Bottom tag */}
                    <p className="text-center text-slate-600 text-xs mt-6">
                        Protected by Shakti Shield • Your safety, our priority
                    </p>
                </motion.div>
            </div>
        </>
    );
}

export default Login;