import React, { useState } from "react";
import data from "../content/mail.json";

const ENDPOINT = "https://api.web3forms.com/submit";

export default function MailWindow() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");

    const body = new FormData(form);
    body.append("access_key", data.web3formsPublicKey);

    try {
      const res = await fetch(ENDPOINT, { method: "POST", body });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
        setError(json.message || "The mail service rejected the message.");
      }
    } catch {
      setStatus("error");
      setError("Couldn't reach the mail service. Check your connection.");
    }
  };

  // Without a key every submission is silently discarded — say so rather than
  // letting someone type out a message into a dead form.
  if (!data.web3formsPublicKey) {
    return (
      <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
        <div className="px-4 py-2 bg-black text-white text-xs font-bold">MAIL</div>
        <div className="flex-1 p-6 flex items-center justify-center text-center">
          <div>
            <div className="text-lg font-bold mb-2">Contact form not configured</div>
            <p className="text-xs text-gray-600 max-w-xs">
              Add your Web3Forms access key to{" "}
              <code className="bg-gray-100 px-1">src/content/mail.json</code> to enable sending.
            </p>
            <a href={`mailto:${data.user}`} className="inline-block mt-4 border-2 border-black px-3 py-2 text-xs hover:bg-black hover:text-white">
              Email {data.user}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
      <div className="flex items-center justify-between px-4 py-2 bg-black text-white text-xs">
        <span className="font-bold tracking-wide">MAIL</span>
        <a href={`mailto:${data.user}`} className="text-gray-400 hover:text-white hover:underline">
          {data.user}
        </a>
      </div>

      <div className="flex-1 p-5 overflow-auto">
        <div className="max-w-md">
          <div className="text-lg font-bold mb-1">Get in touch</div>
          <p className="text-xs text-gray-600 mb-5">{data.blurb}</p>

          {status === "sent" ? (
            <div className="border-2 border-black p-4">
              <div className="font-bold mb-1">Message sent</div>
              <p className="text-xs text-gray-600 mb-4">Thanks — I'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="border-2 border-black px-3 py-2 text-xs hover:bg-black hover:text-white"
              >
                [SEND ANOTHER]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="mail-name" className="block text-xs mb-1">Your Name</label>
                <input id="mail-name" name="name" type="text" required
                  className="w-full border-2 border-black p-2 text-sm font-mono" placeholder="Jane Doe" />
              </div>
              <div>
                <label htmlFor="mail-email" className="block text-xs mb-1">Your Email</label>
                <input id="mail-email" name="email" type="email" required
                  className="w-full border-2 border-black p-2 text-sm font-mono" placeholder="jane@company.com" />
              </div>
              <div>
                <label htmlFor="mail-subject" className="block text-xs mb-1">Subject</label>
                <input id="mail-subject" name="subject" type="text" required
                  className="w-full border-2 border-black p-2 text-sm font-mono" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="mail-message" className="block text-xs mb-1">Message</label>
                <textarea id="mail-message" name="message" required rows={7}
                  className="w-full border-2 border-black p-2 text-sm font-mono resize-none" placeholder="Write your message here..." />
              </div>

              {/* honeypot: bots fill it, humans never see it */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

              {status === "error" && (
                <div className="border-2 border-black bg-red-50 p-2 text-xs">
                  <span className="font-bold">Couldn't send.</span> {error}{" "}
                  <a href={`mailto:${data.user}`} className="underline">Email me directly</a>.
                </div>
              )}

              <button type="submit" disabled={status === "sending"}
                className="border-2 border-black px-4 py-2 text-sm font-mono hover:bg-black hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-black">
                {status === "sending" ? "[SENDING...]" : "[SEND]"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
