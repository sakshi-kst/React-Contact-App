// This is an alternative to listContacts.js, which uses Class Components. This code instead, uses Stateless Functional Components.
import React from 'react';

function ListContacts(props) {
    return (
        <ol className = 'contact-list'>
            {
                // Parentheses after arrow function treats it as one component. Hence, it will implicitly return <li> object.
                // If we used curly braces, we would have to use the `return` statement explicitly.
                props.contactsList.map(contact => (
                    // Notice there are two curly braces in the style tag.
                    // First means we are entering into JavaScript. Second means we are passing an object to the `style` tag.
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
                        <button className = 'contact-remove'>Remove</button>
                    </li>
                ))
            }
        </ol>
    );
}

export default ListContacts;