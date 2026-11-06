import { useState } from "react"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import type { Product } from "@/features/products/types/product.types"
import { ProductHeroHeader } from "./components/ProductHeroHeader"
import { ProductDemoBanner } from "./components/ProductDemoBanner"
import { ProductAdminCard } from "./components/ProductAdminCard"
import { ProductTechnicalInfoCard } from "./components/ProductTechnicalInfoCard"
import { ProductAccessCard } from "./components/ProductAccessCard"
import { ProductChangePasswordCard } from "./components/ProductChangePasswordCard"
import { ProductConfigModal } from "./components/ProductConfigModal"

export interface ProductManagementScreenProps {
  product: Product
  onBackToPortfolio: () => void
  onUpdateProduct: (patch: Partial<Product>) => void
  onEnterAdmin?: () => void
}

interface ModalState {
  field: keyof Product
  title: string
  label: string
  currentValue: string
  placeholder?: string
}

export function ProductManagementScreen({
  product,
  onBackToPortfolio,
  onUpdateProduct,
  onEnterAdmin,
}: ProductManagementScreenProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<ModalState | null>(null)

  function showToast(message: string) {
    setToastMessage(message)
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev))
    }, 3200)
  }

  function handleCopy(text: string, label: string) {
    if (!text || text === "Não informado" || text === "Não configurado") {
      showToast(`${label} ainda não configurado para cópia.`)
      return
    }

    navigator.clipboard?.writeText(text)
    showToast(`${label} copiado para a área de transferência!`)
  }

  function handleOpenExternal(url: string) {
    if (!url || url === "Não informado" || url === "Não configurado") {
      showToast("Endereço web não configurado.")
      return
    }

    const normalizedUrl = url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`
    window.open(normalizedUrl, "_blank", "noopener,noreferrer")
  }

  function handleEditField(
    field: keyof Product,
    title: string,
    label: string,
    currentValue: string
  ) {
    setActiveModal({
      field,
      title,
      label,
      currentValue: currentValue === "Não informado" || currentValue === "Não configurado" ? "" : currentValue,
    })
  }

  function handleSaveField(value: string) {
    if (!activeModal) return

    const finalVal = value.trim() || (activeModal.field === "databaseName" || activeModal.field === "adminEmail" ? "Não informado" : "Não configurado")
    onUpdateProduct({ [activeModal.field]: finalVal })
    showToast(`${activeModal.label} atualizado com sucesso!`)
    setActiveModal(null)
  }

  function handleSavePassword(_newPassword: string) {
    onUpdateProduct({
      adminPasswordMasked: "•••••••••••••••",
    })
    showToast("Senha administrativa alterada com sucesso!")
  }

  function handleEnterAdminInternal() {
    if (onEnterAdmin) {
      onEnterAdmin()
    } else {
      showToast("Acessando painel administrativo do KartControl...")
    }
  }

  function handleScrollToPassword() {
    const el = document.getElementById("alterar-senha-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      const firstInput = el.querySelector("input")
      if (firstInput) {
        window.setTimeout(() => firstInput.focus(), 300)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Botão de Retorno no topo */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToPortfolio}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl text-xs sm:text-sm font-bold text-[#4a5f56] hover:text-[#142821] transition active:scale-95"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao portfólio</span>
        </button>
      </div>

      {/* 1. Hero do Produto */}
      <ProductHeroHeader
        name={product.name}
        short={product.short}
        category={product.category}
        description={product.description}
        status={product.status}
        clients={product.clients}
        progress={product.progress}
        color={product.color}
      />

      {/* 2. Banner de Demonstração */}
      <ProductDemoBanner />

      {/* 3. Card Administração */}
      <ProductAdminCard
        adminConfigured={product.adminConfigured}
        adminStatusLabel={product.adminPanelUrl === "Não configurado" ? "Não configurado" : product.adminPanelUrl}
        onEnterAdmin={handleEnterAdminInternal}
      />

      {/* 4. Grade de 2 colunas: Informações técnicas e Acessos do produto */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductTechnicalInfoCard
          repositoryUrl={product.repositoryUrl || product.repoUrl || "github.com/salusdev/kart-control"}
          databaseName={product.databaseName || "Não informado"}
          webUrl={product.webUrl || product.appUrl || "kart.salusdev.com"}
          onCopy={handleCopy}
          onOpenExternal={handleOpenExternal}
          onEditField={(field, title, label, current) => handleEditField(field, title, label, current)}
        />

        <ProductAccessCard
          adminPanelUrl={product.adminPanelUrl || "Não configurado"}
          adminEmail={product.adminEmail || "Não informado"}
          adminPasswordMasked={product.adminPasswordMasked || "•••••••••••••••"}
          onEditField={(field, title, label, current) => handleEditField(field, title, label, current)}
          onRequestChangePassword={handleScrollToPassword}
        />
      </div>

      {/* 5. Card Alterar senha */}
      <ProductChangePasswordCard
        onSavePassword={handleSavePassword}
      />

      {/* Rodapé institucional */}
      <footer className="pt-2 pb-6 text-center">
        <p className="text-[11px] font-semibold text-[#8a9992]">
          SalusDev · Informações e acessos do produto
        </p>
      </footer>

      {/* Modal de Configuração Rápida */}
      {activeModal && (
        <ProductConfigModal
          open={Boolean(activeModal)}
          title={activeModal.title}
          label={activeModal.label}
          initialValue={activeModal.currentValue}
          onClose={() => setActiveModal(null)}
          onSave={handleSaveField}
        />
      )}

      {/* Notificação Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#163e32]/12 bg-[#163e32] px-4 py-3 text-xs font-bold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 size={16} className="text-[#a4e2c6] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
