package gui.mvts_mobile

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Spinner
import gui.mvts_mobile.dto.singleton.AppDataSingleton

class ShipmentFragment : Fragment() {
    val appData = AppDataSingleton.getInstance()
    private lateinit var materialsSpinner: Spinner
    private lateinit var vehiclesSpinner: Spinner
    private lateinit var routesSpinner: Spinner

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_shipment, container, false)

        vehiclesSpinner = view.findViewById(R.id.spinner_vehicles)
        materialsSpinner = view.findViewById(R.id.spinner_materials)
        routesSpinner = view.findViewById(R.id.spinner_routes)



        return view
    }


}