package gui.mvts_mobile.dto.login

import com.google.gson.annotations.SerializedName

data class LoginResponseDTO(
    @SerializedName("success") val success: Boolean,
    @SerializedName("user") val user: UserDTO,
    @SerializedName("token") val token: String
)