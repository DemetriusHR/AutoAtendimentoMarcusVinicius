import React from 'react';
import Modal from 'antd/lib/modal';

import { useModaisContext } from '../../../Context/Modais';

const ModalLogin: React.FC = React.memo(
  () => {
    const { modalLoginVisible, onModalLoginUnVisible } = useModaisContext();

    return (
      <Modal
        title="Faça seu Login"
        visible={
          modalLoginVisible
        }
        onCancel={
          onModalLoginUnVisible
        }
        footer={
          null
        }
        destroyOnClose
      >
        <p>Login</p>
      </Modal>
    );
  },
);

export default ModalLogin;
