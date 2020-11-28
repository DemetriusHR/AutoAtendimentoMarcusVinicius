DROP TABLE IF EXISTS PedidosProdutos;

CREATE TABLE PedidosProdutos  (
	ID_Atendimento      INTEGER 
   ,ID_Produto          INTEGER
   ,DES_Pedido_Pedido   Varchar(200)
   ,CONSTRAINT FK_Pedido_PedidosProdutos FOREIGN KEY (ID_Atendimento)
	REFERENCES Pedido (ID_Atendimento)
   ,CONSTRAINT FK_Produto_PedidosProdutos FOREIGN KEY (ID_Produto)
	REFERENCES Produto (ID_Produto)
   ,PRIMARY KEY (ID_Atendimento, ID_Produto)
) 

INSERT INTO PedidosProdutos (ID_Atendimento
                            ,ID_Produto
							,DES_Pedido_Pedido)   
VALUES (1
	   ,1
	   ,'PEDIDO DE TESTE')
	  ,(2
	   ,2
	   ,'PEDIDO DE TESTE')