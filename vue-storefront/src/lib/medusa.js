import Medusa from "@medusajs/js-sdk"

const medusa = new Medusa({
    baseUrl: import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000",
    publishableKey: import.meta.env.VITE_MEDUSA_PUBLISHABLE_KEY || "pk_04f29094f6e64d4dea001b6899224a07c35d774798fd8fe18636cd196381e9b4",
    debug: process.env.NODE_ENV === 'development',
})

export default medusa
