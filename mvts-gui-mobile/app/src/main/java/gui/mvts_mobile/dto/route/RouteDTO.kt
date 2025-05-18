package gui.mvts_mobile.dto.route

import com.google.gson.annotations.SerializedName

data class RouteDTO(
    @SerializedName("routeId") val id: String,
    @SerializedName("start") val start: PointDTO,
    @SerializedName("end") val end: PointDTO,
)
