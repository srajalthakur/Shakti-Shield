import React, { useState, useContext } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Config } from '../../URL/Config';
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../URL/CustomApi';
import { motion } from 'framer-motion';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const [errors, setErrors] = useState("");
    const { checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const Submit = async (data) => {
        setErrors("");
        try {
            if (data.password !== password) { setErrors("Passwords don't match"); return; }
            if (!data.agreeToTerms) { setErrors("Please agree to the Terms and Privacy Policy"); return; }
            setIsLoading(true);
            const response = await api.post(Config.SignUPUrl, {
                username: data.userName,
                email: data.email,
                password: data.password
            });
            if (response.data) { await checkAuth(); navigate("/HomePage"); }
        } catch (error) {
            setErrors(error.response?.data?.message || "Signup failed. Please try again.");
        } finally { setIsLoading(false); }
    };

    const handleGoogleSuccess = async (tokenResponse) => {
        try {
            setIsLoading(true);
            const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            });
            const googleUser = userInfoResponse.data;
            const response = await api.post(Config.GoogleSignUpUrl, {
                email: googleUser.email, googleId: googleUser.sub,
                name: googleUser.name, picture: googleUser.picture
            });
            if (response.data) { await checkAuth(); navigate("/HomePage"); }
        } catch (error) {
            setErrors("Google signup failed: " + (error.response?.data?.message || "Please try again"));
        } finally { setIsLoading(false); }
    };

    const handleGoogleSignup = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => setErrors("Google signup failed. Please try again.")
    });

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
                .signup-root { font-family: 'DM Sans', sans-serif; }
                .signup-title { font-family: 'Syne', sans-serif; }
                .orb-a {
                    position:absolute; width:500px; height:500px;
                    background:radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%);
                    border-radius:50%; top:-150px; right:-100px; pointer-events:none;
                    animation: pulse-orb 9s ease-in-out infinite;
                }
                .orb-b {
                    position:absolute; width:350px; height:350px;
                    background:radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 65%);
                    border-radius:50%; bottom:-100px; left:-80px; pointer-events:none;
                    animation: pulse-orb 11s ease-in-out infinite reverse;
                }
                @keyframes pulse-orb {
                    0%,100%{ transform:scale(1) translateY(0); }
                    50%{ transform:scale(1.1) translateY(-20px); }
                }
                .signup-card {
                    background: rgba(18,18,26,0.88);
                    backdrop-filter: blur(28px);
                    border: 1px solid rgba(124,58,237,0.28);
                    box-shadow: 0 0 80px rgba(124,58,237,0.12), 0 40px 80px rgba(0,0,0,0.6);
                }
                .s-input {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(124,58,237,0.22);
                    color: #f1f5f9;
                    transition: all 0.3s;
                }
                .s-input:focus {
                    outline:none;
                    border-color: rgba(168,85,247,0.65);
                    background: rgba(124,58,237,0.07);
                    box-shadow: 0 0 0 3px rgba(124,58,237,0.13);
                }
                .s-input::placeholder { color:rgba(148,163,184,0.45); }
                .g-btn {
                    background:rgba(255,255,255,0.05);
                    border:1px solid rgba(255,255,255,0.1);
                    transition:all 0.3s;
                }
                .g-btn:hover { background:rgba(255,255,255,0.09); border-color:rgba(255,255,255,0.22); transform:translateY(-1px); }
                .s-btn {
                    background:linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#7c3aed 100%);
                    background-size:200% auto;
                    box-shadow:0 4px 24px rgba(124,58,237,0.4);
                    transition:all 0.4s;
                }
                .s-btn:hover { background-position:right center; box-shadow:0 8px 32px rgba(124,58,237,0.55); transform:translateY(-2px); }
                .div-line { background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4),transparent); }
                .grid-bg {
                    background-image:linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),
                        linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px);
                    background-size:40px 40px;
                }
                .strength-bar { height:3px; border-radius:2px; transition:all 0.4s; }
            `}</style>

            <div className="signup-root min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: '#0a0a0f' }}>
                <div className="absolute inset-0 grid-bg" />
                <div className="orb-a" />
                <div className="orb-b" />

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-md z-10 py-8"
                >
                    {/* Header */}
                    <div className="text-center mb-7">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex justify-center mb-4"
                        >
                            <div style={{ width:52,height:52,background:'linear-gradient(135deg,#7c3aed,#a855f7)',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,boxShadow:'0 8px 32px rgba(124,58,237,0.5)' }}>
                                🛡️
                            </div>
                        </motion.div>
                        <motion.h1
                            className="signup-title text-4xl font-bold text-white mb-1 tracking-tight"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            Create account
                        </motion.h1>
                        <motion.p
                            className="text-slate-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            Join Shakti Shield and stay protected
                        </motion.p>
                    </div>

                    {/* Card */}
                    <motion.div
                        className="signup-card rounded-3xl p-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Google */}
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleGoogleSignup()}
                            className="g-btn w-full flex items-center justify-center gap-3 py-3 rounded-xl text-slate-200 font-medium text-sm mb-6 disabled:opacity-50"
                        >
                            <img src="/google.jfif" alt="Google" className="w-5 h-5 rounded-full" />
                            Continue with Google
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="div-line h-px flex-1" />
                            <span className="text-slate-500 text-xs uppercase tracking-widest">or</span>
                            <div className="div-line h-px flex-1" />
                        </div>

                        {/* Error */}
                        {errors && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-5 px-4 py-3 rounded-xl text-sm"
                                style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', color:'#fca5a5' }}
                            >
                                {errors}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit(Submit)} className="space-y-4">
                            {/* Username */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    className="s-input w-full px-4 py-3 rounded-xl text-sm"
                                    placeholder="your_username"
                                    {...register("userName", { required: "Username is required", maxLength: 20 })}
                                />
                                {formErrors.userName && <p className="text-red-400 text-xs mt-1">{formErrors.userName.message}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    className="s-input w-full px-4 py-3 rounded-xl text-sm"
                                    placeholder="you@example.com"
                                    {...register("email", {
                                        required: true,
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" }
                                    })}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="s-input w-full px-4 py-3 rounded-xl text-sm pr-11"
                                        placeholder="••••••••••"
                                        {...register("password", { required: true, maxLength: 20 })}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                        {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="s-input w-full px-4 py-3 rounded-xl text-sm pr-11"
                                        placeholder="••••••••••"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                        {showConfirmPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3 pt-1">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    className="mt-0.5 rounded"
                                    style={{ accentColor: '#7c3aed' }}
                                    {...register("agreeToTerms", { required: "You must agree to the Terms" })}
                                />
                                <label htmlFor="agreeToTerms" className="text-xs text-slate-400 leading-relaxed">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
                                </label>
                            </div>
                            {formErrors.agreeToTerms && <p className="text-red-400 text-xs">{formErrors.agreeToTerms.message}</p>}

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                className="s-btn w-full text-white font-semibold py-3.5 rounded-xl text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileTap={{ scale: 0.98 }}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'Create Secure Account'}
                            </motion.button>
                        </form>

                        <p className="text-center text-slate-500 text-sm mt-6">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in</Link>
                        </p>
                    </motion.div>

                    <p className="text-center text-slate-600 text-xs mt-6">
                        Protected by Shakti Shield • Your safety, our priority
                    </p>
                </motion.div>
            </div>
        </>
    );
}

export default Signup;