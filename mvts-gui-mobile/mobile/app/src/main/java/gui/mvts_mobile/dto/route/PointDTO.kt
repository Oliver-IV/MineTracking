package gui.mvts_mobile.dto.route

import com.google.gson.annotations.SerializedName

data class PointDTO(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("latitude") val latitude: String,
    @SerializedName("longitude") val longitude: String,
)
