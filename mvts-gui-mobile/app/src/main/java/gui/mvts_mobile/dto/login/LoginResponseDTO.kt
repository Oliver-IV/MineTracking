package gui.mvts_mobile.dto.login

import com.google.gson.annotations.SerializedName

data class LoginResponseDTO(
    @SerializedName("token") val token: String
)
