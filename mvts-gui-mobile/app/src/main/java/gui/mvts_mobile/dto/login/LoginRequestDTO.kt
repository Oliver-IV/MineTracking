package gui.mvts_mobile.dto.login

import com.google.gson.annotations.SerializedName

data class LoginRequestDTO(
    @SerializedName("correo") val email: String,
    @SerializedName("contrasena") val password: String
)
