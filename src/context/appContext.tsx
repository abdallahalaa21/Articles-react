import { createContext, useCallback, useEffect, useState } from 'react';
import Toast from '../components/toast';

export const AppContext = createContext(null);

const defaultToast = {
  text: '',
  show: false,
};

const AppContextProvider = ({ children }) => {
  const [title, setTitle] = useState('');
  const [toast, setToast] = useState({ ...defaultToast });

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...defaultToast }));
  }, []);

  const showToast = useCallback((text) => {
    setToast((prev) => ({ ...prev, text, show: true }));
  }, []);

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setToast((prev) => ({ ...defaultToast }));
      }, 3000);
    }
  }, [toast]);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        showToast,
      }}
    >
      {toast?.show ? (
        <Toast closeToast={closeToast} text={toast?.text || ''} />
      ) : null}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
