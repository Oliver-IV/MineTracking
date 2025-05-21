import "dotenv/config"

const MQTT_URL = process.env.MQTT_URL || "mqtt://mqtt:1883" ;

export default MQTT_URL ;