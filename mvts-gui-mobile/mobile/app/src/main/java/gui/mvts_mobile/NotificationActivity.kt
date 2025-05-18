package gui.mvts_mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.ImageButton
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class NotificationActivity : AppCompatActivity() {
    private lateinit var txtTitle: TextView
    private lateinit var txtBody: TextView
    private lateinit var btnHome: Button

    // Declara las variables para los datos del Intent como no nulas.
    // Se inicializarán en loadIntentData.
    private lateinit var notificationTitle: String
    private lateinit var notificationBody: String

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge() // Asegúrate de entender las implicaciones de esto para el acceso a las vistas
        setContentView(R.layout.activity_notification)

        // Es crucial llamar a estos métodos DESPUÉS de setContentView
        loadIntentData()
        initComponents()
        populateUI()
        setupListeners()
    }

    private fun loadIntentData() {
        notificationTitle = intent.getStringExtra("title") ?: "Título por defecto"
        notificationBody = intent.getStringExtra("body") ?: "Mensaje por defecto."
    }

    private fun initComponents() {
        // Ahora findViewById asigna directamente a las propiedades no nulas.
        // Si R.id.notication_title (o los otros IDs) no existiera en tu layout R.layout.activity_notification,
        // findViewById devolvería null, y al intentar usar txtTitle más tarde,
        // obtendrías una UninitializedPropertyAccessException porque la asignación falló implícitamente
        // (aunque en este caso, si findViewById devuelve null, el problema es más profundo que solo lateinit).
        // Es más probable que si el ID es incorrecto, la app crashee directamente al intentar asignar a una variable non-null.
        // El uso de lateinit aquí significa que CONFÍAS en que findViewById encontrará la vista.
        txtTitle = findViewById(R.id.notication_title)
        txtBody = findViewById(R.id.notication_body)
        btnHome = findViewById(R.id.btnHome)
    }

    private fun populateUI() {
        // Como txtTitle, txtBody, notificationTitle, y notificationBody
        // ahora se tratan como no nulos, no necesitas el operador de llamada segura (?.)
        txtTitle.text = notificationTitle
        txtBody.text = notificationBody
    }

    private fun setupListeners() {
        btnHome.setOnClickListener {
            // Aquí la lógica para el botón Home.
            // Por ejemplo, podrías finalizar esta actividad:
            // finish()
            // O navegar a tu actividad principal:
             val homeIntent = Intent(this, MainActivity::class.java)
             homeIntent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
             startActivity(homeIntent)
             finish() // Usualmente es bueno finalizar la Activity de notificación
        }
    }

}