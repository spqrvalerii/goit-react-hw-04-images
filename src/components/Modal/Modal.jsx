import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({onClose, currentImageUrl, currentImageDescription}) => {

useEffect(() => {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [onClose])

  const  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (    
      <div className={css.backdrop} onClick={handleClickBackdrop}>
        <div className={css.modal}>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            className={css.img}
          />
        </div>
      </div>
  );  
}

Modal.propTypes = {
  title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
}

export { Modal };

// class OldModal extends Component {
//   static propTypes = {
//     title: PropTypes.string,
//     onClose: PropTypes.func.isRequired,
//     currentImageUrl: PropTypes.string,
//     currentImageDescription: PropTypes.string,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleClickBackdrop = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { currentImageUrl, currentImageDescription } = this.props;

//     return (
//       <>
//         <div className={css.backdrop} onClick={this.handleClickBackdrop}>
//           <div className={css.modal}>
//             <img
//               src={currentImageUrl}
//               alt={currentImageDescription}
//               className={css.img}
//             />
//           </div>
//         </div>,            
//       </>
//     );
//   }
// }
// export { Modal };