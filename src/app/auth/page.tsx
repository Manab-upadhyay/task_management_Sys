"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import UserProfile from "../components/userprofile";

export default function SignUp() {
    return (
        <>
            <style jsx>{`
                .gradient-background {
                    background: linear-gradient(to top, rgba(255, 165, 0, 0.8), rgba(255, 255, 255, 0));
                }
            `}</style>
            <section className="h-screen gradient-background bg-slate-100">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign up with
                            </h1>
                            <div className="flex flex-col space-y-4">
                            <button
                                    onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
                                    className="flex items-center justify-center w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                                >
                                    <FaGoogle className="mr-2" />
                                    Sign in with Google
                                </button>
                                <button
                                    onClick={() => signIn("github", { callbackUrl: "http://localhost:3000" })}
                                    className="flex items-center justify-center w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all"
                                >
                                    <FaGithub className="mr-2" />
                                    Sign in with GitHub
                                </button>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <UserProfile></UserProfile>
            
        </>
    );
}
