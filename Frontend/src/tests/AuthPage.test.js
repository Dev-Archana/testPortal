import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "../components/registration/Registration";
import { BrowserRouter } from "react-router-dom";

describe("AuthPage Component", () => {
    beforeEach(() => {
        jest.spyOn(window, "alert").mockImplementation(() => { });
        localStorage.clear();
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "mockToken123" }),
            })
        );
    });

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

        fireEvent.submit(screen.getByRole("form"));

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

        await fireEvent.submit(screen.getByRole("form"));

        expect(localStorage.getItem("token")).toBe("mockToken123");
    });
});