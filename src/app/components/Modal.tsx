import { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ModalComponentProps {
  title?: string;
  children: ReactNode;
  openImmediately?: boolean;
  setClose?: (value: boolean) => void;
}

let openModalCount = 0; // Contador de modais abertos

function ModalComponent({ title, children, openImmediately = false, setClose }: ModalComponentProps) {
  const [show, setShow] = useState(openImmediately);

  // Função para calcular a largura da barra de rolagem
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  useEffect(() => {
    const pageContent = document.getElementById('page-content'); // Seleciona o container da página

    if (show) {
      openModalCount++; // Incrementa o contador de modais abertos
      if (openModalCount === 1 && pageContent) {
        const scrollbarWidth = getScrollbarWidth();
        document.body.style.overflow = 'hidden'; // Impede a rolagem da página
        if (scrollbarWidth > 0) {
          pageContent.style.paddingRight = `${scrollbarWidth}px`; // Ajusta o padding do container para manter a posição
        }
      }
    } else {
      openModalCount--; // Decrementa o contador de modais abertos
      if (openModalCount === 0 && pageContent) {
        document.body.style.overflow = ''; // Restaura a rolagem
        pageContent.style.paddingRight = ''; // Restaura o padding do container
      }
    }

    // Limpeza quando o componente for desmontado
    return () => {
      openModalCount--;
      if (openModalCount === 0 && pageContent) {
        document.body.style.overflow = ''; // Restaura a rolagem
        pageContent.style.paddingRight = ''; // Restaura o padding do container
      }
    };
  }, [show]);

  const handleClose = () => {
    setShow(false);
    if (setClose) {
      setClose(false);
    }
  };

  const handleShow = () => setShow(true);

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg z-50" style={{ maxHeight: '92vh', overflowY: 'auto' }}>
        <div className="flex justify-between items-center p-4 border-b">
          {title && <h1 className="text-2xl text-gray-700">{title}</h1>}
          <button onClick={handleClose} className="text-blue-500 text-2xl">&times;</button>
        </div>
        <div className="p-4" style={{ overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );

  if (openImmediately) {
    return (
      <>
        {show && ReactDOM.createPortal(modalContent, document.body)}
      </>
    );
  }

  return (
    <>
      <button onClick={handleShow} className="cursor-pointer text-blue-500 text-lg">
        {title}
      </button>

      {show && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}

export default ModalComponent;
