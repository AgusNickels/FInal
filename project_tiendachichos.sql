-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-07-2025 a las 02:21:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `project_tiendachichos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(4, 'Accesorios'),
(3, 'Alimento'),
(1, 'Cuchas'),
(5, 'Indumentaria'),
(2, 'Juguetes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_lista` decimal(10,2) NOT NULL,
  `precio_efectivo` decimal(10,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `imagen_url` varchar(255) DEFAULT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio_lista`, `precio_efectivo`, `stock`, `imagen_url`, `categoria_id`) VALUES
(1, 'Cucha Grande', 'Cucha para perros grandes, plástica, resistente a la intemperie', 18000.00, 16500.00, 5, 'https://via.placeholder.com/150/0000FF/FFFFFF?text=CuchaGrande', 1),
(2, 'Pelota de Goma', 'Pelota resistente para perros, ideal para jugar al aire libre', 2500.00, 2200.00, 20, 'https://via.placeholder.com/150/FF0000/FFFFFF?text=PelotaGoma', 2),
(3, 'Alimento Balanceado Premium', 'Alimento completo y balanceado para perros adultos', 15000.00, 14000.00, 10, 'https://via.placeholder.com/150/00FF00/FFFFFF?text=AlimentoPremium', 3),
(4, 'Correa Retráctil', 'Correa de 5 metros retráctil con mango ergonómico', 4500.00, 4000.00, 8, 'https://via.placeholder.com/150/FFFF00/000000?text=CorreaRetractil', 4),
(5, 'Abrigo Impermeable M', 'Abrigo talle M, impermeable, ideal para días de lluvia', 7000.00, 6500.00, 3, 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=AbrigoM', 5),
(6, 'Hueso Recreativo', 'Hueso de nylon para masticar, ayuda a limpiar los dientes', 3000.00, 2700.00, 15, 'https://via.placeholder.com/150/00FFFF/000000?text=HuesoNylon', 2),
(7, 'Comedero Doble Acero Inox', 'Comedero doble de acero inoxidable, fácil de limpiar', 6000.00, 5500.00, 7, 'https://via.placeholder.com/150/800080/FFFFFF?text=ComederoInox', 4),
(8, 'Cama Ortopédica Pequeña', 'Cama con espuma de memoria para perros pequeños con problemas articulares', 12000.00, 11000.00, 4, 'https://via.placeholder.com/150/FFA500/000000?text=CamaOrtopedica', 1),
(9, 'Shampoo Hipoalergénico', 'Shampoo suave para pieles sensibles, 500ml', 3500.00, 3200.00, 12, 'https://via.placeholder.com/150/A52A2A/FFFFFF?text=Shampoo', 4),
(10, 'Frisbee Duradero', 'Frisbee de plástico flexible y resistente para lanzar y atrapar', 1800.00, 1600.00, 25, 'https://via.placeholder.com/150/7FFF00/000000?text=Frisbee', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_categoria` (`categoria_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
