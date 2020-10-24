DROP TABLE IF EXISTS Atendimento;

CREATE TABLE Atendimento (
	ID_Atendimento        SERIAL PRIMARY KEY
   ,DT_Atendimento        TIMESTAMP
   ,ID_Usuario            Integer
   ,Atendimento_Realizado Boolean
   ,CONSTRAINT FK_Atendimento_Usuario FOREIGN KEY (ID_Usuario)
	REFERENCES Usuario (ID_Usuario)
) 

INSERT INTO Atendimento (DT_Atendimento
                        ,ID_Usuario)   
VALUES ('2020-06-30 09:00'
	   ,1)
	  ,('2020-06-30 09:30'
	   ,1)