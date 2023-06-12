// import { ReactDOM } from 'react';
import ReactDOM from 'react-dom';


type PropsType = {
  onClick?: () => void;
  children?: React.ReactNode;
};

const ModalOverlay = ({ children, onClick }: PropsType) => {
  return (
    <>
      {/* backdrop overlay */}
      <div className="fixed inset-0 bg-black/70 z-[105]" onClick={onClick}></div>
      {/* Modal */}
      <div className="h-full lg:h-[620px] w-full lg:w-[640px] mx-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
      text-white bg-[#252525] shadow-lg shadow-black rounded-md z-[105]">
        {children}
      </div>
    </>
  );
};

const Modal = ({ onClick, children }: PropsType) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay onClick={onClick}>{children}</ModalOverlay>,
        document.getElementById('modal-root')!
      )}
    </>
  );
};

export default Modal;