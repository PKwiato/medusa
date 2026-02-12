<script setup>
import { useCart } from '../store/cart'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'checkout'])

const { cart, removeFromCart, updateQuantity, totalPrice } = useCart()
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100]">
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        @click="emit('close')"
      ></div>
      
      <!-- Sidebar -->
      <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in">
        <div class="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-900">Your Cart</h2>
          <button @click="emit('close')" class="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div v-if="cart.length === 0" class="h-full flex flex-col items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="opacity-20 mb-4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <p class="text-lg font-medium">Your cart is empty</p>
            <button @click="emit('close')" class="mt-4 text-primary-600 font-bold hover:underline">Start shopping</button>
          </div>

          <div v-for="item in cart" :key="item.id" class="flex gap-4 group">
            <div class="w-24 h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0">
              <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-slate-900 truncate">{{ item.title }}</h3>
              <p class="text-sm text-slate-500 mb-2">{{ item.handle }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" class="p-1 px-3 hover:bg-slate-50 text-slate-600 font-bold">-</button>
                  <span class="px-2 text-sm font-bold w-10 text-center">{{ item.quantity }}</span>
                  <button @click="updateQuantity(item.id, item.quantity + 1)" class="p-1 px-3 hover:bg-slate-50 text-slate-600 font-bold">+</button>
                </div>
                <span class="font-bold text-slate-900">
                  ${{ (((item.variants?.[0]?.prices?.[0]?.amount || 0) * item.quantity) / 100).toFixed(2) }}
                </span>
              </div>
            </div>
            <button @click="removeFromCart(item.id)" class="text-slate-300 hover:text-red-500 transition-colors self-start p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
        </div>

        <div class="p-6 bg-slate-50 border-t border-slate-200">
          <div class="flex justify-between items-center mb-6">
            <span class="text-slate-500 font-medium">Subtotal</span>
            <span class="text-2xl font-black text-slate-900">${{ (totalPrice / 100).toFixed(2) }}</span>
          </div>
          <button 
            @click="emit('checkout')"
            class="w-full bg-slate-900 hover:bg-primary-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            :disabled="cart.length === 0"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.animate-slide-in {
  animation: slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
