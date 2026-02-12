<script setup>
import { computed } from 'vue'
import { useCart } from '../store/cart'

const { addToCart } = useCart()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['show-details'])

// Helper to get price safely
const displayPrice = computed(() => {
  const variant = props.product.variants?.[0]
  if (!variant) return '0.00'
  
  // In Medusa 2.0, prices might be in variant.prices
  const price = variant.prices?.[0]?.amount || 0
  return (price / 100).toFixed(2)
})

const vendorName = computed(() => {
  return props.product.metadata?.vendor || props.product.collection?.title || 'Main Store'
})
</script>

<template>
  <div 
    @click="emit('show-details', product)"
    class="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
  >
    <div class="aspect-square overflow-hidden bg-slate-100">
      <img 
        :src="product.thumbnail" 
        :alt="product.title"
        class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div class="p-6">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {{ product.title }}
        </h3>
      </div>
      <div class="flex items-center gap-2 mb-3">
        <span class="text-[10px] font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {{ vendorName }}
        </span>
        <span class="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          {{ product.handle }}
        </span>
      </div>
      <p class="text-slate-500 text-sm mb-6 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-slate-900 leading-none">
          ${{ displayPrice }}
        </span>
        <button 
          @click.stop="addToCart(product)"
          class="bg-slate-900 text-white p-3 rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md transform active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </button>
      </div>
    </div>
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/10 rounded-2xl pointer-events-none transition-colors duration-500"></div>
  </div>
</template>
