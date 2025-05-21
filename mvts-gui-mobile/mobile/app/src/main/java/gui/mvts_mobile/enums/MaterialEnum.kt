package gui.mvts_mobile.enums

enum class MaterialEnum(val textoMostrar: String, val valorInterno: Int) {
    UNKKOWN("Desconocida", 0),
    LADRILLOS("Ladrillos", 1),
    ORO("Oro", 2),
    COBRE("Cobre", 3),
    PLATA("Plata", 4),
    PRODUCTOS_DE_TEMU("Productos de Temu", 5)
    ;


    override fun toString(): String {
        return textoMostrar
    }

    companion object {
        fun getDisplayNames(): List<String> {
            return values().map { it.textoMostrar }
        }

        fun fromDisplayName(displayName: String): MaterialEnum? {
            return values().find { it.textoMostrar == displayName }
        }
    }
}