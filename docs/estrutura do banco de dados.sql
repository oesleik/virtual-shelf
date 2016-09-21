SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `autor` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `categoria` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `comentario_aprovacao` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_comentario` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `aprovacao` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `comentario_moderacao` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_comentario` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `tipo_comentario` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `login` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_perfil_social` int(10) UNSIGNED NOT NULL,
  `token` varchar(250) NOT NULL,
  `expires_in` varchar(60) DEFAULT NULL,
  `refresh_token` varchar(250) DEFAULT NULL,
  `token_id` varchar(80) DEFAULT NULL,
  `token_type` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `perfil_social` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `id_usuario_rede` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `rede_social` varchar(40) NOT NULL,
  `exibir` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `prateleira` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nome` varchar(60) NOT NULL,
  `publica` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `prateleira_volume` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_prateleira` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome` varchar(60) NOT NULL,
  `sobrenome` varchar(80) NOT NULL,
  `apelido` varchar(60) NOT NULL,
  `email` varchar(120) NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `exibir_email` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume` (
  `id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `isbn` varchar(14) DEFAULT NULL,
  `paginas` int(11) DEFAULT NULL,
  `linguagem` varchar(60) DEFAULT NULL,
  `dataPublicacao` date DEFAULT NULL,
  `id_google` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume_autor` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL,
  `id_autor` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume_categoria` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL,
  `id_categoria` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume_comentario` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL,
  `comentario` text NOT NULL,
  `id_comentario` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume_imagem` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL,
  `caminho` varchar(250) NOT NULL,
  `tamanho` varchar(10) NOT NULL DEFAULT 'normal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `volume_usuario` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_volume` int(10) UNSIGNED NOT NULL,
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `situacao` varchar(10) NOT NULL,
  `avaliacao` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `autor`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `comentario_aprovacao`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `comentario_moderacao`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `login`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `perfil_social`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `prateleira`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `prateleira_volume`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume_autor`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume_categoria`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume_comentario`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume_imagem`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `volume_usuario`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `autor`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `categoria`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `comentario_aprovacao`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `comentario_moderacao`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `login`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `perfil_social`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `prateleira`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `prateleira_volume`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume_autor`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume_categoria`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume_comentario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume_imagem`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
ALTER TABLE `volume_usuario`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;