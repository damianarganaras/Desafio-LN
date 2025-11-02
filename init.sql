CREATE TABLE `productos` (
  `id` integer PRIMARY KEY,
  `sku` varchar(255),
  `descripcion_corta` varchar(255),
  `descripcion_larga` varchar(255),
  `qty` integer,
  `ubicacion_imagen` varchar(255),
  `producto_tipo_id` integer NOT NULL,
  `producto_categoria_id` integer NOT NULL,
  `producto_estado_id` integer NOT NULL,
  `fecha_creacion` timestamp
);

CREATE TABLE `producto_estado` (
  `id` integer PRIMARY KEY,
  `descripcion` varchar(255)
);

CREATE TABLE `lista_precios` (
  `id` integer PRIMARY KEY,
  `precio` decimal,
  `fecha_desde` timestamp,
  `fecha_hasta` timestamp,
  `producto_id` integer NOT NULL
);

CREATE TABLE `producto_tipo` (
  `id` integer PRIMARY KEY,
  `codigo` varchar(255),
  `descripcion` varchar(255)
);

CREATE TABLE `producto_categoria` (
  `id` integer PRIMARY KEY,
  `codigo` varchar(255),
  `descripcion` varchar(255)
);

CREATE TABLE `pedidos` (
  `id` integer PRIMARY KEY,
  `fecha_circulacion` timestamp,
  `precio` decimal,
  `clase_entrega` varchar(255),
  `condicion_pago_aplicada` varchar(255),
  `id_cliente` varchar(255),
  `producto_id` integer NOT NULL,
  `cliente_id` integer NOT NULL,
  `cantidad_solicitada` integer
);

CREATE TABLE `clientes` (
  `id` integer PRIMARY KEY,
  `nombre` varchar(255),
  `apellido` varchar(255),
  `domicilio` varchar(255),
  `cuit` varchar(255)
);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_estado_id`) REFERENCES `producto_estado` (`id`);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_tipo_id`) REFERENCES `producto_tipo` (`id`);

ALTER TABLE `lista_precios` ADD FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

ALTER TABLE `productos` ADD FOREIGN KEY (`producto_categoria_id`) REFERENCES `producto_categoria` (`id`);

ALTER TABLE `pedidos` ADD FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

ALTER TABLE `pedidos` ADD FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

-- INSERT DE PRODUCTO ESTADO --
INSERT INTO producto_estado (id, descripcion) VALUES
  (1, 'Deshabilitado'),
  (2, 'Habilitado'),
  (3, 'Mostrar');

-- INSERT DE PRODUCTO TIPO --
INSERT INTO producto_tipo (id, codigo, descripcion) VALUES
  (1, 'DIA', 'Diarios'),
  (2, 'RVT', 'Revistas'),
  (3, 'OPC', 'Opcionales');

-- INSERT DE PRODUCTO CATEGORIA --
INSERT INTO producto_categoria (id, codigo, descripcion) VALUES
  (1, 'LNA', 'Familia La Nación'),
  (2, 'POP', 'Familia Popular'),
  (3, 'HOL', 'Familia Hola'),
  (4, 'JAR', 'Familia Jardín'),
  (5, 'LIV', 'Familia Living'),
  (6, 'LUG', 'Familia Lugares'),
  (7, 'OHL', 'Familia Ohlalá'),
  (8, 'RST', 'Familia Rolling Stone'),
  (9, 'VER', 'Familia Vertice'),
  (10, 'TAP', 'Familia Tapas'),
  (11, 'SHT', 'One Shot'),
  (12, 'PLA', 'Opcionales Ed. Planeta'),
  (13, 'PRH', 'Pengüin Random House'),
  (14, 'GEN', 'Generico');

-- INSERT DE CLIENTES --
INSERT INTO clientes (id, nombre, apellido, domicilio, cuit) VALUES
  (1, 'Roberto', 'Sanchez', 'MANDISOVI 2989', '30619823873'),
  (2, 'Florencia', 'Gomez', 'DOBLAS 1769/71', '27221512117'),
  (3, 'Adriana', 'MERONI', 'SARMIENTO 547', '20205558692'),
  (4, 'Mario', 'Aguirre', 'PARANA 26', '30205558692'),
  (5, 'Otero', 'Maria', 'SANTA FE 16', '20201558691'),
  (6, 'Juan', 'Lopez', 'SANTA FE 16', '30680478070');

