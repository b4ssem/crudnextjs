import CrudTable from '@/components/admin/CrudTable'

export default function SkillsPage() {
  return (
    <CrudTable
      title="Compétences"
      apiPath="/api/skills"
      columns={[
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'name', headerName: 'Nom', flex: 1 },
        { field: 'icon', headerName: 'Icône', flex: 1 },
        { field: 'percentage', headerName: '%', width: 80 },
        { field: 'category', headerName: 'Catégorie', flex: 1 },
      ]}
      fields={[
        { name: 'name', label: 'Nom de la compétence' },
        { name: 'icon', label: 'Classe icône (ex: bx bxl-html5)' },
        { name: 'percentage', label: 'Pourcentage (0-100)', type: 'number' },
        { name: 'category', label: 'Catégorie' },
      ]}
      emptyForm={{ name: '', icon: '', percentage: 0, category: '' }}
    />
  )
}