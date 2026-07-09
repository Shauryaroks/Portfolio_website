import React from "react";
import data from "../content/about.json";

export default function AboutWindow() {
  return (
    <div className="w-full h-full bg-white p-6 font-mono text-sm overflow-auto text-black">
      <div className="max-w-2xl">
        <div className="text-4xl mb-4">👋</div>
        <h1 className="text-2xl font-bold mb-2">Hi, I'm {data.name}</h1>
        <p className="text-lg mb-6">{data.tagline}</p>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">ABOUT ME</h2>
          <p className="leading-relaxed">{data.about}</p>
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">WHAT I DO</h2>
          {data.whatIDo.map((line, i) => <p key={i}>• {line}</p>)}
        </div>

        <div className="border-t-2 border-black pt-4 mb-4">
          <h2 className="font-bold text-lg mb-2">INTERESTS</h2>
          {data.interests.map((line, i) => <p key={i}>• {line}</p>)}
        </div>

        <div className="border-t-2 border-black pt-4">
          <h2 className="font-bold text-lg mb-2">GET IN TOUCH</h2>
          <p>I'm always open to discussing new projects or opportunities.</p>
          <p className="mt-2">• Email: <a href={`mailto:${data.contact.email}`} className="underline hover:bg-black hover:text-white">{data.contact.email}</a></p>
          {data.contact.phone && (
            <p>• Phone: <a href={`tel:${data.contact.phone.replace(/\s/g, "")}`} className="underline hover:bg-black hover:text-white">{data.contact.phone}</a></p>
          )}
          <p>• GitHub: <a href={`https://${data.contact.github}`} target="_blank" rel="noreferrer" className="underline hover:bg-black hover:text-white">{data.contact.github}</a></p>
          {data.contact.linkedin && (
            <p>• LinkedIn: <a href={`https://${data.contact.linkedin}`} target="_blank" rel="noreferrer" className="underline hover:bg-black hover:text-white">{data.contact.linkedin}</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
