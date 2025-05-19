package gui.mvts_mobile.dto.singleton

import gui.mvts_mobile.dto.login.UserDTO
import gui.mvts_mobile.dto.route.RouteDTO
import gui.mvts_mobile.dto.shipment.ShipmentDTO
import gui.mvts_mobile.dto.vehicle.VehicleDTO

class AppDataSingleton private constructor() {
    // Propiedades que quieres compartir entre pantallas
    var user: UserDTO? = null
    var token: String = ""
    var route : RouteDTO? = null
    var shipment : ShipmentDTO? = null
    var vehicleDTO : VehicleDTO? = null

    // Puedes agregar más propiedades según tus necesidades
    var appSettings: MutableMap<String, Any> = mutableMapOf()

    // Lista de ejemplo para datos más complejos
    var recentItems: MutableList<String> = mutableListOf()

    // Método para reiniciar los datos si es necesario
    fun reset() {
        user = null
        route = null
        shipment = null
        vehicleDTO = null
        token = ""

        appSettings.clear()
        recentItems.clear()
    }

    companion object {
        // La instancia única del Singleton
        @Volatile
        private var INSTANCE: AppDataSingleton? = null

        // Método para obtener la instancia (thread-safe)
        fun getInstance(): AppDataSingleton {
            return INSTANCE ?: synchronized(this) {
                // Si la instancia es nula, crear una nueva
                val instance = AppDataSingleton()
                INSTANCE = instance
                instance
            }
        }
    }
}