DROP TABLE IF EXISTS Pedido ;

CREATE TABLE Pedido (
	ID_Atendimento      INTEGER      PRIMARY KEY
   ,DT_Entrega_Pedido   TIMESTAMP
   ,DT_Devolucao_Pedido TIMESTAMP
   ,VL_Pedido           NUMERIC(5,2)
   ,SN_Pago             BOOLEAN      DEFAULT false
   ,entregue            BOOLEAN      DEFAULT false
   ,devolvido           BOOLEAN      DEFAULT false
   ,CONSTRAINT FK_Atendimento_Pedido FOREIGN KEY (ID_Atendimento)
	REFERENCES Atendimento (ID_Atendimento)
) 

INSERT INTO Pedido (ID_Atendimento
                   ,DT_Entrega_Pedido
                   ,DT_Devolucao_Pedido
                   ,VL_Pedido
                   ,SN_Pago)   
VALUES (1
	   ,'2020-07-01 09:00'
	   ,'2020-07-02 09:00'
	   ,100.0
	   ,true)
	  ,(2
	   ,'2020-07-01 09:00'
	   ,'2020-07-02 09:00'
	   ,200.0
	   ,true)