import type { KartDashboardMetrics, KartPilot, KartUnit } from "../types/kartControl.types"

export const initialKartMetrics: KartDashboardMetrics = {
  pilots: 57,
  nextRegistrations: 11,
  lastResult: "ETAPA - 10 - OUTUBRO",
  events: 20,
}

export const initialKartUnits: KartUnit[] = [
  { id: "apucarana", name: "Kart Apucarana" },
  { id: "londrina", name: "Kart Londrina (Em breve)" },
  { id: "maringa", name: "Kart Maringá (Em breve)" },
]

export const initialKartPilots: KartPilot[] = [
  {
    id: 1,
    name: "Patrícia A",
    email: "patricia-a-temp@kartapucarana.com",
    phone: "43999999999",
    status: "Pendente",
    date: "26/09/2026",
  },
  {
    id: 2,
    name: "Reinaldo H",
    email: "reinaldo-h-temp@kartapucarana.com",
    phone: "43999999999",
    status: "Pendente",
    date: "25/09/2026",
  },
  {
    id: 3,
    name: "Ana Julia",
    email: "ana-julia-temp@kartapucarana.com",
    phone: "43999999999",
    status: "Pendente",
    date: "25/09/2026",
  },
  {
    id: 4,
    name: "Villa",
    email: "villa-kartapucarana-com-temp@kartapucarana.com",
    phone: "43999999999",
    status: "Pendente",
    date: "24/07/2026",
  },
  {
    id: 5,
    name: "Cesar A",
    email: "camalvez@gmail.com",
    phone: "43988105328",
    status: "Ativo",
    date: "24/07/2026",
  },
  {
    id: 6,
    name: "Elielton R",
    email: "elieltonr@kartapucaran.com",
    phone: "43999999999",
    status: "Pendente",
    date: "29/05/2026",
  },
  {
    id: 7,
    name: "Luis E",
    email: "luise@kartapucarana.com",
    phone: "43999999999",
    status: "Pendente",
    date: "29/05/2026",
  },
  {
    id: 8,
    name: "Lucas M",
    email: "lucasm9883@gmail.com",
    phone: "43999175407",
    status: "Ativo",
    date: "27/04/2026",
  },
  {
    id: 9,
    name: "Thales T",
    email: "thalestoledo.wcr@gmail.com",
    phone: "43999358551",
    status: "Ativo",
    date: "27/04/2026",
  },
  {
    id: 10,
    name: "Douglas P",
    email: "douglasp@email.com",
    phone: "43999999999",
    status: "Ativo",
    date: "25/04/2026",
  },
]
