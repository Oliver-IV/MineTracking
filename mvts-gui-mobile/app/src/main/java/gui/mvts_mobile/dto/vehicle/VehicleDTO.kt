package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class VehicleDTO(
    @SerializedName("carId") val id: String,
    @SerializedName("name") val name: Int,
    @SerializedName("capacity") val capacity: CapacityDTO,
    @SerializedName("type") val type: Int,
    @SerializedName("state") val state: Int,
)
