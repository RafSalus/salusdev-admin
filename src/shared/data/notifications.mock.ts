import type { NotificationItem } from "../types/notification.types"

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Sessão MFA Aprovada",
    message: "Autenticação em dois fatores realizada com sucesso no dispositivo móvel.",
    time: "Hoje, 14:05",
    read: false,
    type: "success",
  },
  {
    id: "notif-2",
    title: "Novo Lead Recebido",
    message: "Auto Mecânica Apucarana solicitou demonstração do Salus Oficina.",
    time: "Hoje, 11:20",
    read: false,
    type: "info",
  },
  {
    id: "notif-3",
    title: "Backup Concluído",
    message: "Snapshot do banco de dados e instâncias concluído com 100% de integridade.",
    time: "Hoje, 03:00",
    read: true,
    type: "info",
  },
  {
    id: "notif-4",
    title: "Healthcheck dos Sistemas",
    message: "Todos os 5 serviços operando normalmente com latência média de 48ms.",
    time: "Ontem, 19:45",
    read: true,
    type: "success",
  },
]
