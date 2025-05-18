package gui.mvts_mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import gui.mvts_mobile.dto.login.LoginRequestDTO
import gui.mvts_mobile.dto.login.LoginResponseDTO
import gui.mvts_mobile.dto.login.UserDTO
import gui.mvts_mobile.dto.singleton.AppDataSingleton
import gui.mvts_mobile.service.ApiService
import gui.mvts_mobile.utils.RetroFitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {
    private lateinit var txtEmail: EditText
    private lateinit var txtPassword: EditText
    private lateinit var txtError: TextView
    private lateinit var btnHome: Button
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_login)
        apiService = RetroFitClient.getApiService(this)
        initComponents()
        setupListeners()
    }

    private fun initComponents() {
        txtEmail = findViewById(R.id.email)
        txtPassword = findViewById(R.id.password)
        txtError = findViewById(R.id.error)
        btnHome = findViewById(R.id.login)
    }

    private fun setupListeners() {
        btnHome.setOnClickListener {
            val email = txtEmail.text.toString()
            val pass = txtPassword.text.toString()

            if(validateData()) {
                val user = LoginRequestDTO(email, pass)
//                loadLogin(user)

                var data = AppDataSingleton.getInstance()
                data.user = UserDTO("123", "Monkey D. Luffy", "luffy@gmail.com")
                data.token = "SuperSmashBros"
                changeDisplay()
            }
        }
    }

    private fun loadLogin(data: LoginRequestDTO) {
        val retrofitTraer = apiService.login(data)
        retrofitTraer.enqueue(object: Callback<LoginResponseDTO> {
            override fun onResponse(
                call: Call<LoginResponseDTO>,
                response: Response<LoginResponseDTO>
            ) {
                if (response.isSuccessful && response.body() != null) {
                    txtError.text = response.body()?.token
                    // Una vez que el inicio de sesión es exitoso, cambiamos a la actividad principal
//                    changeDisplay()
                } else {
                    txtError.text = "Email o contraseña incorrectos"
                }
            }

            override fun onFailure(call: Call<LoginResponseDTO>, t: Throwable) {
                txtError.text = "Error de conexión: ${t.message}"
            }
        })
    }

    private fun validateData(): Boolean {
        val email = txtEmail.text.toString()
        val pass = txtPassword.text.toString()

        if (email.isEmpty()) {
            txtError.text = "El email no puede estar vacío"
            return false
        }

        if (!android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            txtError.text = "Formato de email inválido"
            return false
        }

        if (pass.isEmpty()) {
            txtError.text = "La contraseña no puede estar vacía"
            return false
        }

        if (pass.length < 6) {
            txtError.text = "La contraseña debe tener al menos 6 caracteres"
            return false
        }

        return true
    }

    private fun changeDisplay() {
        val homeIntent = Intent(this, MainActivity::class.java)
        homeIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        startActivity(homeIntent)
        finish() // Cerramos la actividad de login
    }
}