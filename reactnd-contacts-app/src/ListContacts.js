import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ListContacts extends Component {
    state = {
        query: ''
    }

    static propTypes = {
        contactsList: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trimStart()
        }))
    }

    render() {
        const {query} = this.state;
        const {contactsList, onDeleteContact} = this.props;

        let displayedContacts = (
            query.trim() === '' ? contactsList :
                           contactsList.filter(contact => contact['name'].toLowerCase().includes(query.toLowerCase()))
        )

        const clearQuery = () => {
            this.updateQuery('')
        }

        return (
            <div className = 'list-contacts'>
                <div className = 'list-contacts-top'>
                    <input
                        className = 'search-contacts'
                        type = 'text'
                        placeholder = 'Search contacts'
                        value = {query}
                        onChange = {(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to = '/create'
                        className = 'add-contact'
                    >
                        Add Contact
                    </Link>
                </div>

                {
                    contactsList.length === displayedContacts.length ? null : 
                        (<div className = 'showing-contacts'>
                            Showing {displayedContacts.length} of {contactsList.length} results
                            <button onClick = {() => clearQuery()}>Show All</button>
                        </div>)
                }

                <ol className = 'contact-list'>
                {
                    // Parentheses after arrow function treats it as one component. Hence, it will implicitly return <li> object.
                    // If we used curly braces, we would have to use the `return` statement explicitly.
                    displayedContacts.map(contact => (
                        /* Notice there are two curly braces in the style tag (line 73)
                        First means we are entering into JavaScript. Second means we are passing an object to the `style` tag.
                        */

                        /* The onClick() function in button tag (line 83) can alternatively be written as:
                        onClick = {props.onDeleteContact.bind(this, contact)}>
                        */
                        <li key = {contact['id']} className = 'contact-list-item'>
                            <div
                                className = 'contact-avatar'
                                style = {{
                                    backgroundImage: `url(${contact['avatarURL']})`
                                }}
                            ></div>
                            <div className = 'contact-details'>
                                <p>{contact['name']}</p>
                                <p>{contact['handle']}</p>
                            </div>
                            <button
                                className = 'contact-remove'
                                onClick = {() => onDeleteContact(contact)}>
                                    Remove
                            </button>
                        </li>
                    ))
                }
                </ol>
            </div>
        );
    }
}

/* How to add PropTypes for Stateless Functional Components?

ListContacts.propTypes = {
    contactsList: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
}
*/

export default ListContacts;