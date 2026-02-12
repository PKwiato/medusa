<script setup>
import { ref } from 'vue'
import { useCart } from '../store/cart'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'success'])
const { cart, totalPrice } = useCart()

const isProcessing = ref(false)

const handlePlaceOrder = () => {
  isProcessing.value = true
  // Simulate API call
  setTimeout(() => {
    isProcessing.value = false
    emit('success')
  }, 2000)
}
</script>

<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
  >
    <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" @click="emit('close')"></div>
    
    <div class="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300">
      <div class="p-8 md:p-12">
        <h2 class="text-3xl font-black text-slate-900 mb-8 tracking-tight">Checkout</h2>
        
        <div class="space-y-6 mb-10">
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">First Name</label>
                <input type="text" placeholder="John" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-primary-500 focus:outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Name</label>
                <input type="text" placeholder="Doe" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-primary-500 focus:outline-none transition-all" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
              <input type="email" placeholder="john@example.com" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-primary-500 focus:outline-none transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold text-slate-400 uppercase tracking-widest">Shipping Address</label>
              <input type="text" placeholder="123 Medusa Street, Ecom City" class="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-primary-500 focus:outline-none transition-all" />
            </div>
          </div>

          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 class="font-bold text-slate-900 mb-4">Order Summary</h3>
            <div class="space-y-2">
              <div v-for="item in cart" :key="item.id" class="flex justify-between text-sm">
                <span class="text-slate-500">{{ item.title }} x {{ item.quantity }}</span>
                <span class="font-medium text-slate-900">${{ ((item.variants[0].prices[0].amount * item.quantity) / 100).toFixed(2) }}</span>
              </div>
              <div class="pt-4 mt-4 border-t border-slate-200 flex justify-between items-center text-lg font-black text-slate-900">
                <span>Total</span>
                <span>${{ (totalPrice / 100).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <button 
          @click="handlePlaceOrder"
          :disabled="isProcessing"
          class="w-full bg-slate-900 hover:bg-primary-600 text-white py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <svg v-if="!isProcessing" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
          <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isProcessing ? 'Processing Order...' : 'Complete Purchase' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-in {
  animation: animate-in 0.3s ease-out;
}
.zoom-in-95 {
  animation: zoom-in 0.3s ease-out;
}
@keyframes animate-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes zoom-in {
  from { transform: scale(0.95); }
  to { transform: scale(1); }
}
</style>
