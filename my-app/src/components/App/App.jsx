import React, { Component } from 'react';
import uuid from 'uuid';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
      this.setState({ contacts: JSON.parse(persistedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  filterContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  setFilter = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  addItem = item => {
    if (
      this.state.contacts.every(
        contact =>
          contact.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase(),
      )
    ) {
      const itemToAdd = { ...item, id: uuid() };
      this.setState(state => ({
        contacts: [...state.contacts, itemToAdd],
      }));
    } else {
      alert(`${item.name} is already in contacts!`);
    }
  };

  deleteItem = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filtratedContacts = this.filterContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddItem={this.addItem} />
        <h2>Contacts</h2>
        <Filter onSetFilter={this.setFilter} />
        <ContactList items={filtratedContacts} onDelete={this.deleteItem} />
      </div>
    );
  }
}

export default App;
