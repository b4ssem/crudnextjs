'use client'

import { useEffect, useState } from 'react'
import {
  Box, Typography, Chip, IconButton, Tooltip,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'

export default function ContactsPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const res = await fetch('/api/contacts')
    setRows(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

  const markRead = async (id: number) => {
    await fetch(`/api/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    })
    fetchData()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce message ?')) return
    await fetch(`/api/contacts/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'message', headerName: 'Message', flex: 2 },
    {
      field: 'read',
      headerName: 'Statut',
      width: 110,
      renderCell: (p) => (
        <Chip
          label={p.value ? 'Lu' : 'Non lu'}
          color={p.value ? 'default' : 'primary'}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 160,
      valueFormatter: (v) => new Date(v).toLocaleDateString('fr-FR'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (p) => (
        <>
          <Tooltip title="Marquer comme lu">
            <IconButton size="small" onClick={() => markRead(p.row.id)}>
              <MarkEmailReadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton size="small" color="error" onClick={() => handleDelete(p.row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>Messages reçus</Typography>
      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  )
}