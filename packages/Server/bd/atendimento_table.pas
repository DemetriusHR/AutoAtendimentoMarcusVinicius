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

DROP PROCEDURE IF EXISTS cadastrar_atendimento;

CREATE PROCEDURE cadastrar_atendimento(DT_Atendimento_Novo TIMESTAMP, ID_Usuario_Atendimento Integer)
  language plpgsql
AS
$$
BEGIN
	IF (EXISTS(SELECT 1
			   FROM Atendimento
			   WHERE DT_Atendimento::date = DT_Atendimento_Novo::date
                 AND ID_Usuario           = ID_Usuario_Atendimento))
	THEN
	  RAISE EXCEPTION 'Atendimento diário já cadastrado!'; 
	END IF;

    INSERT INTO Atendimento(DT_Atendimento, ID_Usuario, Atendimento_Realizado)
    VALUES (DT_Atendimento_Novo, ID_Usuario_Atendimento, 'f');
END;
$$;