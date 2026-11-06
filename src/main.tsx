import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

// Registro do Service Worker Oficial (PWA-11)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.warn("Falha no registro do service worker:", err)
    })
  })
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
