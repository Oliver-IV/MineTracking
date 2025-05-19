package gui.mvts_mobile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.Spinner
import android.widget.TextView
import androidx.fragment.app.Fragment
import gui.mvts_mobile.dto.congestion.CongestionCreateDTO
import gui.mvts_mobile.dto.congestion.CongestionResponseDTO
import gui.mvts_mobile.dto.login.LoginRequestDTO
import gui.mvts_mobile.dto.login.LoginResponseDTO
import gui.mvts_mobile.dto.shipment.ShipmentCreateDTO
import gui.mvts_mobile.dto.singleton.AppDataSingleton
import gui.mvts_mobile.enums.CongestionType
import gui.mvts_mobile.service.ApiService
import gui.mvts_mobile.utils.RetroFitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class CongestionFragment : Fragment() {
    val appData = AppDataSingleton.getInstance()
    private lateinit var apiService :ApiService
    private lateinit var congestionSpinner: Spinner
    private lateinit var btnLogCongestion: Button
    private lateinit var txtDescription: EditText
    private lateinit var txtTest: TextView



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_congestion, container, false)
        apiService = RetroFitClient.getAuthenticatedApiService(appData.token)

        congestionSpinner = view.findViewById(R.id.spinner_congestion)
        btnLogCongestion = view.findViewById(R.id.btnLogCongestion)
        txtDescription = view.findViewById(R.id.txtDescription)
        txtTest = view.findViewById(R.id.testing_input)
        txtTest.text = appData.token.toString()

        val adapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, CongestionType.getStrings())
        congestionSpinner.adapter = adapter


        btnLogCongestion.setOnClickListener {
            val posicion = congestionSpinner.selectedItemPosition
            val opcionSeleccionada = CongestionType.entries[posicion]
            val valorEntero = opcionSeleccionada.valorInterno
            val description = txtDescription.text.toString()
            txtTest.text = "$valorEntero $description"


            var congestionDTO  = CongestionCreateDTO(description,12.33,39.00)

            reportCongestion(congestionDTO)

        }

        return view
    }


    private fun reportCongestion(data: CongestionCreateDTO) {
        val retrofitTraer = apiService.createCongestion(data)
        retrofitTraer.enqueue(object: Callback<CongestionResponseDTO> {
            override fun onResponse(
                call: Call<CongestionResponseDTO>,
                response: Response<CongestionResponseDTO>
            ) {
                if (response.isSuccessful && response.body() != null) {

                    var id = response.body()!!.id
                    txtTest.text = "Se registro exitosamente la congestion con id: $id"

                    // Luego navegas a la pantalla principal

                } else {
                    txtTest.text = "Email o contraseña incorrectos"
                }
            }

            override fun onFailure(call: Call<CongestionResponseDTO>, t: Throwable) {
                txtTest.text = "Error de conexión: ${t.message}"
            }
        })
    }


}