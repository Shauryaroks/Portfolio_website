<script setup>
import TerminalWindow from './components/TerminalWindow.vue'
</script>

<template>
  <div class="min-h-screen bg-background font-body text-on-background">
    <!-- Taskbar / Panel -->
    <header class="w-full h-10 bg-black flex items-center px-4 border-b border-outline shadow-hard select-none">
      <span class="text-inverse-primary font-headline tracking-wide text-lg">Linux Desktop Portfolio</span>
      <!-- TODO: Insert app/window launchers here as per design -->
    </header>
    <!-- Desktop Grid / Workspace -->
    <main class="flex-1 flex flex-col items-stretch justify-stretch py-12 pb-0 px-4 bg-surface grid place-items-center" style="min-height: calc(100vh - 2.5rem)">
      <!-- Placeholder: Main desktop area for interactive windows -->
      <div class="w-full h-[540px] max-w-[1160px] grid place-items-center">
        <!-- About Me / Terminal Window -->
        <TerminalWindow />
      </div>
    </main>
  </div>
</template>

