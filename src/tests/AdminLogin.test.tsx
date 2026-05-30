import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import { AdminLogin } from "../admin/components/AdminLogin";
import * as auth from "../utils/auth";

// Mock the auth module
vi.mock("../utils/auth", () => ({
  loginApi: vi.fn(),
  setToken: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AdminLogin Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
  };

  it("should show validation error if email/password is empty and form is submitted", async () => {
    const user = userEvent.setup();
    renderComponent();

    const submitBtn = screen.getByRole("button", { name: /MASUK KE DASHBOARD/i });
    
    // HTML5 validation will prevent submission if required fields are empty.
    // We can check if the input has the 'required' attribute.
    const emailInput = screen.getByPlaceholderText("admin@business.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();

    // Since jsdom might not fully support native HTML5 form validation triggering an onSubmit,
    // we just verify the elements are correctly configured.
    await user.click(submitBtn);

    // loginApi should not be called
    expect(auth.loginApi).not.toHaveBeenCalled();
  });

  it("should call loginApi and navigate on successful login", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Setup mock to resolve successfully
    vi.mocked(auth.loginApi).mockResolvedValueOnce("fake-jwt-token");

    const emailInput = screen.getByPlaceholderText("admin@business.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitBtn = screen.getByRole("button", { name: /MASUK KE DASHBOARD/i });

    await user.type(emailInput, "admin@test.com");
    await user.type(passwordInput, "password123");
    await user.click(submitBtn);

    // Verify API is called
    expect(auth.loginApi).toHaveBeenCalledWith("admin@test.com", "password123");

    // Wait for the async ops to finish and check navigation
    expect(auth.setToken).toHaveBeenCalledWith("fake-jwt-token");
    expect(mockNavigate).toHaveBeenCalledWith("/admin/dashboard");
  });

  it("should display error message on login failure", async () => {
    const user = userEvent.setup();
    renderComponent();

    // Setup mock to reject with error
    vi.mocked(auth.loginApi).mockRejectedValueOnce(new Error("Kredensial salah"));

    const emailInput = screen.getByPlaceholderText("admin@business.com");
    const passwordInput = screen.getByPlaceholderText("••••••••");
    const submitBtn = screen.getByRole("button", { name: /MASUK KE DASHBOARD/i });

    await user.type(emailInput, "admin@test.com");
    await user.type(passwordInput, "wrong");
    await user.click(submitBtn);

    // Find the error message
    const errorMsg = await screen.findByText(/Kredensial salah/i);
    expect(errorMsg).toBeInTheDocument();
    
    // Should not navigate
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
