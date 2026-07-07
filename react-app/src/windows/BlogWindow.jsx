import React, { useState, useEffect, useContext } from "react";
import { WindowManagerContext } from "../WindowManagerContext";
import data from "../content/blog.json";

export default function BlogWindow() {
  const { pendingBlogSlug, setPendingBlogSlug } = useContext(WindowManagerContext);
  const posts = data.posts;

  const [selectedPost, setSelectedPost] = useState(posts[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Another window asked to open a specific post (e.g. clicking a project).
  // ponytail: syncing an external one-shot signal into local state is exactly
  // what an effect is for here; the lint rule's blanket ban doesn't fit.
  useEffect(() => {
    if (!pendingBlogSlug) return;
    const post = posts.find(p => p.slug === pendingBlogSlug);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (post) setSelectedPost(post);
    setSidebarOpen(false);
    setPendingBlogSlug(null);
  }, [pendingBlogSlug, posts, setPendingBlogSlug]);

  const currentIndex = posts.findIndex(p => p.slug === selectedPost?.slug);
  const go = (delta) => setSelectedPost(posts[(currentIndex + delta + posts.length) % posts.length]);

  const postList = (
    <>
      <div className="text-xs font-bold mb-2 uppercase tracking-wide text-slate-500">Posts</div>
      {posts.map((post) => (
        <button
          key={post.slug}
          className={`text-left p-2 mb-1 border-2 hover:bg-slate-200 ${selectedPost?.slug === post.slug ? 'bg-slate-200 border-black' : 'border-transparent'}`}
          onClick={() => { setSelectedPost(post); setSidebarOpen(false); }}
        >
          <div className="font-bold leading-tight">{post.title}</div>
          <div className="text-slate-500 mt-0.5">{post.date}</div>
        </button>
      ))}
    </>
  );

  return (
    <div className="w-full h-full bg-white font-mono text-sm flex flex-col text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e293b] text-white text-xs">
        <div className="flex gap-2 items-center">
          {isMobile && <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white mr-1">☰</button>}
          <span className="font-bold tracking-wide">BLOG</span>
          <span className="text-slate-400">// project stories</span>
        </div>
        <span className="text-slate-400">{currentIndex + 1} / {posts.length}</span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {isMobile ? (
          <>
            <div className={`w-56 border-r-2 border-black p-2 flex flex-col text-xs bg-[#f1f5f9] absolute left-0 top-0 bottom-0 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              {postList}
            </div>
            {sidebarOpen && (
              <div className="fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)} />
            )}
          </>
        ) : (
          <div className="w-56 border-r-2 border-black p-2 flex flex-col text-xs bg-[#f1f5f9] overflow-auto">
            <PostList />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#1e293b] text-white px-2 py-0.5 mb-3 text-xs tracking-wide">{selectedPost?.category}</span>
            <h1 className="text-2xl font-bold mb-2 leading-tight">{selectedPost?.title}</h1>
            <div className="text-xs text-slate-500 mb-6">By {selectedPost?.author} · {selectedPost?.date}</div>

            {selectedPost?.intro && (
              <p className="text-base mb-4 leading-relaxed">{selectedPost.intro}</p>
            )}

            {selectedPost?.quote && (
              <blockquote className="border-l-4 border-[#1e293b] pl-4 my-6 italic font-bold text-slate-700">
                "{selectedPost.quote}"
              </blockquote>
            )}

            {selectedPost?.sections?.map((section, i) => (
              <div key={i} className="mb-4">
                {section.heading && <h2 className="text-md font-bold mt-6 mb-2">{section.heading}</h2>}
                {section.body.split(/\n\n+/).map((para, j) => (
                  <p key={j} className="text-sm mb-3 leading-relaxed">{para}</p>
                ))}
              </div>
            ))}

            <div className="mt-8 flex gap-2 text-xs border-t-2 border-black pt-4">
              <button onClick={() => go(-1)} className="border-2 border-black px-3 py-1 hover:bg-black hover:text-white">← PREV</button>
              <button onClick={() => go(1)} className="border-2 border-black px-3 py-1 hover:bg-black hover:text-white">NEXT →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
