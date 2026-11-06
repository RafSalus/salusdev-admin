import { useState } from "react"
import { Users, Calendar, Award, GitMerge, CheckCircle2 } from "lucide-react"
import type { KartSection, KartPilot, KartUnit } from "./types/kartControl.types"
import { initialKartMetrics, initialKartPilots, initialKartUnits } from "./data/kartControl.mock"
import { KartSidebar } from "./components/KartSidebar"
import { KartTopbar } from "./components/KartTopbar"
import { KartDashboardView } from "./components/KartDashboardView"
import { KartPlaceholderView } from "./components/KartPlaceholderView"
import { PilotEditModal } from "./components/PilotEditModal"

export interface KartControlAppProps {
  onExit: () => void
}

export function KartControlApp({ onExit }: KartControlAppProps) {
  const [currentSection, setCurrentSection] = useState<KartSection>("Início")
  const [metrics, setMetrics] = useState(initialKartMetrics)
  const [pilots, setPilots] = useState<KartPilot[]>(initialKartPilots)
  const [currentUnit, setCurrentUnit] = useState<KartUnit>(initialKartUnits[0])
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [editingPilot, setEditingPilot] = useState<KartPilot | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  function showToast(msg: string) {
    setToastMessage(msg)
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev))
    }, 3200)
  }

  function handleRefresh() {
    setMetrics((prev) => ({
      ...prev,
      pilots: pilots.length,
    }))
    showToast("Dados operacionais do KartControl atualizados!")
  }

  function handleSavePilot(updated: KartPilot) {
    setPilots((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    )
    showToast(`Piloto ${updated.name} atualizado com sucesso!`)
  }

  function handleSelectUnit(unit: KartUnit) {
    setCurrentUnit(unit)
    showToast(`Unidade alterada para ${unit.name}`)
  }

  function handleOpenSite() {
    window.open("https://kart.salusdev.com", "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex min-h-screen bg-[#f5f6f2] text-[#142821]">
      {/* Sidebar Desktop Fixa */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-[252px]">
        <KartSidebar
          currentSection={currentSection}
          onSelectSection={setCurrentSection}
          onExitToSalusDev={onExit}
        />
      </div>

      {/* Drawer Mobile da Sidebar */}
      {mobileDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex lg:hidden"
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-[#0b1a15]/50 backdrop-blur-xs animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Gaveta lateral móvel */}
          <div className="relative z-50 h-full w-[270px] bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            <KartSidebar
              currentSection={currentSection}
              onSelectSection={setCurrentSection}
              onExitToSalusDev={onExit}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Área Principal de Conteúdo */}
      <div className="flex-1 lg:pl-[252px] flex flex-col min-w-0">
        <KartTopbar
          currentSection={currentSection}
          currentUnit={currentUnit}
          availableUnits={initialKartUnits}
          onSelectUnit={handleSelectUnit}
          onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
          onExitToSalusDev={onExit}
          onOpenSite={handleOpenSite}
        />

        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-7 sm:py-8 pb-32 lg:pb-8">
          {currentSection === "Início" ? (
            <KartDashboardView
              metrics={metrics}
              pilots={pilots}
              onRefresh={handleRefresh}
              onEditPilot={setEditingPilot}
            />
          ) : currentSection === "Pilotos" ? (
            <KartPlaceholderView
              sectionTitle="Pilotos cadastrados"
              description="Módulo de cadastro completo, busca, edição em lote e gestão de categorias dos pilotos."
              icon={Users}
              onBackToHome={() => setCurrentSection("Início")}
            />
          ) : currentSection === "Calendário" ? (
            <KartPlaceholderView
              sectionTitle="Gestão de calendário"
              description="Agendamento de baterias, campeonatos e etapas do kartódromo."
              icon={Calendar}
              onBackToHome={() => setCurrentSection("Início")}
            />
          ) : currentSection === "Resultados" ? (
            <KartPlaceholderView
              sectionTitle="Resultados e tempos"
              description="Telemetria, cronometragem e classificação oficial das etapas."
              icon={Award}
              onBackToHome={() => setCurrentSection("Início")}
            />
          ) : (
            <KartPlaceholderView
              sectionTitle="Mesclar registros"
              description="Unificação de pilotos duplicados e consolidação de pontuações históricas."
              icon={GitMerge}
              onBackToHome={() => setCurrentSection("Início")}
            />
          )}
        </main>
      </div>

      {/* Modal de Edição de Piloto */}
      <PilotEditModal
        pilot={editingPilot}
        open={Boolean(editingPilot)}
        onClose={() => setEditingPilot(null)}
        onSave={handleSavePilot}
      />

      {/* Notificação Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-8 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-[#163e32]/12 bg-[#163e32] px-4 py-3 text-xs font-bold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <CheckCircle2 size={16} className="text-[#a4e2c6] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
