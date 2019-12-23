import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

const Filter = ({ onSetFilter }) => {
  const loginInputId = uuid();

  return (
    <form>
      <h3>Find contact by name</h3>
      <input
        onChange={onSetFilter}
        type="text"
        name="filter"
        id={loginInputId}
        placeholder="Enter a name to search..."
      />
    </form>
  );
};
Filter.propTypes = {
  onSetFilter: PropTypes.func.isRequired,
};

export default Filter;
