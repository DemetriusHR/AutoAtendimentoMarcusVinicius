DROP TABLE IF EXISTS Usuario;

CREATE TABLE Usuario (
	ID_Usuario        SERIAL PRIMARY KEY
   ,NM_Usuario        Varchar(100)
   ,CPF_Usuario       Char(14)
   ,Senha_Usuario     Varchar(25)
   ,TEL_Usuario       Char(15)
   ,SN_Root           Boolean
   ,ID_Tipo_Usuario   INTEGER
   ,CONSTRAINT FK_Tipo_Usuario FOREIGN KEY (ID_Tipo_Usuario)
	REFERENCES Tipo_Usuario (ID_Tipo_Usuario)
) 

INSERT INTO Usuario (NM_Usuario
                    ,CPF_Usuario
                    ,Senha_Usuario
                    ,TEL_Usuario
                    ,SN_Root
					,ID_Tipo_Usuario)   
VALUES ('Demétrius'
	   ,'416.091.388-13'
	   ,'admin@123'
	   ,'(14)99690-3744'
	   ,true
	   ,2)
	  ,('Cliente Teste'
	   ,'111.111.111-11'
	   ,'cliente@123'
	   ,'(14)99611-1111'
	   ,false
	   ,1)