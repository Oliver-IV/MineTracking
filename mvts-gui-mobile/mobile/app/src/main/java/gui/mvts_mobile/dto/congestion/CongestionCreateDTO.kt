package gui.mvts_mobile.dto.congestion

import com.google.gson.annotations.SerializedName

data class CongestionCreateDTO(
    @SerializedName("name") val name: String,
    @SerializedName("lat") val latitude: Double,
    @SerializedName("lng") val longitude: Double,

    )
