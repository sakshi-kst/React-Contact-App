const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      'id': 'alice',
      'name': 'Alice Cooper',
      'handle': 'alice_cooper',
      'avatarURL': config.origin + '/alice.jpg'
    },
    {
      'id': 'colin',
      'name': 'Colin Smith',
      'handle': 'smith_colin',
      'avatarURL': config.origin + '/colin.jpg'
    },
    {
      'id': 'mary',
      'name': 'Mary Kinsey',
      'handle': 'mary0101',
      'avatarURL': config.origin + '/mary.jpg'
    },
    {
      'id': 'john',
      'name': 'John Doe',
      'handle': 'johndoe',
      'avatarURL': config.origin + '/john.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
