import CrudTable from '@/components/admin/CrudTable'

export default function ProjectsPage() {
  return (
    <CrudTable
      title="Projets"
      apiPath="/api/projects"
      columns={[
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'title', headerName: 'Titre', flex: 1 },
        { field: 'tags', headerName: 'Tags', flex: 1 },
        { field: 'githubUrl', headerName: 'GitHub', flex: 1 },
        { field: 'liveUrl', headerName: 'Live', flex: 1 },
      ]}
      fields={[
        { name: 'title', label: 'Titre du projet' },
        { name: 'description', label: 'Description', multiline: true },
        { name: 'imageUrl', label: "URL de l'image" },
        { name: 'githubUrl', label: 'Lien GitHub' },
        { name: 'liveUrl', label: 'Lien Live' },
        { name: 'tags', label: 'Tags (séparés par virgule)' },
      ]}
      emptyForm={{ title: '', description: '', imageUrl: '', githubUrl: '', liveUrl: '', tags: '' }}
    />
  )
}