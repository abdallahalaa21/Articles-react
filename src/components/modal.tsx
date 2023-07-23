import React, { useEffect } from 'react';

type TProps = {
  isVisible: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
  onOk?: () => void;
  okText?: string;
  okButtonProps?: any;
  cancelButtonProps?: any;
  cancelText?: string;
  onCancel?: () => void;
  showFooter?: boolean;
};

const Modal = ({
  isVisible,
  closeModal,
  title,
  children,
  onOk,
  okText = 'Ok',
  okButtonProps,
  cancelButtonProps,
  cancelText = 'Cancel',
  onCancel,
  showFooter = true,
}: TProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  return (
    <>
      {isVisible ? (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            <div className='relative w-auto max-w-3xl mx-auto my-6 min-w-[500px]'>
              <div className='relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200'>
                  {title ? (
                    <h3 className='text-3xl font-semibold'>{title}</h3>
                  ) : (
                    ''
                  )}
                  <button
                    className='float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none'
                    onClick={closeModal}
                  >
                    <span className='block w-6 h-6 text-2xl text-black bg-transparent outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative flex-auto p-6'>{children}</div>

                {showFooter ? (
                  <div className='flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200'>
                    <button
                      className='px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none'
                      type='button'
                      onClick={onCancel}
                      {...cancelButtonProps}
                    >
                      {cancelText}
                    </button>
                    <button
                      className='px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none'
                      type='button'
                      onClick={onOk}
                      {...okButtonProps}
                    >
                      {okText}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className='fixed inset-0 bg-black opacity-25 z-60' />
        </>
      ) : null}
    </>
  );
};

export default Modal;
