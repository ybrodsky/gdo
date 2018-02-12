SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `gdo` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `gdo`;

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Alfajores'),
(2, 'Bebidas'),
(3, 'Caramelos y otros'),
(4, 'Panaderia'),
(5, 'Libreria'),
(6, 'Gdo'),
(7, 'Farmacia');

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `dni` int(8) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `clients` (`id`, `name`, `surname`, `phone`, `address`, `email`, `dni`, `active`, `createdAt`, `updatedAt`) VALUES
(1, 'Yael', 'Brodsky', '1123912500', 'Charlone 668', 'brodskyy88@gmail.com', 33499772, 1, '2017-12-19 14:25:52', '2017-12-19 14:30:35'),
(2, 'El Gdo', 'Gerling', NULL, NULL, NULL, NULL, 1, '2017-12-19 14:30:45', '2017-12-19 14:30:45');

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `amount` double(10,2) NOT NULL,
  `detail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `net` double(10,2) NOT NULL,
  `price` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `products` (`id`, `category_id`, `name`, `net`, `price`) VALUES
(1, 1, 'Alfajor Jorgito triple', 10.00, 20.00),
(2, 1, 'Alfajor Guaymayen', 10.00, 15.00),
(3, 2, 'Coca Cola 500ml', 15.00, 25.00),
(4, 7, 'Prime 12 unidades', 50.00, 1000.00);

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `paid` tinyint(1) NOT NULL DEFAULT '1',
  `total` double(10,2) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `sales` (`id`, `user_id`, `client_id`, `paid`, `total`, `cancelled`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, 1, 20.00, 1, '2017-12-19 15:25:51', '2017-12-19 15:50:29'),
(2, 1, NULL, 1, 60.00, 0, '2017-12-19 15:41:00', '2017-12-19 15:41:00'),
(3, 1, NULL, 1, 20.00, 0, '2017-12-19 15:50:59', '2017-12-19 15:50:59'),
(4, 1, NULL, 1, 25.00, 0, '2017-12-19 15:51:58', '2017-12-19 15:51:58'),
(5, 1, NULL, 1, 20.00, 0, '2017-12-19 15:52:04', '2017-12-19 15:52:04'),
(6, 1, NULL, 1, 70.00, 0, '2017-12-19 15:53:34', '2017-12-19 15:53:34'),
(7, 1, NULL, 1, 25.00, 0, '2017-12-19 15:53:41', '2017-12-19 15:53:41'),
(8, 1, NULL, 1, 20.00, 0, '2017-12-19 15:53:43', '2017-12-19 15:53:43'),
(9, 1, NULL, 1, 20.00, 0, '2017-12-19 15:53:45', '2017-12-19 15:53:45'),
(10, 1, NULL, 1, 20.00, 0, '2017-12-19 15:53:46', '2017-12-19 15:53:46'),
(11, 1, NULL, 1, 20.00, 0, '2017-12-19 15:53:48', '2017-12-19 15:53:48'),
(12, 1, NULL, 1, 25.00, 0, '2017-12-19 15:53:49', '2017-12-19 15:53:49'),
(13, 1, 1, 1, 20.00, 0, '2017-12-19 16:03:11', '2017-12-19 16:10:58'),
(14, 1, 1, 0, 1000.00, 0, '2017-12-19 16:04:58', '2017-12-19 16:04:58'),
(15, 1, 1, 0, 1000.00, 0, '2017-12-19 16:05:08', '2017-12-19 16:05:08'),
(16, 1, 1, 0, 1000.00, 0, '2017-12-19 16:05:15', '2017-12-19 16:05:15'),
(17, 1, 1, 0, 1000.00, 0, '2017-12-19 16:05:41', '2017-12-19 16:05:41'),
(18, 1, 1, 0, 1000.00, 0, '2017-12-19 16:05:47', '2017-12-19 16:05:47'),
(19, 1, NULL, 1, 20.00, 0, '2017-12-19 18:02:15', '2017-12-19 18:02:15'),
(20, 1, 1, 0, 20.00, 0, '2017-12-19 18:02:22', '2017-12-19 18:02:22');

CREATE TABLE `sales_products` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `sales_products` (`id`, `sale_id`, `product_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 3),
(4, 2, 2),
(5, 3, 1),
(6, 4, 3),
(7, 5, 1),
(8, 6, 3),
(9, 6, 1),
(10, 6, 3),
(11, 7, 3),
(12, 8, 1),
(13, 9, 1),
(14, 10, 1),
(15, 11, 1),
(16, 12, 3),
(17, 13, 1),
(18, 14, 4),
(19, 15, 4),
(20, 16, 4),
(21, 17, 4),
(22, 18, 4),
(23, 19, 1),
(24, 20, 1);

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`id`, `name`, `surname`, `username`, `password`, `rol_id`, `active`) VALUES
(1, 'Yael', 'Brodsky', 'brodskyy', '$2a$10$.S9hopKGM6KY233wM2fwROel1tvOKCNz1IpTb423UekThWcxI1BNG', 1, 1),
(2, 'Gdp', 'Argento', 'gdo', '$2a$10$myFizdjZj8d4/DRRjhe.oe7ht0OqVsc8xt8yq.oWGGpUFUY6cpt0O', 2, 1);


ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

ALTER TABLE `sales_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_id` (`sale_id`),
  ADD KEY `product_id` (`product_id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `expenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
ALTER TABLE `sales_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

ALTER TABLE `products` ADD `active` TINYINT NOT NULL DEFAULT '1' AFTER `price`;
ALTER TABLE `categories` ADD `active` TINYINT NOT NULL DEFAULT '1' AFTER `name`;
ALTER TABLE `sales_products` ADD `amount` INT(11) NOT NULL DEFAULT '1' AFTER `product_id`;