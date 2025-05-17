package gui.mvts_mobile.utils

import gui.mvts_mobile.service.ApiService

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetroFitClient {
    private const val BASE_URL = "http://ip:3000/api/"

    private val retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .addConverterFactory(GsonConverterFactory.create())
        .build()

    val consumirApi = retrofit.create(ApiService::class.java)

}