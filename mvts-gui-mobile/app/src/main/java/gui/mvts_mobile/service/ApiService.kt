package gui.mvts_mobile.service

import gui.mvts_mobile.dto.login.LoginRequestDTO
import gui.mvts_mobile.dto.login.LoginResponseDTO
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ApiService {
//    @POST("cliente/login")
    @POST("auth/login")
    fun login(@Body loginRequest: LoginRequestDTO): Call<LoginResponseDTO>
}