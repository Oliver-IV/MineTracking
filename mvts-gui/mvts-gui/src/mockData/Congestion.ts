import type { Congestion } from '@/types/front/Congestion';

export const testCongestions: Congestion[] = [
    {
        id: 1,
        sector: "Avenida Siempre Viva",
        time: "2025-05-11 08:30",
        severity: "Alta",
        vehicle: 45,
        cause: "Congestion de vehículos",
        duration: 30
    },
    {
        id: 2,
        sector: "Calle Falsa 123",
        time: "2025-05-11 09:15",
        severity: "Media",
        vehicle: 30,
        cause: "Congestion de vehículos",
        duration: 45
    },
    {
        id: 3,
        sector: "Boulevard Central",
        time: "2025-05-11 10:00",
        severity: "Baja",
        vehicle: 12,
        cause: "Congestion de vehículos",
        duration: 15
    },
];