-- INSERT DE PRODUCTOS --
INSERT INTO productos (id, sku, descripcion_corta, descripcion_larga, qty, ubicacion_imagen, producto_tipo_id, producto_categoria_id, producto_estado_id, fecha_creacion) VALUES
  (1, 'DLN01', 'LA NACION LUNES', 'Diario La Nación Lunes', NULL, NULL, 1, 1, 1, '2025-05-07 00:00:00.000000'),
  (2, 'HOL11020300373', 'HOLA', '¡HOLA! Argentina Ed.373', 6, 'https://dev-media-admin/media-folder/imagenes/HOL11020300373.jpg', 2, 3, 3, '2025-09-27 00:00:00.000000'),
  (3, 'JAR11021400001', 'AGENDA JARDIN', 'AGENDA JARDIN ED.1', 9, 'https://dev-media-admin/media-folder/imagenes/JAR11021400001.jpg', 2, 4, 3, '2025-05-07 00:00:00.000000'),
  (4, 'HOL11020300398', 'HOLA', '¡HOLA! Argentina Ed.398', 10, NULL, 1, 3, 3, '2025-05-17 00:00:00.000000'),
  (5, 'OPC13066300001', 'LIBROS PLANETA', 'EL CLUB DEL CRIMEN DE LOS JUEVES', 12, 'https://dev-media-admin/media-folder/imagenes/OPC13066300001.jpg', 3, 12, 3, '2025-06-09 00:00:00.000000'),
  (6, 'OPC11092810014', 'JARD EN CASA - RE', 'JARD EN CASA - RZ - ED. 10014', 5, 'https://dev-media-admin/media-folder/imagenes/OPC11092810014.jpg', 3, 14, 3, '2025-01-09 00:00:00.000000'),
  (7, 'HOL11020300406', 'HOLA', '¡HOLA! Argentina Ed.406', 9, 'https://dev-media-admin/media-folder/imagenes/HOL11020300406.jpg', 2, 3, 1, '2025-03-19 00:00:00.000000'),
  (8, 'POP01', 'POPULAR LUN', 'Diario El Popular Lunes', NULL, NULL, 1, 2, 1, '2025-03-19 00:00:00.000000'),
  (9, 'POP02', 'POPULAR MAR', 'Diario El Popular Martes', NULL, NULL, 1, 2, 1, '2025-05-15 00:00:00.000000'),
  (10, 'LUG00006500259', 'LUGARES', 'LUGARES', NULL, NULL, 3, 6, 3, '2025-03-19 00:00:00.000000'),
  (11, 'HOL11020300401', 'HOLA', '¡HOLA! Argentina Ed.401', NULL, NULL, 3, 3, 3, '2025-07-28 00:00:00.000000');

-- INSERT DE LISTA DE PRECIOS --
INSERT INTO lista_precios (id, precio, fecha_desde, fecha_hasta, producto_id) VALUES
  (1, 8, '2025-09-05 03:00:00.000000', '2025-11-07 03:00:00.000000', 2),
  (2, 8, '2025-09-05 03:00:00.000000', '2025-10-07 03:00:00.000000', 3),
  (3, 7, '2025-09-05 03:00:00.000000', '2025-10-12 03:00:00.000000', 5),
  (4, 7, '2025-09-05 03:00:00.000000', '2025-12-11 03:00:00.000000', 10),
  (5, 17, '2025-09-05 03:00:00.000000', '2025-12-01 03:00:00.000000', 4);

-- INSERT DE PEDIDOS --
INSERT INTO pedidos (id, fecha_circulacion, precio, clase_entrega, id_cliente, condicion_pago_aplicada, producto_id, cliente_id, cantidad_solicitada) VALUES
  (1, '2025-01-03 00:00:00.000000', 888, 'ASG', '106', 'FAC', 2, 1, 5),
  (2, '2025-11-03 00:00:00.000000', 78, 'ASG', '106', 'FAC', 3, 1, 15),
  (3, '2025-11-13 00:00:00.000000', 17, 'REP', '106', 'FAC', 4, 2, 74),
  (4, '2025-12-01 00:00:00.000000', 45, 'REP', '106', 'FAC', 5, 2, 45),
  (5, '2025-10-01 00:00:00.000000', 5, 'ASIG', '106', 'FAC', 5, 3, 45),
  (6, '2025-10-11 00:00:00.000000', 35, 'ASIG', '106', 'FAC', 10, 4, 8);