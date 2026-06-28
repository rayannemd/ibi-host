-- Dump corrigido manualmente para evitar erro 3780
-- MySQL dump 10.13  Distrib 8.4.5, for Linux (x86_64)
-- Host: localhost    Database: meubanco
-- Server version 8.4.5

/*!50503 SET NAMES utf8mb4 */;
SET time_zone = '+00:00';
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- Remover tabelas se já existirem (em ordem que evita conflitos de chave estrangeira)
DROP TABLE IF EXISTS `checkout`;
DROP TABLE IF EXISTS `checkin`;
DROP TABLE IF EXISTS `quarto`;
DROP TABLE IF EXISTS `reserva`;
DROP TABLE IF EXISTS `cliente`;
DROP TABLE IF EXISTS `usuario`;

-- Criar tabela Cliente
CREATE TABLE `cliente` (
  `cpf` varchar(100) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cpf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Criar tabela Quarto
CREATE TABLE `quarto` (
  `numero` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Criar tabela Reserva
CREATE TABLE `reserva` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_checkin` date DEFAULT NULL,
  `data_checkout` date DEFAULT NULL,
  `valor_reserva` float DEFAULT NULL,
  `qtd_pessoas` int DEFAULT NULL,
  `cpf_cliente` varchar(100) NOT NULL,
  `numero_quarto` int UNSIGNED NOT NULL,
  `checkin_realizado` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`),
  KEY `cpf_cliente` (`cpf_cliente`),
  KEY `numero_quarto` (`numero_quarto`),
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`cpf_cliente`) REFERENCES `cliente` (`cpf`),
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`numero_quarto`) REFERENCES `quarto` (`numero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Criar tabela Checkin
CREATE TABLE `checkin` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `data_checkin` date DEFAULT NULL,
  `valor_checkin` float DEFAULT NULL,
  `id_reserva` bigint UNSIGNED DEFAULT NULL,
  `checkout_realizado` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`id`),
  KEY `id_reserva` (`id_reserva`),
  CONSTRAINT `checkin_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Criar tabela Checkout
CREATE TABLE `checkout` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) DEFAULT NULL,
  `data_checkout` date DEFAULT NULL,
  `id_checkin` bigint UNSIGNED NOT NULL,
  `valor_total` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_checkin` (`id_checkin`),
  CONSTRAINT `checkout_ibfk_1` FOREIGN KEY (`id_checkin`) REFERENCES `checkin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Criar tabela usuario
CREATE TABLE `usuario` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Inserção exemplo (manter apenas como demonstração)
INSERT INTO `usuario` VALUES (1,'admin@gmail.com','$2a$10$IxZf3nC0npH06my/hfaulOkN76uHEAGHV9pZbDx.SscOyIy5QDDsO');

-- Inserção de todos os quartos da pousada 
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (1, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi.');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (2, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi.');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (3, 'Triplo', 'livre', 'Primeiro andar, cama Casal Box, uma cama Solteiro Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (4, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (5, 'Casal', 'livre', 'Primeiro andar, cma Casal Box, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (6, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (7, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (8, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (9, 'Casal', 'livre', 'Primeiro andar, cama Casal Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (10, 'Quadruplo', 'livre', 'Primeiro andar, cama Casal Box, duas camas solteiro, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (11, 'Quadruplo', 'livre', 'Primeiro andar, cama Casal Box, duas camas solteiro, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (12, 'Triplo', 'livre', 'Primeiro andar, cama Casal Box, uma cama Solteiro Box, armadores para redes, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (15, 'Triplo', 'livre', 'Segundo andar, Cama Casal Box, uma cama Solteiro, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (16, 'Quadruplo', 'livre', 'Segundo andar, Cama Casal Box, duas camas Solteiro, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (17, 'Triplo', 'livre', 'Segundo andar, Cama Casal Box, uma cama Solteiro, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (18, 'Casal', 'livre', 'Segundo andar, Cama Casal Box, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (19, 'Casal', 'livre', 'Segundo andar, Cama Casal Box, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (20, 'Casal', 'livre', 'Segundo andar, Cama Casal Box, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (21, 'Casal', 'livre', 'Segundo andar, Cama Casal Box, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (22, 'Casal', 'livre', 'Segundo andar, Cama Casal Box, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (23, 'Quadruplo', 'livre', 'Segundo andar, Cama Casal Box, duas camas Solteiro, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');
INSERT INTO `quarto` (`numero`, `tipo`, `status`, `descricao`) VALUES (24, 'Triplo', 'livre', 'Segundo andar, Cama Casal Box, uma cama Solteiro, ar condicionado, banheiro privativo com chuveiro eletrico, Smart TV e Wi-fi..');

COMMIT;