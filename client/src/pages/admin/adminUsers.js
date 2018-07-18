import React, { Component } from 'react'
import { Table, Icon, Modal, Header, Button, Form, Message } from 'semantic-ui-react'
import { apiKey } from '../_shared/constants'
import socket from '../_shared/sockets'

class adminUsers extends Component {
  constructor() {
    super()

    this.state = {
      modalOpenEdit: false,
      _id: '',
      lastName: '',
      firstName: '',
      email: '',
      city: '',
      birthDate: '',
      description: '',
      editUser: '',
      editError: false,
      serverRes: '',
    }
  }

  handleLastNameChange = (e, { value }) => {
    this.setState({ lastName: value })
  }
  handleFirstNameChange = (e, { value }) => {
    this.setState({ firstName: value })
  }
  handleEmailChange = (e, { value }) => {
    this.setState({ email: value })
  }
  handleCityChange = (e, { value }) => {
    this.setState({ city: value })
  }
  handleBirthDateChange = (e, { value }) => {
    this.setState({ birthDate: value })
  }
  handleDescriptionChange = (e, { value }) => {
    this.setState({ description: value })
  }

  handleSubmitEditUser = (e) => {
    e.preventDefault()
    this.setState({ editError: false })
    const {
      _id,
      firstName,
      lastName,
      email,
      city,
      birthDate,
      description,
    } = this.state
    console.log('submit')
    if(apiKey && _id && firstName && lastName && email && city && birthDate) {
      console.log('update')

      fetch('/vibes/api/updateProfile', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ apiKey, _id, firstName, lastName, email, birthDate, city, description }),
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .then(socket.emit('usersUpdated'))
        .then(this.handleCloseEdit)

    } else {
      this.setState({ editError: true })
    }
  }
  handleOpenEdit = () => this.setState({ modalOpenEdit: true })
  handleCloseEdit = () => this.setState({ modalOpenEdit: false, editUser: '', lastName: '', firstName: '', email: ''})

  handleEditClick = (user) => {
    const {
      _id,
      firstName,
      lastName,
      email,
      birthDate,
      city,
      description
    } = user

    console.log(user)
    this.setState({ modalOpenEdit: true, _id, firstName, lastName, email, birthDate, city, description, editUser: user })
  }

  handleDeleteClick = (user) => {
    this.setState({ openModalDelete: true, deleteUser: user })
    console.log(user)
  }

  render() {
    const {
      users,
    } = this.props

    const {
      editUser
    } = this.state

    return(
      <div>
        <Table inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                id
              </Table.HeaderCell>
              <Table.HeaderCell>
                FirstName
              </Table.HeaderCell>
              <Table.HeaderCell>
                LastName
              </Table.HeaderCell>
              <Table.HeaderCell>
                Email
              </Table.HeaderCell>
              <Table.HeaderCell>
                Birthdate
              </Table.HeaderCell>
              <Table.HeaderCell>
                City
              </Table.HeaderCell>
              <Table.HeaderCell>
                Description
              </Table.HeaderCell>
              <Table.HeaderCell>
                Edit
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { users.map(user => (
              <Table.Row key={user._id}>
                <Table.Cell>
                  {user._id}
                </Table.Cell>
                <Table.Cell>
                  {user.firstName}
                </Table.Cell>
                <Table.Cell>
                  {user.lastName}
                </Table.Cell>
                <Table.Cell>
                  {user.email}
                </Table.Cell>
                <Table.Cell>
                  {user.birthDate}
                </Table.Cell>
                <Table.Cell>
                  {user.city}
                </Table.Cell>
                <Table.Cell>
                  {user.description}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                >
                  <Icon
                    name="edit"
                    fitted
                    onClick={() => this.handleEditClick(user)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer />
        </Table>
        <Modal
          open={this.state.modalOpenEdit}
          onClose={this.handleCloseEdit}
          size='small'
        >
          <Header icon='browser' content='Edit User' />
          <Modal.Content>
            <Form error={this.state.editError} onSubmit={this.handleSubmitEditUser}>
              <Form.Input
                label='First Name'
                defaultValue={editUser.firstName}
                onChange={this.handleFirstNameChange}
              />
              <Form.Input
                label='Last Name'
                defaultValue={editUser.lastName}
                onChange={this.handleLastNameChange}
              />
              <Form.Input
                label='Email'
                defaultValue={editUser.email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                label='City'
                defaultValue={editUser.city}
                onChange={this.handleCityChange}
              />
              <Form.Input
                label='BirthDate'
                defaultValue={editUser.birthDate}
                onChange={this.handleBirthDateChange}
              />
              <Form.Input
                label='Description'
                defaultValue={editUser.description}
                onChange={this.handleDescriptionChange}
              />
              <Message
                error
                header='Action Forbidden'
                content='All inputs must be filled'
              />
              <hr />
              <Button type='submit' color='teal' content='Edit User'/>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default adminUsers
