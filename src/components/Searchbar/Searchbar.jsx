import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { Toastify } from '../Toastify/Toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {  
  const [query, setQuery] = useState('')

  const  handleChange = e => {
    setQuery(e.target.value.toLowerCase())
  };

  const handleSubmit = e => {
    e.preventDefault();
    if ((query.trim()) === '') {
      Toastify('warning', 'Enter the name of the picture or photo!');
    } else {
      onSubmit(query.trim());
      setQuery('')
    }
  };

  return (
    <header className={css.bar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <ImSearch style={{ width: 18, height: 18 }} />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export { Searchbar };

// class OldSearchbar extends Component {
//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   state = {
//     query: '',
//   };

//   handleChange = event => {
//     this.setState({
//       query: event.target.value.toLowerCase(),
//     });
//   };

//   handleSubmit = event => {
//     const { query } = this.state;
//     event.preventDefault();
//     if ((query.trim()) === '') {
//       Toastify('warning', 'Enter the name of the picture or photo!');
//     } else {
//       this.props.onSubmit(query.trim());
//       this.setState({ query: '' });
//     }
//   };

//   render() {
//     const { query } = this.state;

//     return (
//       <header className={css.bar}>
//         <form className={css.form} onSubmit={this.handleSubmit}>
//           <button className={css.button} type="submit">
//             <ImSearch style={{ width: 18, height: 18 }} />
//           </button>
//           <input
//             className={css.input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={query}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

