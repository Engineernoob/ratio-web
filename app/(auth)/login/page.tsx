"use client";

import { AuthCard } from "@/components/AuthCard";
import { AuthButton } from "@/components/AuthButton";
import { ClassicalImage } from "@/components/ClassicalImage";

export default function LoginPage() {
  const handleGoogle = () => {
    // TODO: Implement Google auth
    console.log("Continue with Google");
  };

  const handleApple = () => {
    // TODO: Implement Apple auth
    console.log("Continue with Apple");
  };

  const handleEmail = () => {
    // TODO: Implement Email auth
    console.log("Continue with Email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background grid-dither grain-texture p-4">
      <AuthCard className="border-[1.5px]">
        {/* Classical Statue Image */}
        <div className="mb-8">
          <ClassicalImage
            src="/images/classical/statue-login.jpg"
            alt="Classical Greek statue"
            priority
          />
        </div>

        {/* Title */}
        <div className="text-center mb-2">
          <h1 className="font-serif text-5xl font-bold engraved mb-2">RATIO</h1>
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            SCHOLARLY OS
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="mt-12 space-y-3">
          <AuthButton variant="google" onClick={handleGoogle}>
            Continue with Google
          </AuthButton>
          <AuthButton variant="apple" onClick={handleApple}>
            Continue with Apple
          </AuthButton>
          <AuthButton variant="email" onClick={handleEmail}>
            Continue with Email
          </AuthButton>
        </div>
      </AuthCard>
    </div>
  );
}

