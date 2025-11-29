"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Main } from "@/components/Main";
import { BrutalistCard } from "@/components/BrutalistCard";
import { OrangeAction } from "@/components/core/OrangeAction";
import { motion } from "framer-motion";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");
  const [isIngesting, setIsIngesting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setStatus(`Selected: ${selectedFile.name}`);
      } else {
        setStatus("Please select a PDF file");
        setFile(null);
      }
    }
  };

  const handleIngest = async () => {
    if (!file || !title || !author) {
      setStatus("Please fill in all required fields");
      return;
    }

    setIsIngesting(true);
    setProgress(0);
    setStatus("Preparing ingestion...");

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 50; // Upload is 50% of progress
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setProgress(100);
          setStatus("Ingestion complete!");

          // Navigate to ingested page after a short delay
          setTimeout(() => {
            router.push(`/bibliotheca/${response.slug}/ingested`);
          }, 1500);
        } else {
          const error = JSON.parse(xhr.responseText);
          setStatus(`Error: ${error.error || "Ingestion failed"}`);
          setIsIngesting(false);
        }
      });

      xhr.addEventListener("error", () => {
        setStatus("Network error occurred");
        setIsIngesting(false);
      });

      xhr.open("POST", "/api/ingest");
      xhr.send(formData);

      // Simulate processing progress (after upload)
      let processingProgress = 50;
      const progressInterval = setInterval(() => {
        processingProgress += Math.random() * 10;
        if (processingProgress < 95) {
          setProgress(processingProgress);
        } else {
          clearInterval(progressInterval);
        }
      }, 500);
    } catch (error) {
      console.error("Error during ingestion:", error);
      setStatus("An error occurred during ingestion");
      setIsIngesting(false);
    }
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <Main>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2 engraved engrave">
            Book Ingestion
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Upload a PDF and begin the ingestion process
          </p>
        </div>

        <BrutalistCard borderWidth="1.5" className="p-6 mb-6 floating-panel">
          <div className="space-y-6">
            {/* PDF File Picker */}
            <div>
              <label className="font-serif text-lg mb-3 block engraved">
                PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isIngesting}
                className="font-mono text-sm w-full p-3 border border-border bg-background file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-muted file:text-foreground hover:file:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {file && (
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Book Metadata Form */}
            <div className="space-y-4">
              <div>
                <label className="font-serif text-lg mb-2 block engraved">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isIngesting}
                  placeholder="Enter book title"
                  className="font-mono text-sm w-full p-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#b29b68] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-serif text-lg mb-2 block engraved">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  disabled={isIngesting}
                  placeholder="Enter author name"
                  className="font-mono text-sm w-full p-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#b29b68] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="font-serif text-lg mb-2 block engraved">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isIngesting}
                  placeholder="e.g., Philosophy, Science, History"
                  className="font-mono text-sm w-full p-3 border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[#b29b68] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Progress Bar */}
            {isIngesting && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-sm engraved">Progress</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted border border-border">
                  <motion.div
                    className="h-full bg-[#b29b68]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {status && (
                  <p className="font-mono text-xs text-muted-foreground mt-2">
                    {status}
                  </p>
                )}
              </div>
            )}

            {/* Status Message */}
            {status && !isIngesting && (
              <div className="font-mono text-sm text-muted-foreground">
                {status}
              </div>
            )}

            {/* Begin Ingestion Button */}
            <OrangeAction
              onClick={handleIngest}
              disabled={isIngesting || !file || !title || !author}
              className="w-full"
            >
              {isIngesting ? "Ingesting..." : "Begin Ingestion"}
            </OrangeAction>
          </div>
        </BrutalistCard>

        {/* Info Card */}
        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-mono text-xs text-muted-foreground space-y-2">
            <p>
              <strong>Note:</strong> The ingestion process will:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Extract text from the PDF</li>
              <li>Detect and split chapters</li>
              <li>Generate summaries, key ideas, and micro-lessons</li>
              <li>Create chapter files and metadata</li>
            </ul>
          </div>
        </BrutalistCard>
      </motion.div>
    </Main>
  );
}
