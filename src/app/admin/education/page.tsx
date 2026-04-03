import CrudTable from '@/components/admin/CrudTable'

export default function EducationPage() {
  return (
    <CrudTable
      title="Formations"
      apiPath="/api/education"
      columns={[
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'school', headerName: 'École', flex: 1 },
        { field: 'degree', headerName: 'Diplôme', flex: 1 },
        { field: 'field', headerName: 'Domaine', flex: 1 },
        { field: 'startDate', headerName: 'Début', width: 100 },
      ]}
      fields={[
        { name: 'school', label: 'Établissement' },
        { name: 'degree', label: 'Diplôme' },
        { name: 'field', label: 'Domaine / Spécialité' },
        { name: 'startDate', label: 'Début' },
        { name: 'endDate', label: 'Fin' },
        { name: 'description', label: 'Description', multiline: true },
      ]}
      emptyForm={{ school: '', degree: '', field: '', startDate: '', endDate: '', description: '' }}
    />
  )
}