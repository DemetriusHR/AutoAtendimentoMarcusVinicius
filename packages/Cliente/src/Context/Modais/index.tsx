import React, { useContext, useMemo, useState } from 'react';
import Modal from 'antd/lib/modal';
import Notification from 'antd/lib/notification';

interface IModaisContext {
  modalLoginVisible: boolean;
  modalCreateLoginVisible: boolean;
  onModalLoginVisible: () => void;
  onModalLoginUnVisible: () => void;
  onModalCreateLoginVisible: () => void;
  onModalCreateLoginUnVisible: () => void;
}

const ModaisContext = React.createContext<IModaisContext>({
  modalLoginVisible: true,
  modalCreateLoginVisible: true,
  onModalLoginVisible: () => null,
  onModalLoginUnVisible: () => null,
  onModalCreateLoginVisible: () => null,
  onModalCreateLoginUnVisible: () => null,
});

const useModaisContext: () => IModaisContext = () => {
  const context = useContext(ModaisContext);

  if (!context) {
    throw new Error('useModaisContext não funciona sem o ModaisProvider');
  }

  return context;
};

const ModaisProvider: React.FC = React.memo(
  ({ children }: { children?: React.ReactNode }) => {
    const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const [modalCreateLoginVisible, setModalCreateLoginVisible] = useState(
      false,
    );

    const onModalLoginVisible = React.useCallback(() => {
      Modal.destroyAll();
      Notification.destroy();
      document.body.style.overflow = 'hidden';
      setModalLoginVisible(true);
    }, []);

    const onModalLoginUnVisible = React.useCallback(() => {
      document.body.style.overflow = 'initial';
      setModalLoginVisible(false);
    }, []);

    const onModalCreateLoginVisible = React.useCallback(() => {
      onModalLoginUnVisible();
      Modal.destroyAll();
      Notification.destroy();
      document.body.style.overflow = 'hidden';
      setModalCreateLoginVisible(true);
    }, [onModalLoginUnVisible]);

    const onModalCreateLoginUnVisible = React.useCallback(() => {
      document.body.style.overflow = 'initial';
      setModalCreateLoginVisible(false);
    }, []);

    const contextValue = useMemo(() => {
      const value = {
        modalLoginVisible,
        modalCreateLoginVisible,
        onModalLoginVisible,
        onModalLoginUnVisible,
        onModalCreateLoginVisible,
        onModalCreateLoginUnVisible,
      };

      return value;
    }, [
      modalLoginVisible,
      modalCreateLoginVisible,
      onModalLoginVisible,
      onModalLoginUnVisible,
      onModalCreateLoginVisible,
      onModalCreateLoginUnVisible,
    ]);

    return (
      <ModaisContext.Provider value={contextValue}>
        {children}
      </ModaisContext.Provider>
    );
  },
);

ModaisProvider.defaultProps = {
  children: <div />,
};

export { useModaisContext };
export default ModaisProvider;
