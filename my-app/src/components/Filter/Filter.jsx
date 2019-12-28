import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class Filter extends Component {
  state = {
    filter: '',
  };

  static propTypes = {
    onFiltrate: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const { filter } = this.state;
    const { contacts, onFiltrate } = this.props;
    if (prevProps.contacts !== contacts || prevState.filter !== filter) {
      onFiltrate(contacts, filter);
    }
  }

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  render() {
    const loginInputId = uuid();
    const { filter } = this.state;
    return (
      <form>
        <h3>Find contact by name</h3>
        <input
          onChange={this.setFilter}
          type="text"
          name="filter"
          id={loginInputId}
          placeholder="Enter a name to search..."
          value={filter}
        />
      </form>
    );
  }
}

export default Filter;
