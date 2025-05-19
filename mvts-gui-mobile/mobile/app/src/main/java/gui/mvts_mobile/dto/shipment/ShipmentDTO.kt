package gui.mvts_mobile.dto.shipment

import com.google.gson.annotations.SerializedName

data class ShipmentDTO(
    @SerializedName("id") val id: Int,
    @SerializedName("idVehicle") val idVehicle: Int,
    @SerializedName("idRoute") val idRoute: Int,
    @SerializedName("state") val state: Int,
    @SerializedName("material") val material: Int,
    @SerializedName("dateDelivered") val date: String
)
