import React from "react";

export default function AboutWindow() {
  return (
    <div className="w-full h-full bg-white p-6 font-mono text-sm overflow-auto text-black">
      <div className="max-w-2xl">
        <div className="text-4xl mb-4">👋</div>
        <h1 className="text-2xl font-bold mb-2">Hi, I'm Shaurya</h1>
        <p className="text-lg mb-6">Full Stack Developer based in India</p>
        
        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">ABOUT ME</h2>
          <p className="leading-relaxed">
            I'm a passionate developer who loves building interactive web experiences 
            and clean, functional software. With a background in Computer Science from IIT,
            I specialize in creating modern applications that are both beautiful and performant.
          </p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">WHAT I DO</h2>
          <p>• Full-stack web development</p>
          <p>• Building interactive user interfaces</p>
          <p>• Creating clean, maintainable code</p>
          <p>• Learning and exploring new technologies</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">INTERESTS</h2>
          <p>• Open Source</p>
          <p>• System Design</p>
          <p>• UI/UX Design</p>
          <p>• Terminal utilities</p>
        </div>

        <div className="border-t-2 border-black pt-4">
          <h2 className="font-bold text-lg mb-2">GET IN TOUCH</h2>
          <p>I'm always open to discussing new projects or opportunities.</p>
          <p className="mt-2">• Email: shaurya@example.com</p>
          <p>• GitHub: github.com/shaurya</p>
        </div>
      </div>
    </div>
  );
}
