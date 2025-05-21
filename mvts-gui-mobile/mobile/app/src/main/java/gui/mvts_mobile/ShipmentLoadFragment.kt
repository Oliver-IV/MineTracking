package gui.mvts_mobile

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.fragment.app.Fragment
import gui.mvts_mobile.dto.singleton.AppDataSingleton

class ShipmentLoadFragment : Fragment() {
    private lateinit var simulationIdText: TextView
    private lateinit var vehicleInfoText: TextView
    private lateinit var routeInfoText: TextView
    private lateinit var materialInfoText: TextView
    private lateinit var quantityInfoText: TextView
    private lateinit var btnFinish: Button

    private val appData = AppDataSingleton.getInstance()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_shipment_load, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        simulationIdText = view.findViewById(R.id.simulationIdText)
        vehicleInfoText = view.findViewById(R.id.vehicleInfoText)
        routeInfoText = view.findViewById(R.id.routeInfoText)
        materialInfoText = view.findViewById(R.id.materialInfoText)
        quantityInfoText = view.findViewById(R.id.quantityInfoText)
        btnFinish = view.findViewById(R.id.btnFinish)

        // Display shipment information
        val simulationId = arguments?.getString("simulation_id")
        simulationIdText.text = "ID de Simulación: ${simulationId ?: "N/A"}"
        vehicleInfoText.text = "Vehículo: ${appData.vehicle?.name ?: "N/A"}"

        appData.route?.let { route ->
            routeInfoText.text = "Ruta: ${route.start.name} -> ${route.end.name}"
        } ?: run {
            routeInfoText.text = "Ruta: N/A"
        }

        materialInfoText.text = "Material: ${appData.material?.textoMostrar ?: "N/A"}"
        quantityInfoText.text = "Cantidad: ${appData.quantity}"

        btnFinish.setOnClickListener {
            (activity as? MainActivity)?.replaceFragment(HomeFragment())
        }
    }
}