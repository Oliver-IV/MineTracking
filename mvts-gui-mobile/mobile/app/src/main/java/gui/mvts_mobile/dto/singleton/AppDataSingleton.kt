package gui.mvts_mobile.dto.singleton

import gui.mvts_mobile.dto.login.UserDTO
import gui.mvts_mobile.dto.route.RouteDTO
import gui.mvts_mobile.dto.shipment.ShipmentDTO
import gui.mvts_mobile.dto.vehicle.VehicleDTO
import gui.mvts_mobile.enums.MaterialEnum

class AppDataSingleton private constructor() {
    var user: UserDTO? = null
    var token: String = ""
    var route: RouteDTO? = null
    var shipment: ShipmentDTO? = null
    var vehicle: VehicleDTO? = null
    var material: MaterialEnum? = null
    var quantity: Int = 0
    var simulationId: String? = null

    fun reset() {
        user = null
        route = null
        shipment = null
        vehicle = null
        material = null
        quantity = 0
        simulationId = null
        token = ""
    }

    companion object {
        @Volatile
        private var INSTANCE: AppDataSingleton? = null

        fun getInstance(): AppDataSingleton {
            return INSTANCE ?: synchronized(this) {
                val instance = AppDataSingleton()
                INSTANCE = instance
                instance
            }
        }
    }
}