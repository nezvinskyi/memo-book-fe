// import { createPortal } from 'react-dom';
import { Spinner } from 'react-bootstrap';

// const loadingRoot = document.getElementById('loading-root');

const Loading = ({ size = 100 }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      // zIndex: 100,
    }}
  >
    <Spinner
      style={{
        width: size,
        height: size,
      }}
      animation="border"
    />
  </div>
);

export default Loading;
