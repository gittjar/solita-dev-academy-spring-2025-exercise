FROM postgres:16.0
LABEL Name=electricityDB Version=0.0.1
LABEL maintainer="JarnoK"
LABEL description="PostgreSQL database for Electricity Consumption Monitoring System"
ADD init-db.tar.gz /docker-entrypoint-initdb.d/