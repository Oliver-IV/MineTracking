### entrypoint.sh
#!/bin/bash

set -e
set -u

function create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
        CREATE USER $database;
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [  -n "${POSTGRES_MULTIPLE_DATABASES:-}" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi

#########################version 1############################
# set -e

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
#   CREATE DATABASE mvts_car_db;
#   CREATE DATABASE mvts_traffic_lights_db;
  
#   GRANT ALL PRIVILEGES ON DATABASE mvts_car_db TO $POSTGRES_USER;
#   GRANT ALL PRIVILEGES ON DATABASE mvts_traffic_lights_db TO $POSTGRES_USER;
# EOSQL