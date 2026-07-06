import React, { useState } from "react";

// Drop your resume image at react-app/public/resume.png (or change the path below).
export default function ResumeWindow() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="w-full h-full bg-white overflow-auto text-black">
      {failed ? (
        <div className="p-6 font-mono text-sm">
          <p className="font-bold mb-2">No resume image found.</p>
          <p>Add your resume as <code>public/resume.png</code> and rebuild.</p>
        </div>
      ) : (
        <img
          src="/resume.png"
          alt="Resume"
          className="block w-full h-auto"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
