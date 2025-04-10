import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "../components/AuthPage";
import { BrowserRouter } from "react-router-dom";

describe("AuthPage Component", () => {
    test("renders login and register tabs", () => {
        render(
            <BrowserRouter>
                <AuthPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
    });

    test("handles invalid registration (password mismatch)", () => {
        render(
            <BrowserRouter>
                <AuthPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("Create Password"), { target: { value: "test123" } });
        fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "test456" } });

        fireEvent.click(screen.getByText("Register"));

        expect(window.alert).toHaveBeenCalledWith("Passwords do not match!");
    });

    test("handles successful login", async () => {
        render(
            <BrowserRouter>
                <AuthPage />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText("USN"), { target: { value: "testuser" } });
        fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password123" } });

        fireEvent.click(screen.getByText("Login"));

        expect(localStorage.getItem("token")).not.toBeNull();
    });
});