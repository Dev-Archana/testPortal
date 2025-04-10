import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

function AuthPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login"); // Track active tab

    const [registrationData, setRegistrationData] = useState({
        usn: "",
        college: "",
        email: "",
        fullname: "",
        createPassword: "",
        confirmPassword: "",
    });

    const [loginData, setLoginData] = useState({
        usn: "",
        password: "",
    });

    const handleRegistrationChange = (e) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        if (registrationData.createPassword !== registrationData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registrationData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! Redirecting to login...");
                setActiveTab("login"); // Switch to login tab after registration
            } else {
                alert(data.error || "Registration failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem("token", data.token);
                alert("Login Successful! Redirecting...");
                navigate("/testpage1"); // Redirect after login
            } else {
                alert(data.error || "Login failed!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">User Authentication</h2>

                {/* Tabs for switching */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="flex justify-center gap-4 border-b mb-4">
                        <TabsTrigger value="login" className="px-4 py-2 font-semibold cursor-pointer">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="register" className="px-4 py-2 font-semibold cursor-pointer">
                            Register
                        </TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login">
                        <h3 className="text-xl font-bold mb-2 text-center">Login</h3>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block font-semibold">USN</label>
                                <input
                                    type="text"
                                    name="usn"
                                    value={loginData.usn}
                                    onChange={handleLoginChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-600">
                                Login
                            </button>
                        </form>
                    </TabsContent>

                    {/* Registration Form */}
                    <TabsContent value="register">
                        <h3 className="text-xl font-bold mb-2 text-center">Register</h3>
                        <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                            {["fullname", "usn", "college", "email"].map((field) => (
                                <div key={field}>
                                    <label className="block font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={registrationData[field]}
                                        onChange={handleRegistrationChange}
                                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                        required
                                    />
                                </div>
                            ))}

                            <div>
                                <label className="block font-semibold">Create Password</label>
                                <input
                                    type="password"
                                    name="createPassword"
                                    value={registrationData.createPassword}
                                    onChange={handleRegistrationChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={registrationData.confirmPassword}
                                    onChange={handleRegistrationChange}
                                    className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-600">
                                Register
                            </button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default AuthPage;