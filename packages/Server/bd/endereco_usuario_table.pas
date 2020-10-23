DROP TABLE IF EXISTS Endereco_Usuario;

CREATE TABLE Endereco_Usuario (
	ID_Endereco_Usuario          SERIAL PRIMARY KEY
   ,Rua_Endereco_Usuario         Varchar(50)
   ,NO_Endereco_Usuario          Integer
   ,Cidade_Endereco_Usuario      Varchar(50)
   ,CEP_Endereco_Usuario         Char(9)
   ,Complemento_Endereco_Usuario Varchar(50)
   ,ID_Usuario                   Integer
   ,CONSTRAINT FK_Endereco_Usuario_Usuario FOREIGN KEY (ID_Usuario)
	REFERENCES Usuario (ID_Usuario)
) 

INSERT INTO Endereco_Usuario (Rua_Endereco_Usuario
                             ,NO_Endereco_Usuario
                             ,Cidade_Endereco_Usuario
                             ,CEP_Endereco_Usuario
                             ,ID_Usuario)   
VALUES ('Rua Nhambiquaras'
	   ,73
	   ,'Tupã'
	   ,'17600-060'
	   ,1)
	  ,('Rua Nhambiquaras'
	   ,73
	   ,'Tupã'
	   ,'17600-060'
	   ,2)