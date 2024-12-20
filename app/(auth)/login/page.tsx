"use client";
import Link from "next/link";

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
import { useState } from "react";

import { signInAction } from "@/actions/auth";
import { Spinner } from "@/components/Loaders";
import { isValidEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({
    emailRequired: false,
    passwordRequired: false,
  });

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setErrorMessages({
      emailRequired: false,
      passwordRequired: false,
    });

    if (!data.email || !isValidEmail(data.email)) {
      setErrorMessages((prev) => ({ ...prev, emailRequired: true }));
      setLoading(false);
      return;
    }

    if (!data.password) {
      setErrorMessages((prev) => ({ ...prev, passwordRequired: true }));
      setLoading(false);
      return;
    }

    try {
      const res = await signInAction(data.email, data.password);
      if (res?.error) {
        setError(res?.error);
      }
      router.push("/dashboard");
    } catch (error: any) {
      setError(error?.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-4 sm:mx-auto max-w-sm mt-32">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        {error && (
          <Label className="text-red-500 border border-red-100 py-3 px-1 bg-red-100 rounded capitalize">
            {error}
          </Label>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className={`${
                errorMessages.emailRequired ? "border-red-400" : ""
              }`}
            />
            {errorMessages.emailRequired && (
              <Label className="text-red-500 text-xs -mt-2 ml-1">
                Invalid email address
              </Label>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className={`${
                errorMessages.passwordRequired ? "border-red-400" : ""
              }`}
            />
            {errorMessages.passwordRequired && (
              <Label className="text-red-500 text-xs -mt-2 ml-1">
                Password required
              </Label>
            )}
          </div>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-[#522258] hover:bg-[#703577]"
          >
            {loading ? <Spinner /> : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
        <div className="text-center hover:text-blue-600">
          <Link href="/admin-login">Admin Login</Link>
        </div>
      </CardContent>
    </Card>
  );
}
