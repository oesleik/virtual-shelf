-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema bancoDesenvolvimento
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bancoDesenvolvimento
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bancoDesenvolvimento` DEFAULT CHARACTER SET latin1 ;
USE `bancoDesenvolvimento` ;

-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`autor` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`categoria` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`editora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`editora` (
  `id` INT(10) UNSIGNED NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(250) NOT NULL,
  `subtitulo` VARCHAR(250) NOT NULL,
  `isbn` VARCHAR(14) NULL DEFAULT NULL,
  `paginas` INT(11) NULL DEFAULT NULL,
  `linguagem` VARCHAR(60) NULL DEFAULT NULL,
  `dataPublicacao` DATE NULL DEFAULT NULL,
  `id_google` VARCHAR(60) NOT NULL,
  `id_editora` INT(10) UNSIGNED NOT NULL,
  `volumecol` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_volume_editora1_idx` (`id_editora` ASC),
  CONSTRAINT `fk_volume_editora1`
    FOREIGN KEY (`id_editora`)
    REFERENCES `bancoDesenvolvimento`.`editora` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`usuario` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `sobrenome` VARCHAR(80) NOT NULL,
  `apelido` VARCHAR(60) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `avatar` VARCHAR(250) NOT NULL,
  `exibir_email` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume_comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume_comentario` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  `comentario` TEXT NOT NULL,
  `id_comentario` INT(10) UNSIGNED NULL DEFAULT NULL,
  `usuario_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  INDEX `fk_volume_comentario_usuario1_idx` (`usuario_id` ASC),
  CONSTRAINT `fk_id_volume`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_volume_comentario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`comentario_aprovacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`comentario_aprovacao` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_comentario` INT(10) UNSIGNED NOT NULL,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `aprovacao` INT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_id_ususario_idx` (`id_usuario` ASC),
  INDEX `fk_id_comentario_idx` (`id_comentario` ASC),
  CONSTRAINT `fk_id_comentario`
    FOREIGN KEY (`id_comentario`)
    REFERENCES `bancoDesenvolvimento`.`volume_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_ususario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`comentario_moderacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`comentario_moderacao` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_comentario` INT(10) UNSIGNED NOT NULL,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `tipo_comentario` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_id_comentario_idx` (`id_comentario` ASC),
  CONSTRAINT `fk_id_comentario_mod`
    FOREIGN KEY (`id_comentario`)
    REFERENCES `bancoDesenvolvimento`.`volume_comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`perfil_social`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`perfil_social` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `id_usuario_rede` VARCHAR(120) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `avatar` VARCHAR(250) NOT NULL,
  `url` VARCHAR(250) NOT NULL,
  `rede_social` VARCHAR(40) NOT NULL,
  `exibir` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`login` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `id_perfil_social` INT(10) UNSIGNED NOT NULL,
  `token` VARCHAR(250) NOT NULL,
  `expires_in` VARCHAR(60) NULL DEFAULT NULL,
  `refresh_token` VARCHAR(250) NULL DEFAULT NULL,
  `token_id` VARCHAR(80) NULL DEFAULT NULL,
  `token_type` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_id_perfil_social_idx` (`id_perfil_social` ASC),
  CONSTRAINT `fk_id_perfil_social`
    FOREIGN KEY (`id_perfil_social`)
    REFERENCES `bancoDesenvolvimento`.`perfil_social` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_usuario_login`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`prateleira`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`prateleira` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `nome` VARCHAR(60) NOT NULL,
  `publica` TINYINT(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  INDEX `fk_id_usuario_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_id_usuario_prat`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`prateleira_volume`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`prateleira_volume` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_prateleira` INT(10) UNSIGNED NOT NULL,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  INDEX `fk_id_prateleira_idx` (`id_prateleira` ASC),
  CONSTRAINT `fk_id_prateleira`
    FOREIGN KEY (`id_prateleira`)
    REFERENCES `bancoDesenvolvimento`.`prateleira` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_volume_prat`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume_autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume_autor` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  `id_autor` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_autor_idx` (`id_autor` ASC),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  CONSTRAINT `fk_id_autor`
    FOREIGN KEY (`id_autor`)
    REFERENCES `bancoDesenvolvimento`.`autor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_volume_aut`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume_categoria` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  `id_categoria` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  INDEX `fk_id_categoria_idx` (`id_categoria` ASC),
  CONSTRAINT `fk_id_categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `bancoDesenvolvimento`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_volume_cat`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume_imagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume_imagem` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  `caminho` VARCHAR(250) NOT NULL,
  `tamanho` VARCHAR(10) NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`id`),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  CONSTRAINT `fk_id_volume_img`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `bancoDesenvolvimento`.`volume_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bancoDesenvolvimento`.`volume_usuario` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_volume` INT(10) UNSIGNED NOT NULL,
  `id_usuario` INT(10) UNSIGNED NOT NULL,
  `situacao` VARCHAR(10) NOT NULL,
  `avaliacao` INT(2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_usuario_idx` (`id_usuario` ASC),
  INDEX `fk_id_volume_idx` (`id_volume` ASC),
  CONSTRAINT `fk_id_usuario_vol`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bancoDesenvolvimento`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_volume_usuario`
    FOREIGN KEY (`id_volume`)
    REFERENCES `bancoDesenvolvimento`.`volume` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
