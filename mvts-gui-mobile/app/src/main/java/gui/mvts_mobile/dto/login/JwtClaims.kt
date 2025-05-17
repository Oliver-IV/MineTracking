package gui.mvts_mobile.dto.login

data class JwtClaims(val clienteId: Int,
                     val tipo: String,
                     val nombre: String,
                     val iat: Long,
                     val exp: Long)
