package gui.mvts_mobile.utils

import android.content.Context
import gui.mvts_mobile.service.ApiService
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory


object RetroFitClient {
    private const val BASE_URL = "http://192.168.3.5:3000/"


    fun getApiService(context: Context): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }

    fun getAuthenticatedApiService(authToken: String): ApiService {
        // Crear un interceptor que añada el token al header
        val authInterceptor = Interceptor { chain ->
            val originalRequest = chain.request()
            val requestWithHeader = originalRequest.newBuilder()
                .header("auth_token", authToken)
                .build()
            chain.proceed(requestWithHeader)
        }

        // Configurar OkHttpClient con el interceptor
        val okHttpClient = OkHttpClient.Builder()
            .addInterceptor(authInterceptor)
            .build()

        // Construir Retrofit con el cliente HTTP personalizado
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }
}