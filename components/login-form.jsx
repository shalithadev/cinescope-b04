"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EMAIL_REGEX } from "@/lib/constants";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

export default function LoginForm() {
  const [error, setError] = useState(DEFAULT_ERROR);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = ({ email, password }) => {
    console.log("Email & Pass:", email, password);
    if (email === "") {
      setError({
        error: true,
        message: "Email is required.",
      });
      return false;
    } else if (password === "") {
      setError({
        error: true,
        message: "Password is required.",
      });
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      setError({
        error: true,
        message: "Email is not valid.",
      });
      return false;
    }
    setError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Basic validation
    if (validateForm({ email, password })) {
      // pass the login data to the login API
      setIsLoading(true);
      try {
        const loginResponse = await fetch(
          "http://localhost:3000/api/v1/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (!loginResponse.ok) {
          const errorData = await loginResponse.json();
          setError({
            error: true,
            message: errorData.message || "Login failed. Please try again.",
          });
        } else {
          const loginData = await loginResponse.json();
          console.log("Login successful!", loginData);
        }
      } catch (error) {
        setError({
          error: true,
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } else {
      console.log("Validation failed!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitForm} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="flex justify-center">
                {error.error && (
                  <span className="text-red-600 text-xs text-center animate-pulse duration-700">
                    {error.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />} Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
