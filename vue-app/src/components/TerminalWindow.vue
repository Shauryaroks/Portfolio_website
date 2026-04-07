<template>
  <section
    class="relative w-[520px] shadow-hard bg-black border border-outline text-on-primary font-mono rounded-none select-none"
    style="min-height:320px;"
  >
    <!-- Header Bar -->
    <header class="flex items-center gap-2 h-9 w-full px-3 bg-[#232323] border-b border-outline cursor-grab">
      <span class="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
      <span class="w-3 h-3 rounded-full bg-green-500"></span>
      <span class="ml-4 font-headline text-base tracking-tight text-inverse-primary flex-1">about-me — ~/</span>
    </header>
    <!-- Terminal Content -->
    <div class="p-5 pt-4 font-mono text-[15px] text-left leading-relaxed text-on-surface bg-black min-h-[240px]">
      <span class="text-accent">shaurya@portfolio</span>:<span class="text-blue-400">~</span>$ whoami<br />
      <span class="pl-4 text-on-primary">Shaurya — Software Engineer, Tinkerer, OSS Fan</span>
      <br /><br />
      <span class="text-accent">shaurya@portfolio</span>:<span class="text-blue-400">~</span>$ cat about.txt<br />
      <span class="pl-4 text-on-primary">
        • Building open, delightful interfaces<br />
        • Loves Linux desktops, design systems, and creative coding<br />
        • Reach me: [REDACTED@example.com]
      </span>
    </div>
  </section>
</template>
