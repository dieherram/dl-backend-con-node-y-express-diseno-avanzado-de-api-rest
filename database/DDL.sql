-- DROP DATABASE joyas;
-- DROP TABLE inventario;

CREATE DATABASE joyas;

\c joyas;

CREATE TABLE inventario (
    id SERIAL, 
    nombre VARCHAR(50), 
    categoria VARCHAR(50),
    metal VARCHAR(50),
    precio INT,
    stock INT
);