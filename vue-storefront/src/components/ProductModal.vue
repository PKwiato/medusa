<script setup>
import { computed } from 'vue'
import { useCart } from '../store/cart'

const props = defineProps({
  product: Object,
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const { addToCart } = useCart()

const handleAddToCart = () => {
  addToCart(props.product)
  emit('close')
}

// Helper to get price safely
const displayPrice = computed(() => {
  const variant = props.product.variants?.[0]
  if (!variant) return '0.00'
  const price = variant.prices?.[0]?.amount || 0
  return (price / 100).toFixed(2)
})

const vendorName = computed(() => {
  return props.product.metadata?.vendor || props.product.collection?.title || 'Main Store'
})
</script>

<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
  >
    <!-- Backdrop with blur -->
    <div 
      class="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
      @click="emit('close')"
    ></div>
    
    <!-- Modal Content -->
    <div 
      class="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 fade-in duration-300"
    >
      <button 
        @click="emit('close')"
        class="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white md:text-slate-900 md:bg-slate-100 md:hover:bg-slate-200 rounded-full transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <div class="w-full md:w-1/2 aspect-square bg-slate-100">
        <img 
          :src="product.thumbnail" 
          :alt="product.title"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div class="mb-8">
          <div class="flex items-center gap-2 mb-4">
            <span class="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">In Stock</span>
            <span class="text-primary-600 text-xs font-bold uppercase tracking-widest">{{ vendorName }}</span>
            <span class="text-slate-400 text-sm font-medium">#{{ product.handle }}</span>
          </div>
          <h2 class="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
            {{ product.title }}
          </h2>
          <p class="text-xl font-bold text-primary-600 mb-6">
            ${{ displayPrice }}
          </p>
          <p class="text-slate-500 leading-relaxed text-lg">
            {{ product.description }}
          </p>
        </div>

        <div class="space-y-6">
          <div v-if="product.options?.length">
            <div v-for="option in product.options" :key="option.id" class="mb-4">
              <span class="block text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Select {{ option.title }}</span>
              <div class="flex flex-wrap gap-3">
                <button v-for="value in option.values" :key="value.id" class="px-4 py-2 border-2 border-slate-200 rounded-xl font-bold hover:border-primary-500 hover:text-primary-600 transition-all">
                  {{ value.value }}
                </button>
              </div>
            </div>
          </div>

          <div class="pt-4 flex gap-4">
            <button 
              @click="handleAddToCart"
              class="flex-1 bg-slate-900 hover:bg-primary-600 text-white py-5 rounded-2xl font-bold transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Add to Cart
            </button>
            <button class="p-5 border-2 border-slate-200 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-100 transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
        </div>
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
