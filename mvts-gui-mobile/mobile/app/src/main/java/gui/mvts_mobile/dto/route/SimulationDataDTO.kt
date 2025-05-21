package gui.mvts_mobile.dto.route

import com.google.gson.annotations.SerializedName
import gui.mvts_mobile.dto.vehicle.SimulationVehicleDTO
import gui.mvts_mobile.dto.vehicle.VehicleDTO

data class SimulationDataDTO(
    @SerializedName("origin") val origin: PointDTO,
    @SerializedName("destination") val destination: PointDTO,
    @SerializedName("car") val car: SimulationVehicleDTO
)
