"use client";
import { FileUp } from "lucide-react";
import * as React from "react";
import { storage, ID } from "@/lib/appwrite"; // Import Appwrite Storage setup

const FileUploadCard: React.FC = () => {
  const handleFileUploadButton = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";

    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];

        if (file) {
          try {
            const uploadedFile = await storage.createFile(
              "680df3cf003d490e48a1",
              ID.unique(),
              file
            );

            console.log("✅ File uploaded to Appwrite:", uploadedFile);

            // After upload, send fileId to your backend
            await fetch("http://localhost:8000/api/upload/pdf", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fileId: uploadedFile.$id,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("✅ Backend response:", data);
              })
              .catch((error) => {
                console.error("❌ Backend error:", error);
              });
          } catch (error) {
            console.error("❌ Upload to Appwrite failed:", error);
          }
        }
      }
    };
    fileInput.click();
  };

  return (
    <div className="w-full h-full">
      <div
        onClick={handleFileUploadButton}
        className="bg-slate-800 p-4 w-full flex flex-col items-center justify-center rounded-2xl hover:bg-slate-700 border-white border-2 cursor-pointer"
      >
        <h3 className="text-white mb-2">Upload PDF</h3>
        <FileUp className="text-white" />
      </div>
    </div>
  );
};

export default FileUploadCard;
