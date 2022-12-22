import css from './Error.module.css';
import PropTypes from 'prop-types';

export const Error = ({ title }) => (
  <p className={css.error}>
    {title === '404'
      ? 'Couldn`t find anything...'
      : 'Oops, something went wrong'}
  </p>
);

Error.propTypes = {
  title: PropTypes.string.isRequired,
};
