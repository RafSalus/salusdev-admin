import { useEffect, type RefObject } from "react"

export interface UseDismissOptions {
  enabled?: boolean
  ref: RefObject<HTMLElement | null>
  onDismiss: () => void
  ignoreRef?: RefObject<HTMLElement | null>
}

export function useDismiss({
  enabled = true,
  ref,
  onDismiss,
  ignoreRef,
}: UseDismissOptions) {
  useEffect(() => {
    if (!enabled) return

    function handlePointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node | null
      if (!target) return

      // Se clicou dentro do elemento monitorado, ignora
      if (ref.current && ref.current.contains(target)) {
        return
      }

      // Se clicou no gatilho ou elemento a ser ignorado, ignora
      if (ignoreRef && ignoreRef.current && ignoreRef.current.contains(target)) {
        return
      }

      onDismiss()
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onDismiss()
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled, ref, onDismiss, ignoreRef])
}
