import React, { useCallback, useEffect, useState } from 'react';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import Notification from 'antd/lib/notification';
import styled from 'styled-components';

import ButtonConfirm from '../../../../Components/ButtonConfirm';
import Input from '../../../../Components/Input';
import shadeColor from '../../../../Utils/ShadeColor';
import ProdutoListComponent from './Components/ProdutoList';
import comparaProduto from './Utils/comparaProduto';
import useProdutos from '../../../../Hooks/useProdutos';

const spanConfig = {
  span: 24,
};

const ButtonAdicionar = styled.button`
  color: var(--sucess-color);

  :active {
    color: ${(props) => shadeColor(props.theme.sucessColor, -20)};
  }
`;

export interface IProduto {
  id: number;
  idProduto: 1;
  detalhes: string;
}

interface IDetalhesProdutosCadastro {
  idPedido: number;
}

const DetalhesProdutosCadastro: React.FC<IDetalhesProdutosCadastro> = React.memo(
  ({ idPedido }: IDetalhesProdutosCadastro) => {
    const { state, getProdutos } = useProdutos();
    const [form] = Form.useForm();
    const [produtos, setProdutos] = useState<IProduto[]>([]);

    useEffect(() => {
      getProdutos();
    }, [getProdutos]);

    const onFinish = useCallback(
      (values) => {
        setProdutos((prevState) => {
          const produtoNovo = {
            id: Math.floor(Math.random() * 100),
            idProduto: values.produto,
            detalhes: values.detalhes,
          };

          if (comparaProduto(prevState, produtoNovo)) {
            return [...prevState, produtoNovo];
          }

          return [...prevState];
        });

        form.resetFields();
      },
      [form],
    );

    const voltarStep = useCallback(() => {
      Notification.success({
        message: 'Atendimento Cancelado com sucesso!',
        description: idPedido,
      });
    }, [idPedido]);

    const removeProduto = useCallback((produto) => {
      setProdutos((prevState) => {
        const stateModificado = [...prevState];
        const newState = stateModificado.filter(
          (produtoState) => produto.id !== produtoState.id,
        );

        return [...newState];
      });
    }, []);

    const confirmar = useCallback(() => {
      if (produtos.length) {
        Notification.success({
          message: 'Atendimento Confirmado com sucesso!',
          description: idPedido,
        });
      } else {
        Notification.error({
          message: 'Não é possível Confirmar o Atendimento!',
          description: 'Você deve cadastrar pelo menos um produto',
        });
      }
    }, [produtos, idPedido]);

    return (
      <div className="py-8">
        <Form
          labelCol={spanConfig}
          wrapperCol={spanConfig}
          name="produtos-form"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Produto"
            name="produto"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira o Produto',
              },
            ]}
          >
            <Select>
              {state.produtos.map((produto) => (
                <Select.Option
                  key={produto.idproduto}
                  value={produto.idproduto}
                >
                  {produto.nmproduto}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="w-full h-4" />
          <Form.Item
            label="Detalhes"
            name="detalhes"
            required={false}
            rules={[
              {
                required: true,
                message: 'Insira os Detalhes do Produto',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="w-full h-2" />
          <ButtonAdicionar type="submit">+ Adicionar Produto</ButtonAdicionar>
        </Form>
        {produtos.length >= 1 && (
          <div className="py-4">
            <p className="text-base">
              {produtos.length > 1
                ? 'Produtos Cadastrados'
                : 'Produto Cadastrado'}
            </p>
            {produtos.map((produto) => (
              <ProdutoListComponent
                key={produto.id}
                removeProduto={removeProduto}
                {...produto}
              />
            ))}
            <div className="w-full h-2" />
          </div>
        )}
        <div className="w-full h-8" />
        <div className="flex flex-row-reverse">
          <ButtonConfirm className="w-1/3 ml-2" onClick={confirmar}>
            Confirmar Pedido
          </ButtonConfirm>
          <button type="button" onClick={voltarStep}>
            Cancelar Pedido
          </button>
        </div>
      </div>
    );
  },
);

export default DetalhesProdutosCadastro;
