package gui.mvts_mobile.dto.vehicle

import com.google.gson.annotations.SerializedName

data class CapacityDTO(
    @SerializedName("capacityId") val capacityId: String,
    @SerializedName("measurementUnit") val measurementUnit: Int,
    @SerializedName("value") val value: Int
    )
