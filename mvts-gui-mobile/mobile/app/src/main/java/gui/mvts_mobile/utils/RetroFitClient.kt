package gui.mvts_mobile.utils

import android.content.Context
import gui.mvts_mobile.R
import gui.mvts_mobile.service.ApiService
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.security.KeyStore
import java.security.cert.CertificateFactory
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManagerFactory
import javax.net.ssl.X509TrustManager


object RetroFitClient {
    private const val BASE_URL = "https://tuIp:3000/"

//
    fun getApiService(context: Context): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }

//    fun createTrustedClient(context: Context, authInterceptor: Interceptor): OkHttpClient{
//        val okHttpClient = OkHttpClient.Builder()
//            .addInterceptor(authInterceptor)
//            .apply{
//                val certificateInputStream = context.resources.openRawResource(R.raw.server)
//                val certificateFactory = CertificateFactory.getInstance("X.509")
//                val certificate = certificateFactory.generateCertificate(certificateInputStream)
//                certificateInputStream.close()
//
//                val keyStore = KeyStore.getInstance(KeyStore.getDefaultType())
//                keyStore.load(null, null)
//                keyStore.setCertificateEntry("ca", certificate)
//
//                val tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
//                tmf.init(keyStore)
//
//                val sslContext = SSLContext.getInstance("TLS")
//                sslContext.init(null, tmf.trustManagers, null)
//                sslSocketFactory(sslContext.socketFactory, tmf.trustManagers[0] as X509TrustManager)
//                hostnameVerifier { hostname, _ -> hostname == "192.168.1.28" }
//            }
//            .build()
//        return okHttpClient
//    }

    fun getAuthenticatedApiService(authToken: String, context: Context): ApiService {
        // Crear un interceptor que añada el token al header
        val authInterceptor = Interceptor { chain ->
            val originalRequest = chain.request()
            if (originalRequest.url.toString().contains("/auth/login") ||
                originalRequest.url.toString().contains("/auth/register")) {
                return@Interceptor chain.proceed(originalRequest)
            }
            val requestWithHeader = originalRequest.newBuilder()
                .header("auth_token", authToken)
                .build()
            return@Interceptor chain.proceed(requestWithHeader)
        }

        // Configurar OkHttpClient con el interceptor
//        val okHttpClient = createTrustedClient(context,authInterceptor)

        // Construir Retrofit con el cliente HTTP personalizado
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
//            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }
}