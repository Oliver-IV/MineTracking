package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class VehicleResponse(
    @SerializedName("data") val cars: List<VehicleDTO>
)
