package gui.mvts_mobile.service

import gui.mvts_mobile.dto.congestion.CongestionCreateDTO
import gui.mvts_mobile.dto.congestion.CongestionResponseDTO
import gui.mvts_mobile.dto.login.LoginRequestDTO
import gui.mvts_mobile.dto.login.LoginResponseDTO
import gui.mvts_mobile.dto.route.RouteDTO
import gui.mvts_mobile.dto.route.RoutesDTO
import gui.mvts_mobile.dto.route.SimulationDataDTO
import gui.mvts_mobile.dto.route.SimulationResponse
import gui.mvts_mobile.dto.shipment.ShipmentCreateDTO
import gui.mvts_mobile.dto.shipment.ShipmentDTO
import gui.mvts_mobile.dto.shipment.ShipmentResponseDTO
import gui.mvts_mobile.dto.vehicle.VehicleDTO
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {
    @POST("auth/login")
    fun login(@Body loginRequest: LoginRequestDTO): Call<LoginResponseDTO>

    //Endpoint shipment service
    @POST("shipments/")
    fun createShipment(@Body shipmentRequest: ShipmentCreateDTO): Call<ShipmentResponseDTO>

    @GET("shipments/{id}")
    fun getShipmentById(@Path("id") shipmentId: String): Call<ShipmentDTO>


    @POST("/api/simulation/start")
    fun startSimulation(@Body simulationDataDTO: SimulationDataDTO): Call<SimulationResponse>

    //Endpoint congestion service
    @POST("congestions")
    fun createCongestion(@Body congestionRequest: CongestionCreateDTO): Call<CongestionResponseDTO>

    //Endpoint route service
    @GET("routes")
    fun getRoutes(): Call<RoutesDTO>

    @GET("cars")
    fun findAllCars(): Call<List<VehicleDTO>>
}