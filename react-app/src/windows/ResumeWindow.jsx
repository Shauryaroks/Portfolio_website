import React from "react";

export default function ResumeWindow() {
  return (
    <div className="w-full h-full bg-white p-6 font-mono text-sm overflow-auto text-black">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-1">SHAURYA</h1>
        <p className="text-lg mb-4">Full Stack Developer</p>
        
        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">CONTACT</h2>
          <p>• Email: shaurya@example.com</p>
          <p>• GitHub: github.com/shaurya</p>
          <p>• Location: India</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">EDUCATION</h2>
          <p className="font-bold">B.Tech in Computer Science</p>
          <p>Indian Institute of Technology</p>
          <p>Graduated: 2024</p>
          <p className="mt-2">Focus: Software Engineering, Distributed Systems</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">SKILLS</h2>
          <p>• Languages: JavaScript, TypeScript, Python, Go</p>
          <p>• Frontend: React, Vue, Tailwind CSS</p>
          <p>• Backend: Node.js, Express, PostgreSQL, Redis</p>
          <p>• Tools: Git, Docker, AWS, Linux</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">PROJECTS</h2>
          <p className="font-bold">Portfolio OS</p>
          <p className="mb-2">Interactive desktop portfolio web app</p>
          
          <p className="font-bold">CloudSync</p>
          <p className="mb-2">Real-time file synchronization service</p>
          
          <p className="font-bold">DataPipe</p>
          <p>ETL pipeline framework</p>
        </div>

        <div className="border-t-2 border-black pt-4">
          <h2 className="font-bold text-lg mb-2">EXPERIENCE</h2>
          <p className="font-bold">Software Developer</p>
          <p>2022 - 2024</p>
          <p>Built scalable web applications and microservices</p>
        </div>
      </div>
    </div>
  );
}
