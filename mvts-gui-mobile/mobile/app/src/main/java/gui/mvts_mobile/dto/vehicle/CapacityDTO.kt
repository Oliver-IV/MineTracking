package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class CapacityDTO(
    @SerializedName("capacityId") val id: String,
    @SerializedName("measurementUnit") val measureUnit: Int,
    @SerializedName("value") val value: Int,
    )
