import { ref, computed } from 'vue'

const cart = ref([])

export const useCart = () => {
    const addToCart = (product) => {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }
    }

    const removeFromCart = (productId) => {
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    const updateQuantity = (productId, quantity) => {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity = Math.max(0, quantity)
            if (item.quantity === 0) removeFromCart(productId)
        }
    }

    const totalItems = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))

    const totalPrice = computed(() => {
        return cart.value.reduce((total, item) => {
            const price = item.variants?.[0]?.prices?.[0]?.amount || 0
            return total + (price * item.quantity)
        }, 0)
    })

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice
    }
}
