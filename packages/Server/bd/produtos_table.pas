DROP TABLE IF EXISTS Produto;

CREATE TABLE Produto (
	ID_Produto        SERIAL PRIMARY KEY
   ,NM_Produto        Varchar(50)
   ,Cor_Produto       Varchar(20)
   ,NO_Produto        Integer
   ,Descricao_Produto Varchar(200)
   ,Tipo_Produto      Varchar(20)
) 

INSERT INTO Produto (NM_Produto
                    ,Cor_Produto
                    ,NO_Produto
                    ,Descricao_Produto
                    ,Tipo_Produto)   
VALUES ('SMOKING'
	   ,'PRETO'
	   ,42
	   ,'SMOKING SIMPLES'
	   ,'TRAJE')
	  ,('TERNO'
	   ,'PRETO'
	   ,41
	   ,'PALETÓ SIMPLES'
	   ,'TRAJE')