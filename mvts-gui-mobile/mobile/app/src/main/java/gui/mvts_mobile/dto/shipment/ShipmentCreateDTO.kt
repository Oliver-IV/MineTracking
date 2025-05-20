package gui.mvts_mobile.dto.shipment

import com.google.gson.annotations.SerializedName

data class ShipmentCreateDTO(
    @SerializedName("id") val id: Int,
    @SerializedName("idVehicle") val idVehicle: Int,
    @SerializedName("idRoute") val idRoute: Int,
)
