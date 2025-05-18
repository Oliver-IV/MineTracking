package gui.mvts_mobile.dto.login

import com.google.gson.annotations.SerializedName

data class ErrorResponse(
    @SerializedName("message") val message: String
)
