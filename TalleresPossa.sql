-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: 54.201.114.39
-- Tiempo de generación: 24-12-2015 a las 14:40:43
-- Versión del servidor: 5.5.46-0ubuntu0.14.04.2
-- Versión de PHP: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `TalleresPossa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `login` tinyint(1) NOT NULL DEFAULT '0',
  `Usuario` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Empresa` varchar(50) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Fax` varchar(20) DEFAULT NULL,
  `Celular` varchar(20) DEFAULT NULL,
  `Correo` varchar(50) NOT NULL,
  `Info` varchar(200) DEFAULT NULL,
  `Creacion` varchar(10) NOT NULL,
  `UltimaActualizacion` varchar(10) NOT NULL,
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='Tabla de usuarios' AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`login`, `Usuario`, `Contrasena`, `Nombre`, `Empresa`, `Telefono`, `Fax`, `Celular`, `Correo`, `Info`, `Creacion`, `UltimaActualizacion`, `ID`) VALUES
(0, 'FabianPossamai', 'pene22??', 'Nelso Fabian Possamai Aguirre', 'TalleresPossa S.A', '+22977138', '', '+59899154904', 'nelfapos@hotmail.com', 'Dueno de la empresa xD', '20/12/2015', '20/12/2015', 9),
(0, 'networkDevelopper', 'networkingonyourNetwork?', 'Alfredo Sebastian Rosadilla Ribeiro', 'NetworkDeveloppers S.A', '', '', '+59897416576', 'networkdeveloppers@gmail.com', 'Empresa orientada al software, esperemos salga algo bueno de todo esto ;).', '20/12/2015', '20/12/2015', 10);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
