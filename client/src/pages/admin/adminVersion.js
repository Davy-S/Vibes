import React from 'react'
import { Table } from 'semantic-ui-react'

const adminVersion = ({
  appMessage,
  availableVersion,
  isMaintenance,
  requiredVersion,
}) => (
  <Table inverted>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          Available Version
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
      </Table.Row>
    </Table.Body>
    <Table.Footer />
  </Table>
)

export default adminVersion
