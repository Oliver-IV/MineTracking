import { HOST_NAME } from "@/configs/configs";
import type { ReportDetailsDTO } from "../types/back/reportsDto/report.detailts.dto";
async function POSTgeneratePDF(reportsDetails: ReportDetailsDTO): Promise<void> {
    try {
        const response = await fetch(`${HOST_NAME}/reports/`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reportsDetails),
        });
        if (!response.ok) {
            throw new Error(`Error comunicating with the server`);
        }
        const blob = await response.blob();
        const pdfUrl = window.URL.createObjectURL(blob);
        window.open(pdfUrl, '_blank');
    } catch (error) {
        console.error("Error: ", error) ;
        throw error;
    }
}

export { POSTgeneratePDF };