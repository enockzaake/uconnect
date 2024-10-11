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
import { signUpAction } from "@/actions/auth";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils";
import { Spinner } from "@/components/Loaders";
import { Check, CircleCheckBig, Eye } from "lucide-react";

export default function SIgnUp() {
  const [validEmail, setIsValidEmail] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password1: "", password2: "" });

  async function handleSubmit() {
    setLoading(true);

    try {
      setError(null);
      setIsValidEmail(true);

      // if (!isValidEmail(data.email)) {
      //   setIsValidEmail(false);
      //   return;
      // }

      // if (data.password1 !== data.password2) {
      //   setPasswordsMatch(false);
      //   return;
      // }

      // if (data.password1.trim().length < 6) {
      //   setInvalidPassword(true);
      //   return;
      // }

      const { error } = await signUpAction(data.email, data.password1);

      if (error) {
        setError(error);
        return;
      } else {
        setSuccess(true);
        setData({ email: "", password1: "", password2: "" });
      }
    } catch (error: any) {
      setError(error.message);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm mt-32">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
        {error && (
          <Label className="text-red-500 border border-red-100 py-3 px-1 bg-red-100 rounded">
            {error}
          </Label>
        )}

        {success && (
          <Label className="flex items-center gap-2 text-green-500 text-sm border  border-green-100 py-3 px-1 bg-green-100 rounded">
            <CircleCheckBig className="h-12 w-12 text-green-500" />
            Registration successful. Please check your email to activate your
            account.
          </Label>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className={`${!validEmail ? "border-red-400" : ""} `}
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                if (!validEmail) {
                  setIsValidEmail(true);
                }
              }}
              placeholder="m@example.com"
              required
            />
            {!validEmail && (
              <Label className="text-red-500 text-xs -mt-2 ml-1">
                Invalid email address
              </Label>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className={`${!passwordsMatch ? "border-red-400" : ""} `}
              value={data.password1}
              onChange={(e) => setData({ ...data, password1: e.target.value })}
              id="password1"
              type="password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              className={`${!passwordsMatch ? "border-red-400" : ""} `}
              value={data.password2}
              onChange={(e) => setData({ ...data, password2: e.target.value })}
              id="password2"
              type="password"
            />
            {!passwordsMatch && (
              <Label className="text-red-500 text-xs -mt-2 ml-1">
                Passwords don&apos;t match
              </Label>
            )}
          </div>
          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading ? <Spinner /> : "Create an account"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
