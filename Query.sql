/* ---------------------------------------------------- */
/*  Generated by Enterprise Architect Version 15.2 		*/
/*  Created On : 12-nov.-2022 04:32:27 p. m. 				*/
/*  DBMS       : MySql 						*/
/* ---------------------------------------------------- */

SET FOREIGN_KEY_CHECKS=0
; 
/* Drop Tables */

DROP TABLE IF EXISTS `Coctel` CASCADE
;

DROP TABLE IF EXISTS `Ingrediente` CASCADE
;

DROP TABLE IF EXISTS `IngredienteCoctel` CASCADE
;

DROP TABLE IF EXISTS `Unidad` CASCADE
;

DROP TABLE IF EXISTS `Usuario` CASCADE
;

/* Create Tables */

CREATE TABLE `Coctel`
(
	`IdCoctel` INT NOT NULL AUTO_INCREMENT,
	`Nombre` VARCHAR(50) NULL,
	`IdUsuario` INT NOT NULL,
	CONSTRAINT `PK_Coctel` PRIMARY KEY (`IdCoctel` ASC)
)

;

CREATE TABLE `Ingrediente`
(
	`IdIngrediente` INT NOT NULL AUTO_INCREMENT,
	`Nombre` VARCHAR(50) NOT NULL,
	CONSTRAINT `PK_Ingrediente` PRIMARY KEY (`IdIngrediente` ASC)
)

;

CREATE TABLE `IngredienteCoctel`
(
	`IdIngrediente` INT NOT NULL,
	`IdCoctel` INT NOT NULL,
	`CantidadUnidad` FLOAT(7,2) NOT NULL,
	`IdUnidad` INT NOT NULL,
	CONSTRAINT `PK_IngredienteCoctel` PRIMARY KEY (`IdIngrediente` ASC, `IdCoctel` ASC)
)

;

CREATE TABLE `Unidad`
(
	`IdUnidad` INT NOT NULL AUTO_INCREMENT,
	`Nombre` VARCHAR(20) NOT NULL,
	`Abreviatura` VARCHAR(5) NOT NULL,
	CONSTRAINT `PK_Unidad` PRIMARY KEY (`IdUnidad` ASC)
)

;

CREATE TABLE `Usuario`
(
	`IdUsuario` INT NOT NULL AUTO_INCREMENT,
	`Username` VARCHAR(50) NOT NULL,
	`Clave` VARCHAR(200) NOT NULL,
	`Correo` VARCHAR(80) NOT NULL,
	CONSTRAINT `PK_Usuario` PRIMARY KEY (`IdUsuario` ASC)
)

;

/* Create Primary Keys, Indexes, Uniques, Checks */

ALTER TABLE `Coctel` 
 ADD INDEX `IXFK_Coctel_Usuario` (`IdUsuario` ASC)
;

ALTER TABLE `IngredienteCoctel` 
 ADD INDEX `IXFK_IngredienteCoctel_Unidad` (`IdUnidad` ASC)
;

/* Create Foreign Key Constraints */

ALTER TABLE `Coctel` 
 ADD CONSTRAINT `FK_Coctel_Usuario`
	FOREIGN KEY (`IdUsuario`) REFERENCES `Usuario` (`IdUsuario`) ON DELETE Cascade ON UPDATE No Action
;

ALTER TABLE `IngredienteCoctel` 
 ADD CONSTRAINT `FK_IngredienteCoctel_Unidad`
	FOREIGN KEY (`IdUnidad`) REFERENCES `Unidad` (`IdUnidad`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `IngredienteCoctel` 
 ADD CONSTRAINT `FK_Ingrediente`
	FOREIGN KEY (`IdIngrediente`) REFERENCES `Ingrediente` (`IdIngrediente`) ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE `IngredienteCoctel` 
 ADD CONSTRAINT `FK_Coctel`
	FOREIGN KEY (`IdCoctel`) REFERENCES `Coctel` (`IdCoctel`) ON DELETE Cascade ON UPDATE No Action
;

SET FOREIGN_KEY_CHECKS=1
;

Insert into usuario values (1,'ADMIN','AerisVII7','hectoriinq@hotmail.com');
Insert into coctel values (1,'Coca de piña',1);
Insert into ingrediente values (1,'Coca');
Insert into unidad values (1,'Mililitros','ml');
Insert into IngredienteCoctel values (1,1,300,1);

Insert into usuario values (2,'FerLuga','LOL','hector.quezada@lasallistas.org.mx');
Insert into coctel values (2,'Malteada de chocolate',2);
Insert into ingrediente values (2,'Chocolate');
Insert into IngredienteCoctel values (2,2,100,1);
