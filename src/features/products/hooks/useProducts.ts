import { useState, useMemo } from "react"
import { initialProducts } from "../data/products.mock"
import type { Product } from "../types/product.types"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("Todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase())
      const matchesStatus = status === "Todos" || product.status === status
      return matchesQuery && matchesStatus
    })
  }, [products, query, status])

  function openNewProduct() {
    setEditingProduct(undefined)
    setModalOpen(true)
  }

  function openEditProduct(product: Product) {
    setEditingProduct(product)
    setSelectedProduct(null)
    setModalOpen(true)
  }

  function saveProduct(product: Product) {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id)
      return exists
        ? current.map((item) => (item.id === product.id ? product : item))
        : [product, ...current]
    })
    setSelectedProduct(null)
    setModalOpen(false)
    setToast(
      editingProduct
        ? "Produto atualizado com sucesso."
        : "Produto cadastrado com sucesso."
    )
    window.setTimeout(() => setToast(""), 3200)
  }

  return {
    products,
    filteredProducts,
    query,
    setQuery,
    status,
    setStatus,
    selectedProduct,
    setSelectedProduct,
    editingProduct,
    modalOpen,
    setModalOpen,
    toast,
    openNewProduct,
    openEditProduct,
    saveProduct,
  }
}
