import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

function AuthPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");

    const [registrationData, setRegistrationData] = useState({
        usn: "", college: "", email: "", fullname: "", createPassword: "", confirmPassword: "",
    });

    const [loginData, setLoginData] = useState({ usn: "", password: "" });

    const handleChange = (e, setData) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
            if (!response.ok) throw new Error(data.error || "Registration failed!");

            alert("Registration successful! Redirecting to login...");
            setActiveTab("login");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
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
            if (!response.ok) throw new Error(data.error || "Login failed!");

            localStorage.setItem("token", data.token);
            alert("Login Successful! Redirecting...");
            navigate("/testpage1");
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">User Authentication</h2>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="flex justify-center gap-4 border-b mb-4">
                        <TabsTrigger value="login" className="px-4 py-2 font-semibold cursor-pointer">Login</TabsTrigger>
                        <TabsTrigger value="register" className="px-4 py-2 font-semibold cursor-pointer">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <h3 className="text-xl font-bold mb-2 text-center">Login</h3>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {["usn", "password"].map(field => (
                                <div key={field}>
                                    <label htmlFor={field} className="block font-semibold">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <input
                                        id={field}
                                        type={field === "password" ? "password" : "text"}
                                        name={field}
                                        value={loginData[field]}
                                        onChange={e => handleChange(e, setLoginData)}
                                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2"
                                        required
                                    />
                                </div>
                            ))}
                            <button type="submit" className="w-full bg-red-800 text-white py-2 rounded hover:bg-red-600">Login</button>
                        </form>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default AuthPage;