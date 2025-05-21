package gui.mvts_mobile.dto.shipment

import com.google.gson.annotations.SerializedName

data class ShipmentCreateDTO(
    @SerializedName("id") val id: String,
    @SerializedName("idVehicle") val idVehicle: String,
    @SerializedName("idRoute") val idRoute: String,
)
