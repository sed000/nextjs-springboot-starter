import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthResponse {
  token?: string;
  error?: string;
}

export async function login(
  username: string,
  password: string
): Promise<AuthResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const token = await response.text();
    Cookies.set("token", token);
    return { token };
  } catch (error) {
    return { error: "Invalid credentials" };
  }
}

export async function register(
  username: string,
  password: string,
  email: string
): Promise<AuthResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await login(username, password);
  } catch (error) {
    return { error: "Registration failed" };
  }
}

export async function verify(
  email: string,
  verificationCode: string
): Promise<AuthResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/auth/verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, verificationCode}),
    });

    if (!response.ok) {
      throw new Error("Verification failed");
    }
    return { token: await response.text() };
  } catch (error) {
    return { error: "Verification failed" };
  }
}


export function logout() {
  Cookies.remove("token");
}

export function getToken(): string | undefined {
  return Cookies.get("token");
}

export function checkAuth(): boolean {
  return !!getToken();
}

export function decodeToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}
