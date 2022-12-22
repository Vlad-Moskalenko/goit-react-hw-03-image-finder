import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <button onClick={onClick} className={css.button} type="button">
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
