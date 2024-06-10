CREATE DATABASE IF NOT EXISTS myapp_database;

-- Usar la base
USE myapp_database;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    email VARCHAR(255),
    contrasenia VARCHAR(255),
    dni INT,
    fecha DATE,
    foto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- Insert de data test a usuarios
INSERT INTO usuarios (id, nombre, email, contrasenia, dni, fecha, foto, createdAt, updatedAt, deletedAt) VALUES
(default, 'agustina_gomez_garcia', 'agustinagg@gmail.com', '123456', '46700974','1987-12-18', 'fotoDePerfil.png', default, default, default),
(default, 'pepegomez', 'pepegomez@gmail.com', 'vacablanca', '48273847', '1969-10-12', 'fotoDePerfil.png', default, default, default),
(default, 'lopez_nacho', 'nacholopez10@gmail.com', 'pajarorojo', '32450284', '1972-05-11', 'fotoDePerfil.png', default, default, default),
(default, 'nicorodriguez8', 'nicorodriguez8@gmail.com', '12354', '37294380', '1967-02-11', 'fotoDePerfil.png', default, default, default),
(default, 'luis_navas', 'luisnavas@gmail.com', 'recital450', '23928493', '1999-03-23', 'fotoDePerfil.png', default, default, default),
(default, 'briangomez', 'briangomez@gmail.com', 'hombrearania', '21643653', '1978-04-24', 'fotoDePerfil.png', default, default, default);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion TEXT,
    nombreArchivoImagen TEXT,
    idUsuario INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

-- Insert de registros de ejemplo en la tabla de productos
INSERT INTO productos (nombre, descripcion, nombreArchivoImagen, idUsuario) VALUES
('Absolut Raspberry', 'Vibrante expresión de vodka infundido con el dulce y ácido sabor de las frambuesas maduras. Su aroma fresco y afrutado anticipa una experiencia gustativa suave y equilibrada, perfecta para cócteles refrescantes o disfrutarlo solo.', 'absolutRasperri.jpg', 1),
('Grey Goose', 'vodka francés de renombre mundial. Destilado meticulosamente con trigo de invierno suave y agua de manantial de Gensac-la-Pallue, ofrece una experiencia excepcionalmente suave y refinada. Con su distintivo sabor limpio y delicado, es el acompañamiento perfecto para cualquier ocasión.', 'gresGoose.png', 1),
('Smirnoff', 'Es reconocido por su calidad y versatilidad. Destilado tres veces y filtrado diez, ofrece una pureza excepcional y un sabor suave', 'smirnoffNaranja.png', 1),
('Jagger', 'Icónica bebida espirituosa alemana, cautiva con su distintivo sabor a base de hierbas y especias', 'jagger.png', 1),
('Fernet', 'Emblemática bebida italiana, seduce con su inigualable amargor equilibrado por notas herbales y especiadas', 'fernet.jpg', 1),
('Black Label', 'Whisky escocés por excelencia de Johnnie Walker, encarna la artesanía y la tradición centenaria.', 'blackLabel.png', 1),
('Campari', 'Aperitivo italiano icónico, cautiva con su distintivo sabor amargo y refrescante.', 'productoscampari.jpg', 1),
('Bacardi', 'Ron legendario de Cuba, destaca por su suavidad y versatilidad. Elaborado con la mezcla perfecta de melaza y agua pura, ofrece un sabor equilibrado con notas sutiles de vainilla y especias.', 'bacardi.png', 1),
('Tanqueray Gin Tonic', 'Emblema del gin premium, deslumbra con su equilibrio entre sabores botánicos y cítricos.', 'gin.png', 1),
('Cosecha Tardía Vino', 'Elixir de dulzura y refinamiento, se distingue por su proceso de cosecha tardía, que concentra los azúcares naturales de las uvas.', 'vinito.webp', 1);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idProducto INT,
    idUsuario INT,
    texto TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idProducto) REFERENCES productos(id)
);

-- Insert de registros de ejemplo en la tabla de comentarios
INSERT INTO comentarios (idProducto, idUsuario, texto) VALUES
(1, 1, 'Llego  rapidisimo!'),
(1, 2, 'Una calidad inigualable'),
(1, 3, 'La mejor bebida del mundo!'),
(2, 1, 'No me gustó'),
(2, 2, 'Esperaba otra cosa'),
(2, 3, 'Llegó rápido'),
(3, 1, 'Buena relacion calidad precio'),
(3, 2, 'Esperaba más....'),
(3, 3, 'Que buena bebida!!'),
(4, 1, 'Me encantó'),
(4, 2, 'Espectacular!'),
(4, 3, 'Tardó mucho en llegar'),
(5, 1, 'Horrible'),
(5, 2, 'La mejor bebida que probé en mi vida!!!!'),
(5, 3, 'Podrían poner más ofertas!'),
(6, 1, 'Venden por mayor?'),
(6, 2, 'Tienen más variedad?'),
(6, 3, 'Una calidad única'),
(7, 1, 'I loved it!'),
(7, 2, 'Llegó la botella rota y no se quisieron hacer cargo...'),
(7, 3, 'Una muy buena atención por parte del vendedor'),
(8, 1, 'Totalmente asqueroso'),
(8, 2, 'Me encantó!'),
(8, 3, 'Quiero comprar pero no hay stock!'),
(9, 1, '100% recomendado'),
(9, 2, 'Esperaba mas....'),
(9, 3, 'Podrían responder más rápido'),
(10, 1, 'Excelente el producto y el servicio'),
(10, 2, 'Hacen envíos al interior?'),
(10, 3, 'Venden la caja de seis o solo por unidad?');