<script setup>
const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 z-[130] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-primary-600/90 backdrop-blur-xl animate-in fade-in duration-500"></div>
    
    <div class="relative bg-white p-12 rounded-[3rem] text-center max-w-lg shadow-2xl animate-in zoom-in-95 duration-500">
      <div class="w-24 h-24 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <h2 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">Order Placed!</h2>
      <p class="text-slate-500 text-lg mb-10 leading-relaxed font-medium">
        Thank you for your purchase. We've sent a confirmation email with your order details.
      </p>
      <button 
        @click="emit('close')"
        class="bg-slate-900 hover:bg-primary-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95"
      >
        Back to Store
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: animate-in 0.5s ease-out;
}
.zoom-in-95 {
  animation: zoom-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes animate-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes zoom-in {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
