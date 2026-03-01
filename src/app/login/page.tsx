"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";
import { signInWithGoogle, signInWithTwitter } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            setLoading("google");
            await signInWithGoogle();
            router.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading("google"); // keep loading on success to prevent flashes before redirect
        }
    };

    const handleTwitterSignIn = async () => {
        try {
            setLoading("twitter");
            await signInWithTwitter();
            router.push("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading("twitter");
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-950">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-pink-600/30 to-rose-600/30 blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
                    <div className="space-y-2 text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform -rotate-6 group hover:rotate-0 transition-all duration-300"
                        >
                            <div className="w-8 h-8 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 transform rotate-12 group-hover:rotate-0 transition-all duration-300" />
                        </motion.div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                            Welcome
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Sign in to your account or create a new one to continue
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Button
                            variant="outline"
                            className="w-full h-14 bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-white transition-all duration-300 group relative overflow-hidden text-base shadow-sm"
                            onClick={handleGoogleSignIn}
                            disabled={loading !== null}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            <FaGoogle className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            {loading === "google" ? "Signing in..." : "Continue with Google"}
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-14 bg-white/5 hover:bg-white/10 border-white/10 text-white hover:text-white transition-all duration-300 group relative overflow-hidden text-base shadow-sm"
                            onClick={handleTwitterSignIn}
                            disabled={loading !== null}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                            <FaXTwitter className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                            {loading === "twitter" ? "Signing in..." : "Continue with X"}
                        </Button>

                        <div className="relative mt-8 mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#020617] px-2 text-slate-500 rounded-full">
                                    Secure login
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-slate-500">
                        By continuing, you agree to our <br />
                        <a href="#" className="text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4 transition-colors">Terms of Service</a>{" "}
                        and{" "}
                        <a href="#" className="text-slate-400 hover:text-white underline decoration-slate-700 underline-offset-4 transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
