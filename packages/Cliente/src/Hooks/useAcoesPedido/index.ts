import Notification from 'antd/lib/notification';

import IPedidoFuncionario from '../../Interfaces/IPedidoFuncionario';

function setPedido(pedido: IPedidoFuncionario): void {
  if (!pedido.dataEntrega) {
    Notification.success({
      message: 'Pedido Entregue com Sucesso!',
    });
  } else if (!pedido.dataDevolucao) {
    Notification.success({
      message: 'Pedido Devolvido com Sucesso',
    });
  }
}

interface IuseAcoesPedido {
  setPedido: (pedido: IPedidoFuncionario) => void;
}

function useAcoesPedido(): IuseAcoesPedido {
  return {
    setPedido,
  };
}

export default useAcoesPedido;
