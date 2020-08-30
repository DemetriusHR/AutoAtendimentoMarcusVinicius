DROP TABLE IF EXISTS Tipo_Usuario;

CREATE TABLE Tipo_Usuario (
    ID_Tipo_Usuario SERIAL PRIMARY KEY
   ,NM_Tipo_Usuario Varchar(50)
) 

INSERT INTO Tipo_Usuario (NM_Tipo_Usuario) 
VALUES ('CLIENTE')
      ,('FUNCIONÁRIO')