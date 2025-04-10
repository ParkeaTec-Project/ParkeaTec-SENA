-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: parkeatec
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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

CREATE DATABASE parkeatec;
USE parkeatec;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
 1 AS `rol_id`,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `id_parqueadero` int(10) NOT NULL AUTO_INCREMENT,
  `tipo_parqueadero` varchar(20) DEFAULT NULL,
  `numero_espacio` varchar(10) DEFAULT NULL,
  `disponibilidad` varchar(10) DEFAULT NULL,
  `estado` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id_parqueadero`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parqueadero`
--

LOCK TABLES `parqueadero` WRITE;
/*!40000 ALTER TABLE `parqueadero` DISABLE KEYS */;
INSERT INTO `parqueadero` VALUES (10,'Carro','A1','libre','activo'),(11,'Carro','A2','libre','activo'),(12,'Carro','A3','libre','activo'),(13,'Moto','B1','libre','activo'),(14,'Moto','B2','libre','activo'),(15,'Bicicleta','C1','libre','activo'),(16,'Bicicleta','C2','libre','activo'),(17,'Bicicleta','C3','libre','activo'),(18,'Moto','B3','libre','activo');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `id_reserva` int(5) unsigned NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (16,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 00:04:45','10',1000517,'YYY123'),(24,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 02:24:31','13',1000517,'YYY123'),(25,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 14:29:04','14',1000517,'YYY123'),(26,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 14:33:40','11',1000517,'YYY123'),(27,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 14:36:28','15',1000517,'YYY123'),(28,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 15:27:27','10',1000517,'YYY123'),(29,'2025-04-10 00:00:00','cancelada','2025-04-10 00:00:00','2025-04-10 15:29:20','10',1000517,'YYY123'),(30,'2025-04-10 00:00:00','cancelada',NULL,NULL,'10',1000517,'YYY123'),(31,'2025-04-10 19:05:02','cancelada',NULL,NULL,'10',1000517,'YYY123'),(32,'2025-04-10 19:13:01','cancelada',NULL,NULL,'10',1000517,'YYY123'),(33,'2025-04-10 19:13:28','cancelada',NULL,NULL,'10',1000517,'YYY123');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_vehiculo`
--

LOCK TABLES `tipo_vehiculo` WRITE;
/*!40000 ALTER TABLE `tipo_vehiculo` DISABLE KEYS */;
INSERT INTO `tipo_vehiculo` VALUES (1,'Moto'),(2,'Bicicleta');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `id_parqueadero` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_uso`),
  KEY `Fk_id_uso_placa` (`placa`),
  KEY `Fk_id_uso_parqueadero` (`id_parqueadero`),
  CONSTRAINT `Fk_id_uso_parqueadero` FOREIGN KEY (`id_parqueadero`) REFERENCES `parqueadero` (`id_parqueadero`),
  CONSTRAINT `Fk_id_uso_placa` FOREIGN KEY (`placa`) REFERENCES `vehiculo` (`placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (0,'jhon','b',7878,'Zipaquira','jhon@gmail.com','$2b$10$J1pkMQQFv6EY/tDlcP/gVuE59AyL8G2cd5xXP1./GLmSzud2FykeS','uploads/1733693158012-563285032.jpg','CEET',0,'null','null','null',1,3),(23,'yo','f',202,'carrera 103','yo@gmail.com','$2b$10$LfukdD4MnsDfMJCdSQc03.j5Kt0URnMI7PUY8tQpb.SyObSGi5/Ki','1744316468554-501376293.jpg','ceet',123,'','','',1,3),(27,'clara','garnica',46456,'carrera 30','paty.gc500@gmail.com','$2b$10$8xAgaKR4Y356aGjxDVCVI.01mf7Ma/CJBEnXFqpOiUPls5.c3.GUS','uploads/1743346233800-315548558.jpg','ceet',2919581,'uploads/1743346233801-513836950.jpg','uploads/1743346233801-544673722.jpg','uploads/1743346233801-813419801.jpg',1,3),(99,'z','z',45,'c','z@gmail.com','$2b$10$gZ.8mpedHA2iL96w7b1nv.OlHMBrQ97xMfuletaHSeLy1OUGUDYVy','1744070971171-269237162.jpg','ceet',0,'null','null','null',1,3),(200,'x','x',545,'x','x@gmail.com','$2b$10$Bf5DTlA99qyO2qQYEFgeLuwUwfERbXtQyyNklLu2W83HoTh635QSu','1744044965312-833794425.jpg','ceet',0,'null','null','null',1,1),(456,'alejo','q',34566,'Av. 26 sur #52A-71','alejo@gmail.com','$2b$10$IQ9H4bsVfKO47zNOl49c/.T1BmRyywfXsl1GeI3R8vIHai9FWnUsi','uploads/1733673674411-445138754.jpg','CEET',785421,'uploads/1733673674411-496982894.jpg','uploads/1733673674411-288168940.jpg','uploads/1733673674412-813334930.jpg',1,2),(15987,'julian','perez',884514,'carrera 20','julianP@gmail.com','$2b$10$sKioEjyToQoHa88UUZOeNeStWLhAPwzdoh2S/2fLTjtwOwbjfhwOu','1743458587379-668960982.jpg','ceet',2919581,'1743458587380-910393272.png','1743458587380-539886449.jpg','1743458587381-49770050.jpg',1,2),(128549,'santi','g',484541,'carrera','santi@gmail.com','$2b$10$GDeuu9vizUMn/cJNoz.aQurYhHiyO/FiUcOy.0MBNR/wKAqGuutWi',NULL,'ceet',45,NULL,NULL,NULL,1,3),(222558,'julian','z',785124,'drgfdg','julian@gmail.com','$2b$10$AH2lJ/ZXWgugBSy4gD9zlOoyeWvXStJ9W7yRngxogEK0RhtvuUE7S','uploads/1740098076371-903963088.jpg','ceet',8787100,'uploads/1740098076371-122419461.jpg','uploads/1740098076371-518265067.jpg','uploads/1740098076372-265335899.jpg',1,1),(401210,'rodri','perez',545454,'carrera','rodri@gmail.com','$2b$10$vBeXB11DT4fnHqmlxdM2Yu/7amgXyZRuxG9b.F5MM1QyMk0PEE1NK','uploads/1743700212408-16361655.jfif','ceet',5455121,'firma','foto','foto',1,1),(652454,'pepe','p',84545,'carrera','pepe@gmail.com','$2b$10$devbBZRlokb35QuXOS50aO7QxZHY835e.Xdo8hB1/DtPSTVsCccs6',NULL,'ceet',54512,NULL,NULL,NULL,1,2),(1000517,'juan','garnica',8451784,'carrera 30','juanandres78.jg@gmail.com','$2b$10$rrUN0DV8UoyCt1ir7WzZJ.ozQ.8Yc.zOyq/KrHz.6dOg0t5XvJEDy','uploads/1743345728103-205639264.jpg','ceet',2919581,'uploads/1743345728103-108804938.jpg','uploads/1743345728103-444077536.jpg','uploads/1743345728104-990496349.jpg',1,3),(7454878,'alves','a',741,'carrera','alves@gmail.com','$2b$10$r6r77TZXXPLKeqzHg5UcxubqS5gx8tQmmY8WzESu/UcORu4lkNUTW',NULL,'ceet',NULL,NULL,NULL,NULL,1,2),(12345678,'Juan','Pérez',2147483647,'Calle 123, Bogotá','juan@example.com','$2b$10$wGReqH5qPyhDlQzVnvS9YuV6ditWwPgWShEhaYhuB3Qc4ZNz.lrNW','1743700792029-184550012.jpg','SENA',12345,'1743700792028-867274258.jpg','1743700792029-339947778.jpg','1743700792021-266300888.jpg',1,2),(78784571,'n','n',87514,'carra','n@gmail.com','$2b$10$/YDnSJctu82GWfJB/m.YCuLjFIW59Zl0E5EWEc4awfLRPpfq1UHOC','uploads/1740099127224-249857801.jpg','ceet',87412,'uploads/1740099127224-977843351.jpg','uploads/1740099127224-568765918.jpg','uploads/1740099127225-857693516.jpg',1,3),(848789114,'Martin','perez',2147483647,'carrera 103 #73-51','martin@gmail.com','$2b$10$hazrGXlxk8oNffPz9Powsu7EoN8hQU5er2CddImiGZioT6q8URtsy','1744316838758-445179827.jpg','CEET',2919581,'','','',1,3),(1000517116,'Juan','Garnica',2147483647,'carrera 103','juan@gmail.com','$2b$10$QCWJvazkQ287D9yuK27pEOO8RTtpd6MqgGkjxFvo7PWhP3xmagPYa','foto',NULL,NULL,'firma','foto',NULL,1,1),(1014477107,'DIego','Garzon',2147483647,'SApo','diego123@gmail.com','$2b$10$SoWxSzuZCKCTtdwd4gcASOx.UiGgEmZJlZjCVE6JczFtTkO9xLMki','uploads/1742600164879-910621639.jpg','Ceet',12345,'uploads/1742600164911-44416062.jpg','uploads/1742600164933-944498786.jpg','uploads/1742600164967-733323724.jpg',1,3),(1019988647,'cristian camilo','garnica',2147483647,'Av. 26 sur #52A-71','carrillocamilo500@gmail.com','$2b$10$IgsIoMn.V8ZoUf1pCVGUeep4X5p1T6FOav5KyxJW1gAn/2oTqdfCG','uploads/1733536185303-249505106.jpg','CEET',0,'null','null','null',1,1),(2147483647,'p','p',789,'gfhgf','p@gmail.com','$2b$10$1KwXtg6A/Lta1IffvIkuqOtlz7UqWwtiaRHjM5kfzjL.ZKqbx4jqC','uploads/1740097686964-750453777.jpg','ceet',12,'uploads/1740097686964-711556089.jpg','uploads/1740097686964-387192974.jpg','uploads/1740097686965-605285562.jpg',1,3);
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
  `foto_licencia_conducir` varchar(255) DEFAULT NULL,
  `foto_tarjeta_propiedad` varchar(255) DEFAULT NULL,
  `foto_soat` varchar(255) DEFAULT NULL,
  `foto_tecnomecanica` varchar(255) DEFAULT NULL,
  `vencimiento_soat` date DEFAULT NULL,
  `observacion` varchar(255) DEFAULT NULL,
  `id_documento` int(10) unsigned DEFAULT NULL,
  `id_tipo_vehiculo` tinyint(2) unsigned NOT NULL,
  PRIMARY KEY (`placa`),
  KEY `Fk_vehiculo` (`id_documento`),
  KEY `Fk_id_tipo_vehiculo` (`id_tipo_vehiculo`),
  CONSTRAINT `Fk_id_tipo_vehiculo` FOREIGN KEY (`id_tipo_vehiculo`) REFERENCES `tipo_vehiculo` (`id_tipo_vehiculo`),
  CONSTRAINT `Fk_vehiculo` FOREIGN KEY (`id_documento`) REFERENCES `usuario` (`id_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
INSERT INTO `vehiculo` VALUES ('ABC123','Moto','2022','Yamaha','Rojo',NULL,NULL,NULL,'',NULL,NULL,NULL,'2025-06-15','',1019988647,1),('GOR123','Moto','2022','Yamaha','Rojo',NULL,NULL,NULL,'',NULL,NULL,NULL,'2025-06-15','',222558,1),('VXX123','Moto','2022','Yamaha','Verde',NULL,NULL,NULL,'',NULL,NULL,NULL,'2025-06-15','',456,1),('YYY123','Moto','2024','NS','azul b','1743457699501-999399560.jpg','1743457699501-149902548.jpg','1743801504601-785229856.jpg','1743457699502-480897973.jpg','1743457699505-355679621.jpg','1743471695859-303869283.jpg','1743457699505-728488343.jpg','2027-01-05','vehiculo modificado',1000517,1);
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
    IN new_rol_id INT(11),
    IN numero_documento INT(10)
)
BEGIN
	UPDATE usuario 
    SET nombre = new_nombre,
    correo_electronico = new_correo,
    contraseña = new_contraseña, 
    rol_id = new_rol_id
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
    u.centro_formacion, u.ficha_aprendiz, u.foto_usuario, u.firma_usuario, u.foto_documento, u.foto_carnet, r.nombre AS rol, 
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
/*!50001 VIEW `obtenerusuario` AS select `u`.`id_documento` AS `id_documento`,`u`.`nombre` AS `nombre`,`u`.`apellido` AS `apellido`,`u`.`telefono` AS `telefono`,`u`.`direccion` AS `direccion`,`u`.`correo_electronico` AS `correo_electronico`,`u`.`contraseña` AS `contraseña`,`u`.`foto_usuario` AS `foto_usuario`,`u`.`firma_usuario` AS `firma_usuario`,`u`.`foto_documento` AS `foto_documento`,`u`.`foto_carnet` AS `foto_carnet`,`u`.`rol_id` AS `rol_id`,`r`.`nombre` AS `rol`,`td`.`nombre_documento` AS `nombre_documento` from ((`usuario` `u` join `roles` `r` on(`u`.`rol_id` = `r`.`id`)) join `tipo_documento` `td` on(`u`.`id_tipo_documento` = `td`.`id`)) */;
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

-- Dump completed on 2025-04-10 15:40:02
