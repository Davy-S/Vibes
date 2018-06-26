import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'

class adminUsers extends Component {
  handleEdit = (user) => {
    console.log(user)
  }

  handleDelete = (user) => {
    console.log(user)
  }

  render() {
    const {
      users,
    } = this.props

    return(
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
              Edit
            </Table.HeaderCell>
            <Table.HeaderCell>
              Delete
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { users.map(user => (
            <Table.Row>
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
              <Table.Cell
                textAlign="center"
              >
                <Icon
                  name="edit"
                  fitted
                  onClick={() => this.handleEdit(user)}
                />
              </Table.Cell>
              <Table.Cell
                textAlign="center"
              >
                <Icon
                  name="delete"
                  fitted
                  onClick={() => this.handleDelete(user)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer />
      </Table>
    )
  }
}

export default adminUsers
