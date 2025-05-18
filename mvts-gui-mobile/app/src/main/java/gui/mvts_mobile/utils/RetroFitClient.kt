package gui.mvts_mobile.utils

import android.content.Context
import gui.mvts_mobile.R
import gui.mvts_mobile.service.ApiService
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.io.InputStream
import java.security.KeyStore
import java.security.cert.CertificateFactory
import java.security.cert.X509Certificate
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManagerFactory
import javax.net.ssl.X509TrustManager

object RetroFitClient {
    private const val BASE_URL = "https://tuIp:3000/"

    // Esto supuestamente es el que hace leer el certificado pero no funciona pipipi :(
    fun createTrustedClient(context: Context): OkHttpClient {
        try {
            // Cargar el certificado desde recursos raw
            val certificateInputStream: InputStream = context.resources.openRawResource(R.raw.server_crt)

            // Crear el almacén de certificados
            val certificateFactory = CertificateFactory.getInstance("X.509")
            val certificate = certificateFactory.generateCertificate(certificateInputStream) as X509Certificate
            certificateInputStream.close()

            // Crear un KeyStore que contenga nuestros certificados de confianza
            val keyStoreType = KeyStore.getDefaultType()
            val keyStore = KeyStore.getInstance(keyStoreType)
            keyStore.load(null, null)
            keyStore.setCertificateEntry("ca", certificate)

            // Crear un TrustManager que confíe en los certificados del KeyStore
            val trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
            trustManagerFactory.init(keyStore)
            val trustManagers = trustManagerFactory.trustManagers

            // Crear un SSLContext con nuestros TrustManagers
            val sslContext = SSLContext.getInstance("TLS")
            sslContext.init(null, trustManagers, null)

            // Añadir logging para depuración
            val loggingInterceptor = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            // Devolver un cliente OkHttp configurado con nuestro SSLContext
            return OkHttpClient.Builder()
                .sslSocketFactory(sslContext.socketFactory, trustManagers[0] as X509TrustManager)
                .hostnameVerifier { hostname, _ -> hostname == "192.168.3.5" } // Verifica que el hostname coincida con tu servidor
                .addInterceptor(loggingInterceptor) // Para ver logs de las peticiones
                .build()
        } catch (e: Exception) {
            e.printStackTrace()
            // En caso de error, devolver un cliente normal (ten cuidado con esto en producción)
            return OkHttpClient.Builder()
                .addInterceptor(HttpLoggingInterceptor().apply {
                    level = HttpLoggingInterceptor.Level.BODY
                })
                .build()
        }
    }

    fun getApiService(context: Context): ApiService {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
//            .client(createTrustedClient(context))
            .addConverterFactory(GsonConverterFactory.create())
            .build()

        return retrofit.create(ApiService::class.java)
    }

}