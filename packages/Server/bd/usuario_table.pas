DROP TABLE IF EXISTS Usuario;

CREATE TABLE Usuario (
	ID_Usuario        SERIAL PRIMARY KEY
   ,NM_Usuario        Varchar(100)
   ,CPF_Usuario       Char(14)
   ,Senha_Usuario     Varchar(25)
   ,TEL_Usuario       Char(15)
   ,ID_Tipo_Usuario   INTEGER
   ,CONSTRAINT FK_Tipo_Usuario FOREIGN KEY (ID_Tipo_Usuario)
	REFERENCES Tipo_Usuario (ID_Tipo_Usuario)
);

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
	   ,3)
	  ,('Cliente Teste'
	   ,'111.111.111-11'
	   ,'cliente@123'
	   ,'(14)99611-1111'
	   ,1);

DROP FUNCTION IF EXISTS resultado_login;

CREATE TYPE resultado_login AS (id_usuario Integer, funcionario boolean);

DROP FUNCTION IF EXISTS login_atendimento;

CREATE FUNCTION login_atendimento(cpf VarChar(11), tel VarChar(12), senha VarChar(25))
  returns resultado_login
  language plpgsql
AS
$$
DECLARE
   cpf_formatado Varchar(14) := '';
   tel_formatado Varchar(15) := '';
   resultado resultado_login;
BEGIN
  cpf_formatado := CONCAT(SUBSTRING(cpf from 1 for 3), '.', SUBSTRING(cpf from 4 for 3), '.', SUBSTRING(cpf from 7 for 3), '-', SUBSTRING(CPF from 10 for 2));
	tel_formatado := CONCAT('(',SUBSTRING(tel from 1 for 2), ')', SUBSTRING(tel from 3 for 5), '-', SUBSTRING(tel from 8 for 4));
	
	SELECT id_usuario
		  ,case
 		     when id_tipo_usuario = 2 then true
			 else false
	       end
		   INTO resultado
    FROM usuario
    WHERE (cpf_usuario = cpf_formatado OR tel_usuario = tel_formatado)
	  AND senha_usuario = senha;
	  
	RETURN resultado;
END;
$$;

DROP FUNCTION IF EXISTS cadastrar_usuario;

CREATE FUNCTION cadastrar_usuario(nome Varchar(100), cpf Char(14), senha Varchar(25), tel Char(15))
  returns Integer
  language plpgsql
AS
$$
DECLARE
   id_usuario_retornado Integer := 0;
BEGIN
	IF (EXISTS(SELECT 1
			   FROM usuario
			   WHERE nm_usuario            = nome
                 AND cpf_usuario     = cpf
                 AND senha_usuario   = senha
                 AND tel_usuario     = tel
                 AND id_tipo_usuario = 1))
	THEN
	  RAISE EXCEPTION 'Usuário já cadastrado!'; 
	END IF;

    INSERT INTO usuario(nm_usuario, cpf_usuario, senha_usuario, tel_usuario, id_tipo_usuario)
    VALUES (nome, cpf, senha, tel, 1);
             
    id_usuario_retornado := currval(pg_get_serial_sequence('usuario','id_usuario'));
	  
	RETURN id_usuario_retornado;
END;
$$;