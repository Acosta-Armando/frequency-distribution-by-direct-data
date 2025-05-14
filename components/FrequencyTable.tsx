import React, { FC } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { NumberFrequency } from './Main'
import Title from './common/Title'

interface FrequencyTableProps {
  tableHead: string[]
  tableData: NumberFrequency[]
}

const FrequencyTable: FC<FrequencyTableProps> = ({ tableHead, tableData }) => {
  const totalf = tableData.reduce((acc, data) => acc + data.f, 0);
  const totalh = tableData.reduce((acc, data) => acc + data.h!, 0);
  const totalp = tableData.reduce((acc, data) => acc + data.p!, 0);
  
  return (
    <section className='w-full flex flex-col gap-2 overflow-x-auto'>
      <Title title='Frequency Table'/>
      <Paper className='w-full overflow-x-auto'>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {tableHead.map((head, idx) => (
                <TableCell key={idx}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data, idx) => {
              const { X, f, F, h, p, H, P } = data
              return (
                <TableRow className='cursor-pointer' key={idx} hover>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{X}</TableCell>
                  <TableCell>{f}</TableCell>
                  <TableCell>{F}</TableCell>
                  <TableCell>{h}</TableCell>
                  <TableCell>{p}%</TableCell>
                  <TableCell>{H}</TableCell>
                  <TableCell>{P}%</TableCell>
                </TableRow>
              )
            })}
            <TableRow className='cursor-pointer' hover>
              <TableCell>∑</TableCell>
              <TableCell></TableCell>
              <TableCell>{totalf}</TableCell>
              <TableCell></TableCell>
              <TableCell>{totalh}</TableCell>
              <TableCell>{totalp}%</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </Paper>
    </section>
  )
}

export default FrequencyTable
