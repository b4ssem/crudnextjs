import CrudTable from '@/components/admin/CrudTable'

export default function ExperiencesPage() {
  return (
    <CrudTable
      title="Expériences professionnelles"
      apiPath="/api/experiences"
      columns={[
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'company', headerName: 'Entreprise', flex: 1 },
        { field: 'role', headerName: 'Poste', flex: 1 },
        { field: 'startDate', headerName: 'Début', width: 100 },
        { field: 'endDate', headerName: 'Fin', width: 100 },
      ]}
      fields={[
        { name: 'company', label: 'Entreprise' },
        { name: 'role', label: 'Poste / Rôle' },
        { name: 'description', label: 'Description', multiline: true },
        { name: 'startDate', label: 'Date de début (ex: 2023)' },
        { name: 'endDate', label: 'Date de fin (laisser vide si actuel)' },
      ]}
      emptyForm={{ company: '', role: '', description: '', startDate: '', endDate: '' }}
    />
  )
}