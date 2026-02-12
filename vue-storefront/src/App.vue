<script setup>
import { ref } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CartSidebar from './components/CartSidebar.vue'
import ProductModal from './components/ProductModal.vue'
import CheckoutOverlay from './components/CheckoutOverlay.vue'
import SuccessState from './components/SuccessState.vue'
import { useCart } from './store/cart'

import { onMounted } from 'vue'
import medusa from './lib/medusa'

const isCartOpen = ref(false)
const toggleCart = () => {
  console.log('Toggling cart, current state:', isCartOpen.value)
  isCartOpen.value = !isCartOpen.value
}
const isCheckoutOpen = ref(false)
const isSuccess = ref(false)
const selectedProduct = ref(null)
const products = ref([])
const isLoading = ref(true)
const { totalItems, cart } = useCart()

const fetchProducts = async () => {
  try {
    const { products: fetchedProducts } = await medusa.store.product.list()
    products.value = fetchedProducts
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

const openDetails = (product) => {
  selectedProduct.value = product
}

const handleCheckoutSuccess = () => {
  isCheckoutOpen.value = false
  isSuccess.value = true
  // Reset cart for POC demo
  cart.value = []
}

const resetFlow = () => {
  isSuccess.value = false
  isCartOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Navbar -->
    <header class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63L11 2h1a1 1 0 0 1 1 1v7l7.22 1A1 1 0 0 1 21 12.63L13 22h-1a1 1 0 0 1-1-1v-7Z"/></svg>
            </div>
            <span class="text-2xl font-black tracking-tight text-slate-900">MEDUSA<span class="text-primary-600">VUE</span></span>
          </div>
          
          <nav class="hidden md:flex items-center gap-8">
            <a href="#" class="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Products</a>
            <a href="#" class="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Collections</a>
            <a href="#" class="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">About</a>
          </nav>

          <div class="flex items-center gap-4">
            <button class="p-2 text-slate-500 hover:text-slate-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <button 
              @click="toggleCart"
              class="relative p-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              <span 
                v-if="totalItems > 0"
                class="absolute top-0 right-0 w-4 h-4 bg-primary-600 text-[10px] font-bold text-white flex items-center justify-center rounded-full animate-bounce"
              >{{ totalItems }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <CartSidebar 
      :is-open="isCartOpen" 
      @close="isCartOpen = false" 
      @checkout="isCheckoutOpen = true"
    />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <section class="mb-16 relative rounded-3xl overflow-hidden bg-slate-900 py-20 px-8 text-center text-white shadow-2xl">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent"></div>
        <div class="relative z-10 max-w-2xl mx-auto">
          <h1 class="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Elevate Your <span class="text-primary-400">Commerce</span> Experience
          </h1>
          <p class="text-slate-400 text-lg mb-10 font-medium leading-relaxed">
            The next generation marketplace powered by Medusa.js 2.0 and Vue 3. Blazing fast, beautiful, and modular.
          </p>
          <div class="flex items-center justify-center gap-4">
            <button class="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary-600/30">
              Shop Now
            </button>
            <button class="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>

        <!-- Loading State -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="i in 4" :key="i" class="bg-white rounded-2xl overflow-hidden shadow-sm h-[400px] animate-pulse">
            <div class="h-64 bg-slate-100"></div>
            <div class="p-6 space-y-4">
              <div class="h-4 bg-slate-100 rounded w-2/3"></div>
              <div class="h-4 bg-slate-100 rounded w-1/2"></div>
              <div class="h-8 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>

        <!-- Products Feed -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            @show-details="openDetails"
          />
        </div>
        
        <!-- Empty State -->
        <div v-if="!isLoading && products.length === 0" class="text-center py-20">
          <div class="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-open"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">No products found</h3>
          <p class="text-slate-500">Make sure your Medusa backend is seeded with data.</p>
        </div>
    </main>

    <ProductModal 
      v-if="selectedProduct"
      :product="selectedProduct"
      :is-open="!!selectedProduct"
      @close="selectedProduct = null"
    />

    <CheckoutOverlay 
      v-if="isCheckoutOpen"
      :is-open="isCheckoutOpen"
      @close="isCheckoutOpen = false"
      @success="handleCheckoutSuccess"
    />

    <SuccessState 
      v-if="isSuccess"
      @close="resetFlow"
    />

    <!-- Footer -->
    <footer class="bg-white border-t border-slate-100 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
        <p class="text-sm font-medium">&copy; 2026 MedusaVue Marketplace. Built with passion and code.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Custom animations if needed */
</style>
