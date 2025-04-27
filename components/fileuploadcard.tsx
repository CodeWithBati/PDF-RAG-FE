"use client";
import { FileUp } from "lucide-react";
import * as React from "react";

const FileUploadCard: React.FC = () => {
  const handleFileUploadButton = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";

    fileInput.onchange = async () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("pdf", file);

          await fetch("http://localhost:8000/api/upload/pdf", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
    };
    fileInput.click();
  };

  return (
    <>
      <div className="w-full h-full">
        <div
          onClick={handleFileUploadButton}
          className="bg-slate-800 p-4 w-full flex flex-col items-center justify-center rounded-2xl hover:bg-slate-700 border-white border-2 "
        >
          <h3>Upload PDF</h3>
          <FileUp />
        </div>
      </div>
    </>
  );
};

export default FileUploadCard;
