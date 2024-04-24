import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useToast } from './ToastProvider';

const Toaster = () => {
  const { toasetMesaage } = useToast();
  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      className='bg-dark position-relative'
      style={{ minHeight: '240px', display: 'contents' }}
    >
      <ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
        {toasetMesaage.map((cv) => (
          <Toast bg={cv.intent} key={cv.id}>
            <Toast.Body>{cv.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export default Toaster;
