FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/main-0.0.1-SNAPSHOT.jar main-0.0.1-SNAPSHOT.jar

EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]