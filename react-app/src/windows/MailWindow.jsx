import React, { useState, useEffect } from "react";
import data from "../content/mail.json";

const InboxIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const ComposeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default function MailWindow() {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeMode, setComposeMode] = useState(false);
  
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  const emails = data.emails;

  const handleSend = (e) => {
    e.preventDefault();
    alert('Message sent! (Demo - no actual email sent)');
    setComposeMode(false);
  };

  const renderCompose = () => (
    <div className="flex-1 p-4 overflow-auto">
      <div className="text-lg font-bold mb-4">New Message</div>
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-xs mb-1">Your Email</label>
          <input type="email" required className="w-full border-2 border-black p-2 text-sm font-mono" placeholder="your@email.com" />
        </div>
        <div>
          <label className="block text-xs mb-1">Subject</label>
          <input type="text" required className="w-full border-2 border-black p-2 text-sm font-mono" placeholder="What's this about?" />
        </div>
        <div>
          <label className="block text-xs mb-1">Message</label>
          <textarea required rows={8} className="w-full border-2 border-black p-2 text-sm font-mono resize-none" placeholder="Write your message here..." />
        </div>
        <div className="border-t-2 border-black pt-4">
          <div className="text-xs mb-2 font-bold">CONTACT INFO (optional)</div>
          <div className="flex gap-2 mb-2">
            <input type="text" className="flex-1 border-2 border-black p-2 text-xs font-mono" placeholder="GitHub URL" />
          </div>
          <div className="flex gap-2">
            <input type="text" className="flex-1 border-2 border-black p-2 text-xs font-mono" placeholder="LinkedIn URL" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="border-2 border-black px-4 py-2 text-sm font-mono hover:bg-black hover:text-white">[SEND]</button>
          <button type="button" onClick={() => setComposeMode(false)} className="border-2 border-black px-4 py-2 text-sm font-mono hover:bg-gray-200">[CANCEL]</button>
        </div>
      </form>
    </div>
  );

  const renderEmailContent = () => (
    <>
      <div className="w-64 shrink-0 border-r-2 border-black flex flex-col overflow-auto">
        <div className="p-2 border-b-2 border-black bg-gray-100 text-xs font-bold">
          {activeTab.toUpperCase()}
        </div>
        {emails.map((email) => (
          <div 
            key={email.id} 
            className={`p-2 border-b border-black text-xs cursor-pointer hover:bg-gray-100 ${email.unread ? 'font-bold' : ''} ${selectedEmail?.id === email.id ? 'bg-gray-200' : ''}`}
            onClick={() => setSelectedEmail(email)}
          >
            <div>{email.from}</div>
            <div className="text-black">{email.subject}</div>
            <div className="text-gray-500 text-xs">{email.date}</div>
          </div>
        ))}
      </div>
      
      {/* Email Preview */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedEmail ? (
          <>
            <h2 className="text-md font-bold mb-2 border-b-2 border-black pb-2">{selectedEmail.subject}</h2>
            <div className="text-xs text-gray-500 mb-4">From: {selectedEmail.from} | Date: {selectedEmail.date}</div>
            <p className="text-sm mb-4">{selectedEmail.body}</p>
            <div className="mt-6 flex gap-2 text-xs border-t-2 border-black pt-4">
              <button 
                className="border-2 border-black px-3 py-2 hover:bg-black hover:text-white"
                onClick={() => setComposeMode(true)}
              >
                [REPLY]
              </button>
              <button className="border-2 border-black px-3 py-2 hover:bg-black hover:text-white">
                [FORWARD]
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-4">MAIL</div>
              <div className="text-xs">Select an email to read</div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-black text-white text-xs">
        <div className="flex gap-3 items-center">
          {isMobile && <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white mr-2">☰</button>}
          <button className="hover:underline" onClick={() => setComposeMode(true)}>COMPOSE</button>
          <button className="hover:underline">REFRESH</button>
        </div>
        <div className="text-xs">
          <span className="text-gray-400">{data.user}</span>
        </div>
      </div>
      
      {composeMode ? renderCompose() : (
        <div className="flex flex-1 overflow-hidden relative">
          {/* Folder List */}
          {isMobile ? (
            <>
              <div className={`w-36 border-r-2 border-black p-2 flex flex-col gap-1 text-xs bg-gray-50 absolute left-0 top-0 bottom-0 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="text-xs font-bold mb-2 border-b border-black pb-1">FOLDERS</div>
                <button 
                  className={`text-left px-2 py-1 hover:bg-gray-200 flex items-center gap-1 ${activeTab === 'inbox' ? 'bg-gray-200 border border-black' : ''}`}
                  onClick={() => { setActiveTab('inbox'); setSidebarOpen(false); }}
                >
                  <InboxIcon /> INBOX ({emails.filter(e => e.unread).length})
                </button>
                <button 
                  className="text-left px-2 py-1 hover:bg-gray-200 flex items-center gap-1"
                  onClick={() => setComposeMode(true)}
                >
                  <ComposeIcon /> COMPOSE
                </button>
              </div>
              {sidebarOpen && (
                <div 
                  className="fixed inset-0 bg-black/50 z-30"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
            </>
          ) : (
            <div className="w-36 border-r-2 border-black p-2 flex flex-col gap-1 text-xs bg-gray-50">
              <div className="text-xs font-bold mb-2 border-b border-black pb-1">FOLDERS</div>
              <button 
                className={`text-left px-2 py-1 hover:bg-gray-200 flex items-center gap-1 ${activeTab === 'inbox' ? 'bg-gray-200 border border-black' : ''}`}
                onClick={() => setActiveTab('inbox')}
              >
                <InboxIcon /> INBOX ({emails.filter(e => e.unread).length})
              </button>
              <button 
                className="text-left px-2 py-1 hover:bg-gray-200 flex items-center gap-1"
                onClick={() => setComposeMode(true)}
              >
                <ComposeIcon /> COMPOSE
              </button>
            </div>
          )}
          
          {renderEmailContent()}
        </div>
      )}
    </div>
  );
}
