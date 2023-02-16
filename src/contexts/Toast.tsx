import { createContext, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type IToastProps = {
  toast: any;
};

const ToastContext = createContext<IToastProps>({} as any);

export const ToastProvider = ({ children }: any) => (
  <ToastContext.Provider value={{ toast }}>
    {children}
    <div className="toast-wrapper">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#262a31',
            color: '#fff',
          },
        }}
        containerStyle={{
          top: '4rem',
        }}
      />
    </div>
  </ToastContext.Provider>
);

export function useToast() {
  const context = useContext(ToastContext);

  return context;
}
