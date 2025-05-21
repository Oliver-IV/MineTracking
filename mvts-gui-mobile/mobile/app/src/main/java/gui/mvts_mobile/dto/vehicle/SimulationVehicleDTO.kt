package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class SimulationVehicleDTO(
    @SerializedName("carId") val carId: String,
    @SerializedName("name") val name: String,
    @SerializedName("shipment") val shipment: SimulationShipmentDTO
)
