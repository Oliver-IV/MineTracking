package gui.mvts_mobile.enums

enum class CongestionType(val textoMostrar: String, val valorInterno: Int) {
    UNKKOWN("Desconocida", 0),
    TRAFFICJAM("Saturado de tráfico", 1),
    ROADBLOCK("Una roca", 2),
    ACCIDENT("Por un accidente", 3),
    CONSTRUCTION("Por construcciones", 4),
    WEATHER("Por clima", 5),
    OTHER("Otro", 6);


    override fun toString(): String {
        return textoMostrar
    }

    companion object {
        fun getOptions(): Array<CongestionType> = values()
        fun getStrings(): Array<String> = values().map { it.textoMostrar }.toTypedArray()
    }
}