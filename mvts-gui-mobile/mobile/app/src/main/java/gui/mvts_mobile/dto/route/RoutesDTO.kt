package gui.mvts_mobile.dto.route

import com.google.gson.annotations.SerializedName

data class RoutesDTO(
    @SerializedName("routes") val routes: List<RouteDTO>,
)
