import { Icon } from "@/components/ui/Icon"

export interface HelpModalProps {
  onClose: () => void
}

export function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1d17]/45 p-4 backdrop-blur-xs"
    >
      <div className="w-full max-w-md rounded-2xl border border-[#173e32]/10 bg-white p-6 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between border-b border-[#173e32]/8 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef7f2] text-[#285b49]">
              <Icon name="help" size={18} />
            </div>
            <div>
              <h2 id="help-modal-title" className="text-base font-bold text-[#18342a]">
                Suporte e Acesso
              </h2>
              <p className="text-[11px] text-[#697a73]">
                Centro de Comando SalusDev
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#71827b] hover:bg-[#f2f4ef]"
            aria-label="Fechar"
          >
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs text-[#52655d] leading-relaxed">
          <p>
            O acesso a este ambiente é restrito ao operador administrativo da SalusDev e requer autenticação em dois fatores (MFA/2FA via TOTP).
          </p>
          <div className="rounded-xl border border-[#173e32]/10 bg-[#f7f9f6] p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#18342a]">Administrador:</span>
              <span className="text-[#285b49] font-medium">Rafael Amaral Salustiano</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#18342a]">E-mail de suporte:</span>
              <span className="text-[#285b49] font-medium">rafael@salusdev.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#18342a]">Localização:</span>
              <span>Apucarana - PR</span>
            </div>
          </div>
          <p className="text-[11px] text-[#71827a]">
            Caso tenha perdido seu dispositivo de autenticação ou precise redefinir seu fator de segurança, entre em contato diretamente pelo canal oficial.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-[#285b49] text-xs font-bold text-white shadow-xs hover:bg-[#1f4739]"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  )
}
