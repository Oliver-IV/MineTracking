package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class SimulationShipmentDTO(
    @SerializedName("material") val material: String,
    @SerializedName("quantity") val quantity: Int
)
