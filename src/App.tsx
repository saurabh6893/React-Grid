import React, { useState } from 'react'
import '@silevis/reactgrid/styles.css'
import './App.css'
import { ReactGrid, Column, Row } from '@silevis/reactgrid'

export interface Person {
  [key: string]: any
  name: string
  race: string
  powerLevel: number
}

const getPeople = (): Person[] => [
  {
    name: 'Goku',
    race: 'Saiyan',
    powerLevel: 9720,
  },
  {
    name: 'Vegeta',
    race: 'Saiyan',
    powerLevel: 18500,
  },
  {
    name: 'Piccolo',
    race: 'Namekian',
    powerLevel: 3500,
  },
  {
    name: 'Krillin',
    race: 'Human',
    powerLevel: 1500,
  },
  {
    name: 'Gohan',
    race: 'Saiyan',
    powerLevel: 4000,
  },
]

const getColumns = (): Column[] => [
  { columnId: 'name', width: 250, resizable: true },
  { columnId: 'race', width: 150, resizable: true },
  { columnId: 'powerLevel', width: 150, resizable: true },
]

const headerRow: Row = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Name' },
    { type: 'header', text: 'Race' },
    { type: 'header', text: 'Scouter Reading' },
  ],
}

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: person.name,
    cells: [
      { type: 'text', text: person.name },
      { type: 'text', text: person.race },
      { type: 'text', text: person.powerLevel.toString() },
    ],
  })),
]

const App = () => {
  const [columns, setColumns] = useState<Column[]>(getColumns())
  const [people, setPeople] = useState<Person[]>(getPeople())

  const rows = getRows(people)

  const handleColumnResize = (
    columnId: any,
    width: any,
    selectedColIds: any[]
  ) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex(
        (col) => col.columnId === columnId
      )
      const updatedColumn = { ...prevColumns[columnIndex], width }
      const updatedColumns = [...prevColumns]
      updatedColumns[columnIndex] = updatedColumn
      return updatedColumns
    })
  }

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      onColumnResized={(columnId, width, selectedColIds) =>
        handleColumnResize(columnId, width, selectedColIds)
      }
    />
  )
}

export default App
