package gui.mvts_mobile.utils

import android.content.Context
import gui.mvts_mobile.R
import gui.mvts_mobile.service.ApiService
import okhttp3.Cookie
import okhttp3.CookieJar
import okhttp3.HttpUrl
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
    private const val BASE_URL = "https://192.168.100.5:3000/"
    private const val SIMULATION_URL = "http://192.168.100.5:3001"

//
    fun getApiService(context: Context): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }

    fun getSimulationService(context: Context): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(SIMULATION_URL)
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
        val cookieJar = object : CookieJar {
            private val cookieStore = mutableMapOf<HttpUrl, List<Cookie>>()

            override fun saveFromResponse(url: HttpUrl, cookies: List<Cookie>) {
                cookieStore[url] = cookies
            }

            override fun loadForRequest(url: HttpUrl): List<Cookie> {
                val cookie = Cookie.Builder()
                    .domain("192.168.100.5") // Asegúrate que este sea el host del backend
                    .path("/")
                    .name("auth_token")
                    .value(authToken)
                    .httpOnly() // opcional: solo si quieres marcarla como HttpOnly
                    .secure()   // importante si usas HTTPS
                    .build()
                return listOf(cookie)
            }
        }

        val okHttpClient = OkHttpClient.Builder()
            .cookieJar(cookieJar)
            .build()

        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }
}