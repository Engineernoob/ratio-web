"use client";

import { useState } from "react";
import { AuthCard } from "@/components/AuthCard";
import { AuthButton } from "@/components/AuthButton";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ClassicalImage } from "@/components/ClassicalImage";
import { useRouter } from "next/navigation";

const studyAreas = [
  "Classical Logic",
  "Rhetoric",
  "Memory Techniques",
  "Dialectic",
  "Ethics",
  "Metaphysics",
  "Natural Philosophy",
  "Mathematics",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dailyMinutes, setDailyMinutes] = useState(15);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      router.push("/oikos");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleArea = (area: string) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background grid-dither grain-texture p-4">
      <AuthCard className="border-[1.5px] max-w-2xl">
        {/* Screen 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <div className="mb-8">
              <ClassicalImage
                src="/images/classical/philosopher-welcome.jpg"
                alt="Classical Greek philosopher"
                priority
              />
            </div>
            <h1 className="font-serif text-4xl font-bold engraved mb-4">
              Welcome to RATIO
            </h1>
            <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
              Begin your journey into the scholarly arts. RATIO provides the tools
              and structure for systematic learning, memory retention, and intellectual
              discipline.
            </p>
            <AuthButton variant="email" onClick={handleNext}>
              Continue
            </AuthButton>
          </div>
        )}

        {/* Screen 2: Set Daily Ritual */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-3xl font-bold engraved mb-2 text-center">
              Set Daily Ritual
            </h2>
            <p className="font-mono text-sm text-muted-foreground text-center mb-8">
              Choose how many minutes per day you will dedicate to study.
            </p>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setDailyMinutes(Math.max(5, dailyMinutes - 5))}
                  className="border border-border px-4 py-2 font-mono text-sm hover:bg-secondary"
                >
                  −
                </button>
                <div className="text-center min-w-[120px]">
                  <div className="font-serif text-4xl font-bold engraved">
                    {dailyMinutes}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    minutes
                  </div>
                </div>
                <button
                  onClick={() => setDailyMinutes(Math.min(120, dailyMinutes + 5))}
                  className="border border-border px-4 py-2 font-mono text-sm hover:bg-secondary"
                >
                  +
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDailyMinutes(mins)}
                    className={`border border-border px-4 py-2 font-mono text-sm transition-colors ${
                      dailyMinutes === mins
                        ? "bg-accent text-accent-foreground border-accent"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <AuthButton variant="google" onClick={handleBack} className="flex-1">
                Back
              </AuthButton>
              <AuthButton variant="email" onClick={handleNext} className="flex-1">
                Continue
              </AuthButton>
            </div>
          </div>
        )}

        {/* Screen 3: Select Areas of Study */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-3xl font-bold engraved mb-2 text-center">
              Select Areas of Study
            </h2>
            <p className="font-mono text-sm text-muted-foreground text-center mb-8">
              Choose the disciplines you wish to pursue.
            </p>

            <div className="space-y-2 mb-8">
              {studyAreas.map((area) => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`w-full border border-border p-4 text-left font-mono text-sm transition-colors ${
                      isSelected
                        ? "bg-accent text-accent-foreground border-accent"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{area}</span>
                      {isSelected && <span>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <AuthButton variant="google" onClick={handleBack} className="flex-1">
                Back
              </AuthButton>
              <AuthButton
                variant="email"
                onClick={handleNext}
                className="flex-1"
                disabled={selectedAreas.length === 0}
              >
                Continue
              </AuthButton>
            </div>
          </div>
        )}

        {/* Screen 4: Begin Your Ascension */}
        {step === 4 && (
          <div className="text-center">
            <div className="mb-8">
              <ClassicalImage
                src="/images/classical/statue-ascension.jpg"
                alt="Classical Greek statue"
              />
            </div>
            <h2 className="font-serif text-4xl font-bold engraved mb-4">
              Begin Your Ascension
            </h2>
            <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
              Your scholarly journey begins now. Enter the OIKOS and commence
              your daily ritual.
            </p>

            <div className="mb-6 space-y-2">
              <BrutalistCard borderWidth="1" className="p-4">
                <div className="font-mono text-xs space-y-1 text-left">
                  <div>
                    <span className="text-muted-foreground">Daily Ritual: </span>
                    {dailyMinutes} minutes
                  </div>
                  <div>
                    <span className="text-muted-foreground">Areas Selected: </span>
                    {selectedAreas.length}
                  </div>
                </div>
              </BrutalistCard>
            </div>

            <div className="flex gap-3">
              <AuthButton variant="google" onClick={handleBack} className="flex-1">
                Back
              </AuthButton>
              <AuthButton variant="email" onClick={handleNext} className="flex-1">
                Enter RATIO
              </AuthButton>
            </div>
          </div>
        )}
      </AuthCard>
    </div>
  );
}

