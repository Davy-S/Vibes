import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'

class adminVersion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false,
    }
  }

  render() {
    const {
      appMessage,
      availableVersion,
      isMaintenance,
      requiredVersion,
    } = this.props

    return(
      <div style={{marginBottom: '25px'}}>
        <Table inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Latest Version
              </Table.HeaderCell>
              <Table.HeaderCell>
                Required Version
              </Table.HeaderCell>
              <Table.HeaderCell>
                isMaintenance
              </Table.HeaderCell>
              <Table.HeaderCell>
                App Message
              </Table.HeaderCell>
              <Table.HeaderCell>
                Edit
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {availableVersion}
              </Table.Cell>
              <Table.Cell>
                {requiredVersion}
              </Table.Cell>
              <Table.Cell>
                {isMaintenance}
              </Table.Cell>
              <Table.Cell>
                {appMessage}
              </Table.Cell>
              <Table.Cell
                textAlign="center"
              >
                <Icon
                  name="edit"
                  fitted
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer />
        </Table>
      </div>
    )
  }
}

export default adminVersion
