-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: parkeatec
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ficha`
--
CREATE DATABASE ParkeaTec;
USE ParkeaTec;

DROP TABLE IF EXISTS `ficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ficha` (
  `id_ficha` int(10) unsigned NOT NULL,
  `jornada` varchar(20) DEFAULT NULL,
  `fecha_inicio_aprendiz` date DEFAULT NULL,
  `fecha_terminacion` date DEFAULT NULL,
  `id_documento` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_ficha`),
  KEY `Fk_ficha` (`id_documento`),
  CONSTRAINT `Fk_ficha` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ficha`
--

LOCK TABLES `ficha` WRITE;
/*!40000 ALTER TABLE `ficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `ficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `obtenerusuario`
--

DROP TABLE IF EXISTS `obtenerusuario`;
/*!50001 DROP VIEW IF EXISTS `obtenerusuario`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `obtenerusuario` AS SELECT 
 1 AS `id_documento`,
 1 AS `nombre`,
 1 AS `apellido`,
 1 AS `telefono`,
 1 AS `direccion`,
 1 AS `correo_electronico`,
 1 AS `contraseña`,
 1 AS `foto_usuario`,
 1 AS `firma_usuario`,
 1 AS `foto_documento`,
 1 AS `foto_carnet`,
 1 AS `rol`,
 1 AS `nombre_documento`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ocupacion`
--

