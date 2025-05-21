#!/bin/bash

# Script para iniciar servicios MineTracking
# Este script ejecuta diferentes comandos según el tipo de proyecto:
# - npm run start:dev para servicios con guiones normales (-)
# - dotnet run para servicios con guiones bajos (_) y mvts-report-service
# - npm run dev para mvts-gui
# - ts-node server.ts para mvts-gps-simulator
# - mvts-gui-mobile no se ejecuta

# Directorio principal de MineTracking
MINETRACKING_DIR=$(pwd)

# Colores para una mejor visualización
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Iniciando servicios de MineTracking ===${NC}"

# Crear un archivo de registro para los servicios
LOG_FILE="$MINETRACKING_DIR/minetracking_services.log"
echo "=== Log de servicios MineTracking $(date) ===" > "$LOG_FILE"

# Función para iniciar un servicio y registrar su PID
start_service() {
    local dir=$1
    local cmd=$2
    
    echo -e "${GREEN}Iniciando: $cmd en $dir${NC}"
    echo "=== Iniciando $dir con comando: $cmd ===" >> "$LOG_FILE"
    
    # Ejecutar el comando en segundo plano y guardar su salida en el log
    cd "$dir" || return
    eval "$cmd" >> "$LOG_FILE" 2>&1 &
    local pid=$!
    
    # Esperar un momento para ver si el proceso sobrevive
    sleep 2
    if ps -p $pid > /dev/null; then
        echo -e "${GREEN}✓ Servicio $dir iniciado correctamente (PID: $pid)${NC}"
        echo "Servicio $dir iniciado con PID: $pid" >> "$LOG_FILE"
    else
        echo -e "${RED}✗ Servicio $dir falló al iniciar${NC}"
        echo "Servicio $dir falló al iniciar" >> "$LOG_FILE"
    fi
    
    # Volver al directorio principal
    cd "$MINETRACKING_DIR" || exit
}

# Recorrer todos los directorios que comienzan con "mvts" y guardar en un array
directories=()
for dir in mvts*; do
    if [ -d "$dir" ] && [ "$dir" != "mvts-gui-mobile" ]; then
        directories+=("$dir")
    fi
done

echo -e "${BLUE}Se encontraron ${#directories[@]} servicios para iniciar${NC}"

# Iniciar cada servicio
for dir in "${directories[@]}"; do
    echo -e "${BLUE}Procesando $dir...${NC}"
    
    # Determinar el comando según el tipo de proyecto
    if [[ "$dir" == *"_"* ]] || [ "$dir" == "mvts-report-service" ]; then
        # Proyectos con guiones bajos o reports-service (dotnet)
        start_service "$dir" "dotnet run"
    elif [ "$dir" == "mvts-gui" ]; then
        # Proyecto mvts-gui (con subcarpeta del mismo nombre)
        start_service "$dir/mvts-gui" "npm run dev"
    elif [ "$dir" == "mvts-gps-simulator" ]; then
        # Caso especial para el simulador GPS (ahora con npm run start)
        start_service "$dir" "npm run start"
    else
        # Proyectos con guiones (Node.js)
        start_service "$dir" "npm run start"
    fi
    
    # Pausa breve entre servicios para evitar saturación
    sleep 1
done

echo -e "${BLUE}=== Todos los servicios han sido iniciados ===${NC}"
echo -e "${YELLOW}Los servicios están ejecutándose en segundo plano${NC}"
echo -e "${YELLOW}Log de servicios guardado en: $LOG_FILE${NC}"
echo -e "${GREEN}Lista de servicios iniciados:${NC}"

# Listar los servicios en ejecución
ps aux | grep -E "npm run|dotnet run|ts-node" | grep -v "grep" | awk '{print $2, $11, $12, $13}' | while read -r line; do
    echo -e "  ${GREEN}PID:${NC} $(echo "$line" | cut -d' ' -f1) ${GREEN}Comando:${NC} $(echo "$line" | cut -d' ' -f2-)"
done