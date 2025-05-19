package gui.mvts_mobile.dto.login

import com.google.gson.annotations.SerializedName

data class UserDTO(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("email") val email: String


){
    override fun toString(): String {
        return "UserDTO(id='$id', name='$name', email='$email')"
    }
}
