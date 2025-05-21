package gui.mvts_mobile.dto.route

import com.google.gson.annotations.SerializedName

data class SimulationResponse(
    @SerializedName("message") val message: String,
    @SerializedName("simulationId") val simulationId: String
)
