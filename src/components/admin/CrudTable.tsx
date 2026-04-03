'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, IconButton, Tooltip, Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { DataGrid, GridColDef, GridRowId, GridRenderCellParams } from '@mui/x-data-grid'

interface Field {
  name: string
  label: string
  multiline?: boolean
  type?: string
}

interface Props {
  title: string
  apiPath: string
  columns: GridColDef[]
  fields: Field[]
  emptyForm: Record<string, string | number | boolean>
}

export default function CrudTable({ title, apiPath, columns, fields, emptyForm }: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Record<string, unknown>>(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(apiPath)
    const data = await res.json()
    setRows(Array.isArray(data) ? data : data ? [data] : [])
    setLoading(false)
  }, [apiPath])

  useEffect(() => { fetchData() }, [fetchData])

  const handleOpen = (row?: Record<string, unknown>) => {
    if (row) {
      setForm(row)
      setEditId(row.id as number)
    } else {
      setForm(emptyForm)
      setEditId(null)
    }
    setOpen(true)
  }

  const handleSave = async () => {
    setError('')
    try {
      const method = editId ? 'PUT' : 'POST'
      const url = editId ? `${apiPath}/${editId}` : apiPath
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setOpen(false)
      fetchData()
    } catch {
      setError('Une erreur est survenue.')
    }
  }

  const handleDelete = async (id: GridRowId) => {
    if (!confirm('Supprimer cet élément ?')) return
    await fetch(`${apiPath}/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const actionsColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <Tooltip title="Modifier">
          <IconButton size="small" onClick={() => handleOpen(params.row)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton size="small" color="error" onClick={() => handleDelete(params.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </>
    ),
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={700}>{title}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
          Ajouter
        </Button>
      </Box>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={[...columns, actionsColumn]}
          loading={loading}
          pageSizeOptions={[10, 25]}
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Modifier' : 'Ajouter'}</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            {fields.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type || 'text'}
                multiline={field.multiline}
                rows={field.multiline ? 4 : 1}
                value={form[field.name] || ''}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}