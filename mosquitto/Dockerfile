FROM eclipse-mosquitto:latest

COPY ./conf/mosquitto.conf /mosquitto/config/mosquitto.conf

RUN mkdir -p /mosquitto/data /mosquitto/log
RUN chown -R mosquitto:mosquitto /mosquitto

EXPOSE 1883 9001

CMD ["/usr/sbin/mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]