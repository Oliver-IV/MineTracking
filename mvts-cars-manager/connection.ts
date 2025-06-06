import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./configs/database.config";
import { CarEntity, CapacityEntity } from "@app/common";
import { DataSource } from "typeorm";

const connection = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    entities: [CapacityEntity, CarEntity]
}) ;

export default connection ;