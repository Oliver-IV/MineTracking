package gui.mvts_mobile

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.Toast
import androidx.fragment.app.Fragment
import gui.mvts_mobile.dto.route.RouteDTO
import gui.mvts_mobile.dto.route.RoutesDTO
import gui.mvts_mobile.dto.route.SimulationDataDTO
import gui.mvts_mobile.dto.route.SimulationResponse
import gui.mvts_mobile.dto.shipment.ShipmentCreateDTO
import gui.mvts_mobile.dto.shipment.ShipmentResponseDTO
import gui.mvts_mobile.dto.singleton.AppDataSingleton
import gui.mvts_mobile.dto.vehicle.SimulationShipmentDTO
import gui.mvts_mobile.dto.vehicle.SimulationVehicleDTO
import gui.mvts_mobile.dto.vehicle.VehicleDTO
import gui.mvts_mobile.dto.vehicle.VehicleResponse
import gui.mvts_mobile.enums.MaterialEnum
import gui.mvts_mobile.service.ApiService
import gui.mvts_mobile.utils.RetroFitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ShipmentFragment : Fragment() {
    private lateinit var materialsSpinner: Spinner
    private lateinit var vehiclesSpinner: Spinner
    private lateinit var routesSpinner: Spinner
    private lateinit var btnRegisterShipment: Button
    private lateinit var txtQuantity: EditText

    private lateinit var apiService: ApiService
    private lateinit var simulationService: ApiService

    private var vehiclesList: List<VehicleDTO> = emptyList()
    private var routesList: List<RouteDTO> = emptyList()

    private val appData = AppDataSingleton.getInstance()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_shipment, container, false)

        // Initialize components
        materialsSpinner = view.findViewById(R.id.spinner_materials)
        vehiclesSpinner = view.findViewById(R.id.spinner_vehicles)
        routesSpinner = view.findViewById(R.id.spinner_routes)
        btnRegisterShipment = view.findViewById(R.id.btnLogCongestion)
        txtQuantity = view.findViewById(R.id.txtCantidad)

        // Initialize API services
        apiService = RetroFitClient.getAuthenticatedApiService(appData.token, requireContext())
        simulationService = RetroFitClient.getSimulationService(requireContext())

        // Setup adapters
        setupMaterialsSpinner()
        loadVehicles()
        loadRoutes()

        // Set button listener
        btnRegisterShipment.setOnClickListener {
            registerShipment()
        }

        return view
    }

    private fun setupMaterialsSpinner() {
        val materials = MaterialEnum.getDisplayNames()
        val adapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_spinner_item,
            materials
        )
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        materialsSpinner.adapter = adapter
    }

    private fun loadVehicles() {
        apiService.findAllCars().enqueue(object : Callback<List<VehicleDTO>> {
            override fun onResponse(call: Call<List<VehicleDTO>>, response: Response<List<VehicleDTO>>) {
                if (response.isSuccessful) {
                    vehiclesList = response.body() ?: emptyList()

                    // Filtrar vehículos disponibles (state = 0 según tu respuesta)
                    val availableVehicles = vehiclesList.filter { it.state == 0 }

                    if (availableVehicles.isEmpty()) {
                        showError("No hay vehículos disponibles")
                        return
                    }

                    val vehicleNames = availableVehicles.map {
                        "${it.name} (Capacidad: ${it.capacity.value} ${getUnit(it.capacity.measurementUnit)})"
                    }

                    val adapter = ArrayAdapter(
                        requireContext(),
                        android.R.layout.simple_spinner_item,
                        vehicleNames
                    ).apply {
                        setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    }

                    vehiclesSpinner.adapter = adapter

                    // Log para depuración
                    Log.d("VEHICLES_LOADED", "Vehículos cargados: ${availableVehicles.size}")

                } else {
                    val errorMsg = "Error al cargar vehículos. Código: ${response.code()}"
                    showError(errorMsg)
                    Log.e("API_ERROR", errorMsg)
                    Log.e("API_ERROR", "Error body: ${response.errorBody()?.string()}")
                }
            }

            override fun onFailure(call: Call<List<VehicleDTO>>, t: Throwable) {
                val errorMsg = "Error de conexión: ${t.message}"
                showError(errorMsg)
                Log.e("API_FAILURE", errorMsg)
                Log.e("API_FAILURE", "Stack trace: ${t.stackTraceToString()}")
            }
        })
    }

    private fun getUnit(unit: Int): String {
        return when (unit) {
            0 -> "unidades"
            1 -> "kg"
            2 -> "ton"
            3 -> "m³"
            else -> "unidades"
        }
    }

    private fun loadRoutes() {
        apiService.getRoutes().enqueue(object : Callback<RoutesDTO> {
            override fun onResponse(call: Call<RoutesDTO>, response: Response<RoutesDTO>) {
                if (response.isSuccessful) {
                    routesList = response.body()?.routes ?: emptyList()
                    val routeNames = routesList.map {
                        "Ruta: ${it.start.name} -> ${it.end.name}"
                    }

                    val adapter = ArrayAdapter(
                        requireContext(),
                        android.R.layout.simple_spinner_item,
                        routeNames
                    )
                    adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    routesSpinner.adapter = adapter
                } else {
                    showError("Error al cargar rutas")
                }
            }

            override fun onFailure(call: Call<RoutesDTO>, t: Throwable) {
                showError("Fallo al conectar con el servidor")
            }
        })
    }

    private fun registerShipment() {
        val quantityText = txtQuantity.text.toString()
        if (quantityText.isEmpty()) {
            showError("Ingrese la cantidad")
            return
        }

        val quantity = quantityText.toIntOrNull()
        if (quantity == null || quantity <= 0) {
            showError("Cantidad inválida")
            return
        }

        // Check for valid selections in spinners
        if (vehiclesSpinner.selectedItemPosition == -1 ||
            routesSpinner.selectedItemPosition == -1 ||
            materialsSpinner.selectedItemPosition == -1) {
            showError("Seleccione todos los campos")
            return
        }

        // Get selected items with validation
        val selectedVehicleIndex = vehiclesSpinner.selectedItemPosition
        val selectedRouteIndex = routesSpinner.selectedItemPosition

        // Verify indexes are within bounds
        if (selectedVehicleIndex >= vehiclesList.size || selectedRouteIndex >= routesList.size) {
            showError("Error en la selección, por favor inténtelo de nuevo")
            return
        }

        val vehicle = vehiclesList[selectedVehicleIndex]
        val route = routesList[selectedRouteIndex]
        val selectedMaterial = MaterialEnum.fromDisplayName(materialsSpinner.selectedItem.toString())

        if (selectedMaterial == null) {
            showError("Material no válido")
            return
        }

        // Create DTOs - Pass the IDs as String instead of converting to Int
        val shipmentCreateDTO = ShipmentCreateDTO(
            id = "",
            idVehicle = vehicle.carId,  // No conversion to Int
            idRoute = route.id          // No conversion to Int
        )

        val simulationVehicleDTO = SimulationVehicleDTO(
            carId = vehicle.carId,
            name = vehicle.name.toString(),
            shipment = SimulationShipmentDTO(
                material = selectedMaterial.name,
                quantity = quantity
            )
        )

        val simulationDataDTO = SimulationDataDTO(
            origin = route.start,
            destination = route.end,
            car = simulationVehicleDTO
        )

        // Register shipment
        apiService.createShipment(shipmentCreateDTO).enqueue(object : Callback<ShipmentResponseDTO> {
            override fun onResponse(call: Call<ShipmentResponseDTO>, response: Response<ShipmentResponseDTO>) {
                when {
                    response.isSuccessful -> {
                        // Éxito, continuar con simulación
                        startSimulation(simulationDataDTO)
                    }
                    response.code() == 401 -> {
                        // Token inválido
                        showError("Sesión expirada")
                        redirectToLogin()
                    }
                    else -> {
                        showError("Error al registrar cargamento: ${response.code()}")
                    }
                }
            }

            override fun onFailure(call: Call<ShipmentResponseDTO>, t: Throwable) {
                showError("Fallo de conexión: ${t.message}")
            }
        })
    }

    private fun redirectToLogin() {
        activity?.run {
            val intent = Intent(this, LoginActivity::class.java).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            }
            startActivity(intent)
            finish()
        }
    }

    private fun startSimulation(simulationDataDTO: SimulationDataDTO) {
        Log.d("SIMULATION", "Iniciando simulación con token: ${appData.token.take(10)}...")

        simulationService.startSimulation(simulationDataDTO).enqueue(object : Callback<SimulationResponse> {
            override fun onResponse(call: Call<SimulationResponse>, response: Response<SimulationResponse>) {
                Log.d("SIMULATION", "Respuesta código: ${response.code()}")
                if (response.isSuccessful) {
                    navigateToShipmentLoad(response.body()?.simulationId)
                } else if (response.code() == 401) {
                    redirectToLogin()
                }
            }

            override fun onFailure(call: Call<SimulationResponse>, t: Throwable) {
                Log.e("SIMULATION", "Error: ${t.message}")
            }
        })
    }

    private fun navigateToShipmentLoad(simulationId: String?) {
        val fragment = ShipmentLoadFragment().apply {
            arguments = Bundle().apply {
                putString("simulation_id", simulationId)
            }
        }

        parentFragmentManager.beginTransaction()
            .replace(R.id.fragment_container, fragment)
            .addToBackStack(null)
            .commit()
    }

    private fun showError(message: String) {
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
    }
}