DROP TABLE IF EXISTS `ocupacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ocupacion` (
  `id_ocupacion` int(10) unsigned NOT NULL,
  `fecha_hora_ingreso` datetime DEFAULT NULL,
  `fehca_hora_salida` datetime DEFAULT NULL,
  `id_documento` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id_ocupacion`),
  KEY `Fk_ocupacion` (`id_documento`),
  CONSTRAINT `Fk_ocupacion` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ocupacion`
--

LOCK TABLES `ocupacion` WRITE;
/*!40000 ALTER TABLE `ocupacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `ocupacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parqueadero`
--

DROP TABLE IF EXISTS `parqueadero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parqueadero` (
  `id_parqueadero` varchar(10) NOT NULL,
  `tipo_parqueadero` varchar(20) DEFAULT NULL,
  `espacio_parqueadero` int(11) DEFAULT NULL,
  `disponibilidad` varchar(10) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_parqueadero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parqueadero`
--

LOCK TABLES `parqueadero` WRITE;
/*!40000 ALTER TABLE `parqueadero` DISABLE KEYS */;
/*!40000 ALTER TABLE `parqueadero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'crear_usuario'),(2,'eliminar_usuario'),(3,'ver_usuarios'),(4,'actualizar_usuario');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id_reserva` int(5) unsigned NOT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `fecha_hora_entrada` datetime DEFAULT NULL,
  `fecha_hora_salida` datetime DEFAULT NULL,
  `puesto_asignado` varchar(10) DEFAULT NULL,
  `id_documento` int(10) unsigned DEFAULT NULL,
  `vehiculo_placa` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `Fk_reserva_documento` (`id_documento`),
  KEY `Fk_vehiculo_placa` (`vehiculo_placa`),
  CONSTRAINT `Fk_reserva_documento` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`),
  CONSTRAINT `Fk_vehiculo_placa` FOREIGN KEY (`vehiculo_placa`) REFERENCES `vehiculo` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_permisos`
--

DROP TABLE IF EXISTS `rol_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permisos` (
  `rol_id` int(11) NOT NULL,
  `permiso_id` int(11) NOT NULL,
  PRIMARY KEY (`rol_id`,`permiso_id`),
  KEY `Fk_permiso_id` (`permiso_id`),
  CONSTRAINT `Fk_permiso_id` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`),
  CONSTRAINT `Fk_rol_id_rol_permisos` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permisos`
--

LOCK TABLES `rol_permisos` WRITE;
/*!40000 ALTER TABLE `rol_permisos` DISABLE KEYS */;
INSERT INTO `rol_permisos` VALUES (1,1),(1,2),(1,3),(1,4),(2,3);
/*!40000 ALTER TABLE `rol_permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'vigilante'),(3,'usuario');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `id` tinyint(2) unsigned NOT NULL,
  `nombre_documento` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Cedula de ciudadania'),(2,'Cedula de extranjeria'),(3,'Tarjeta de identidad');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_vehiculo`
--

DROP TABLE IF EXISTS `tipo_vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_vehiculo` (
  `id_tipo_vehiculo` tinyint(2) unsigned NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_tipo_vehiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vehiculo`
--

LOCK TABLES `tipo_vehiculo` WRITE;
/*!40000 ALTER TABLE `tipo_vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userficha`
--

DROP TABLE IF EXISTS `userficha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userficha` (
  `id_documento` int(10) unsigned NOT NULL,
  `id_ficha` int(10) unsigned NOT NULL,
  `estado` varchar(15) DEFAULT NULL,
  `fecha_inicio_aprendiz` date DEFAULT NULL,
  `fecha_terminacion` date DEFAULT NULL,
  PRIMARY KEY (`id_documento`,`id_ficha`),
  KEY `Fk_user_ficha_id_ficha` (`id_ficha`),
  CONSTRAINT `Fk_user_ficha_id_documento` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`),
  CONSTRAINT `Fk_user_ficha_id_ficha` FOREIGN KEY (`id_ficha`) REFERENCES `ficha` (`id_ficha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userficha`
--

LOCK TABLES `userficha` WRITE;
/*!40000 ALTER TABLE `userficha` DISABLE KEYS */;
/*!40000 ALTER TABLE `userficha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uso_parqueadero`
--

DROP TABLE IF EXISTS `uso_parqueadero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uso_parqueadero` (
  `id_uso` int(10) unsigned NOT NULL,
  `fecha_entrada` datetime DEFAULT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  `placa` varchar(6) DEFAULT NULL,
  `id_parqueadero` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_uso`),
  KEY `Fk_id_uso_placa` (`placa`),
  KEY `Fk_id_uso_parqueadero` (`id_parqueadero`),
  CONSTRAINT `Fk_id_uso_parqueadero` FOREIGN KEY (`id_parqueadero`) REFERENCES `parqueadero` (`id_parqueadero`),
  CONSTRAINT `Fk_id_uso_placa` FOREIGN KEY (`placa`) REFERENCES `vehiculo` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uso_parqueadero`
--

LOCK TABLES `uso_parqueadero` WRITE;
/*!40000 ALTER TABLE `uso_parqueadero` DISABLE KEYS */;
/*!40000 ALTER TABLE `uso_parqueadero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_documento` int(10) unsigned NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido` varchar(30) DEFAULT NULL,
  `telefono` int(10) DEFAULT NULL,
  `direccion` varchar(40) DEFAULT NULL,
  `correo_electronico` varchar(40) DEFAULT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `foto_usuario` varchar(255) DEFAULT NULL,
  `centro_formacion` varchar(45) DEFAULT NULL,
  `ficha_aprendiz` int(10) DEFAULT NULL,
  `firma_usuario` varchar(255) DEFAULT NULL,
  `foto_documento` varchar(255) DEFAULT NULL,
  `foto_carnet` varchar(255) DEFAULT NULL,
  `id_tipo_documento` tinyint(2) unsigned NOT NULL,
  `rol_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_documento`),
  KEY `Fk_rol_id` (`rol_id`),
  KEY `Fk_id_tipo_documento` (`id_tipo_documento`),
  CONSTRAINT `Fk_id_tipo_documento` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento` (`id`),
  CONSTRAINT `Fk_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (0,'b','b',7878,'Zipaquira','b@gmail.com','$2b$10$1w4eW4xH9HU8LTEaG/1u8.VEzd7oB437I6jdjSvpJB9S5g45EDbqm','uploads/1733693158012-563285032.jpg','CEET',0,'null','null','null',1,2),(456,'alejo','q',34566,'Av. 26 sur #52A-71','alejo@gmail.com','alejo123','uploads/1733673674411-445138754.jpg','CEET',785421,'uploads/1733673674411-496982894.jpg','uploads/1733673674411-288168940.jpg','uploads/1733673674412-813334930.jpg',1,3),(12784,'a','a',65767,'carrera 103','a@gmail.com','$2b$10$eszvpVz7WDcFPkRjVgWTnef.sbi.CrS21V4E34lghebYb8q4vkP4u','uploads/1733692355042-440502956.jpg','CEET',785421,'uploads/1733692355043-444159523.jpg','uploads/1733692355043-617073251.jpg','uploads/1733692355044-540653872.jpg',1,3),(1000517116,'Juan','Garnica',2147483647,'carrera 103','juan@gmail.com','$2b$10$QCWJvazkQ287D9yuK27pEOO8RTtpd6MqgGkjxFvo7PWhP3xmagPYa','foto',NULL,NULL,'firma','foto',NULL,1,1),(1019988647,'cristian camilo','garnica',2147483647,'Av. 26 sur #52A-71','milo@gmail.com','$2b$10$xoP/Q3rcgbRNP8qrchhPVeUB11uWGMgh0A.wZDshJTYM94btw7Tta','uploads/1733536185303-249505106.jpg','CEET',0,'null','null','null',1,3);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `placa` varchar(6) NOT NULL,
  `tipo_vehiculo` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `color` varchar(15) DEFAULT NULL,
  `foto_placa` varchar(255) DEFAULT NULL,
  `foto_serial` varchar(255) DEFAULT NULL,
  `foto_vehiculo` varchar(255) DEFAULT NULL,
  `foto_tarjeta_propiedad` varchar(255) DEFAULT NULL,
  `foto_soat` varchar(255) DEFAULT NULL,
  `foto_tecnomecanica` varchar(255) DEFAULT NULL,
  `vencimiento_soat` date DEFAULT NULL,
  `id_documento` int(10) unsigned DEFAULT NULL,
  `id_tipo_vehiculo` tinyint(2) unsigned NOT NULL,
  PRIMARY KEY (`placa`),
  KEY `Fk_vehiculo` (`id_documento`),
  KEY `Fk_id_tipo_vehiculo` (`id_tipo_vehiculo`),
  CONSTRAINT `Fk_id_tipo_vehiculo` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipo_vehiculo` (`id_tipo_vehiculo`),
  CONSTRAINT `Fk_vehiculo` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'parkeatec'
--

--
-- Dumping routines for database 'parkeatec'
--
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarUsuario`(
	IN new_nombre VARCHAR(30),
    IN new_correo VARCHAR(30),
	IN new_contraseña VARCHAR(255),
    IN numero_documento INT(10)
)
BEGIN
	UPDATE usuario 
    SET nombre = new_nombre,
    correo_electronico = new_correo,
    contraseña = new_contraseña 
    WHERE id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BorrarUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarUsuario`(
	IN numero_documento INT(10)
)
BEGIN
	DELETE FROM usuario WHERE id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CrearUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CrearUsuario`(
	IN id_documento int(10), 
	IN nombre varchar(30),
	IN apellido varchar(30), 
	IN telefono int(10), 
	IN direccion varchar(40), 
	IN correo_electronico varchar(40), 
	IN contraseña varchar(255),
	IN foto_usuario varchar(255), 
	IN centro_formacion varchar(45), 
	IN ficha_aprendiz int(10), 
	IN firma_usuario varchar(255), 
	IN foto_documento varchar(255), 
	IN foto_carnet varchar(255), 
	IN id_tipo_documento tinyint(2), 
	IN rol_id int(11)
)
BEGIN
	INSERT INTO usuario (id_documento, nombre, apellido, telefono, direccion, correo_electronico, 
    contraseña, foto_usuario, centro_formacion, ficha_aprendiz, 
    firma_usuario, foto_documento, foto_carnet,  id_tipo_documento, rol_id) 
    VALUES (id_documento, nombre, apellido, telefono, direccion, correo_electronico, contraseña,
	foto_usuario, centro_formacion, ficha_aprendiz, firma_usuario, foto_documento, foto_carnet, 
	id_tipo_documento, rol_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DetalleUsuarioDocumento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DetalleUsuarioDocumento`(
	IN numero_documento INT(10)
)
BEGIN
	SELECT u.id_documento, u.nombre, u.apellido, u.telefono, u.direccion, u.correo_electronico, u.contraseña, 
    u.foto_usuario, u.firma_usuario, u.foto_documento, u.foto_carnet, r.nombre AS rol, 
    td.nombre_documento FROM usuario AS u 
    INNER JOIN roles AS r ON u.rol_id = r.id 
    INNER JOIN tipo_documento AS td ON u.id_tipo_documento = td.id WHERE u.id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InfoRol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InfoRol`(
IN numero_documento INT(10)
)
BEGIN
	SELECT r.nombre AS rol 
	FROM roles r
	INNER JOIN usuario u ON u.rol_id = r.id
	WHERE u.id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InfoUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InfoUsuario`(
IN numero_documento INT(10)
)
BEGIN
	SELECT r.nombre AS rol, p.nombre AS permiso
	FROM usuario u
	INNER JOIN 
		roles r ON u.rol_id = r.id
	INNER JOIN 
		rol_permisos rp ON r.id = rp.rol_id
	INNER JOIN 
		permisos p ON rp.permiso_id = p.id
	WHERE 
		u.id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ObtenerEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerEmail`(
IN correo VARCHAR(40)
)
BEGIN
	SELECT * FROM usuario WHERE correo_electronico = correo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ObtenerUsuarioId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerUsuarioId`(
	IN numero_documento INT(10)
)
BEGIN
	SELECT * FROM usuario WHERE id_documento = numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Registro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Registro`(
	IN id_documento int(10), 
	IN nombre varchar(30),
	IN apellido varchar(30), 
	IN telefono int(10), 
	IN direccion varchar(40), 
	IN correo_electronico varchar(40), 
	IN contraseña varchar(255),
	IN foto_usuario varchar(255), 
	IN centro_formacion varchar(45), 
	IN ficha_aprendiz int(10), 
	IN firma_usuario varchar(255), 
	IN foto_documento varchar(255), 
	IN foto_carnet varchar(255), 
	IN id_tipo_documento tinyint(2), 
	IN rol_id int(11)
)
BEGIN
	INSERT INTO usuario (id_documento, nombre, apellido, telefono, direccion, correo_electronico, 
    contraseña, foto_usuario, centro_formacion, ficha_aprendiz, 
    firma_usuario, foto_documento, foto_carnet,  id_tipo_documento, rol_id) 
    VALUES (id_documento, nombre, apellido, telefono, direccion, correo_electronico, contraseña,
	foto_usuario, centro_formacion, ficha_aprendiz, firma_usuario, foto_documento, foto_carnet, 
	id_tipo_documento, rol_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `obtenerusuario`
--

/*!50001 DROP VIEW IF EXISTS `obtenerusuario`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `obtenerusuario` AS select `u`.`id_documento` AS `id_documento`,`u`.`nombre` AS `nombre`,`u`.`apellido` AS `apellido`,`u`.`telefono` AS `telefono`,`u`.`direccion` AS `direccion`,`u`.`correo_electronico` AS `correo_electronico`,`u`.`contraseña` AS `contraseña`,`u`.`foto_usuario` AS `foto_usuario`,`u`.`firma_usuario` AS `firma_usuario`,`u`.`foto_documento` AS `foto_documento`,`u`.`foto_carnet` AS `foto_carnet`,`r`.`nombre` AS `rol`,`td`.`nombre_documento` AS `nombre_documento` from ((`usuario` `u` join `roles` `r` on(`u`.`rol_id` = `r`.`id`)) join `tipo_documento` `td` on(`u`.`id_tipo_documento` = `td`.`id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 22:22:29
