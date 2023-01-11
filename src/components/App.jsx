import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmitClick = (name, number) => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  onChecked = name => {
    return this.state.contacts.find(contact => contact.name === name);
  };

  onFilterName = e => {
    this.setState({
      filter: e.currentTarget.value.toLowerCase(),
    });
  };
  onDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contacts);
    if (parsContacts) {
      this.setState({
        contacts: parsContacts,
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontSize: 20,
        }}
      >
        <h1
          style={{
            color: ' #008997',
          }}
        >
          Phonebook
        </h1>
        <ContactForm
          onChecked={this.onChecked}
          onClick={this.onSubmitClick}
        ></ContactForm>

        {contacts.length !== 0 && (
          <>
            <h2
              style={{
                color: '#0367a6',
              }}
            >
              Contacts
            </h2>
            <Filter value={filter} onFilter={this.onFilterName}></Filter>
          </>
        )}

        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.onDelete}
        ></ContactList>
      </div>
    );
  }
}
