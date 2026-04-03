import CrudTable from '@/components/admin/CrudTable'

export default function AboutPage() {
  return (
    <CrudTable
      title="À propos"
      apiPath="/api/about"
      columns={[
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'name', headerName: 'Nom', flex: 1 },
        { field: 'title', headerName: 'Titre', flex: 1 },
        { field: 'github', headerName: 'GitHub', flex: 1 },
        { field: 'linkedin', headerName: 'LinkedIn', flex: 1 },
      ]}
      fields={[
        { name: 'name', label: 'Nom complet' },
        { name: 'title', label: 'Titre / Rôle' },
        { name: 'description', label: 'Description', multiline: true },
        { name: 'avatar', label: 'URL Avatar' },
        { name: 'cvUrl', label: 'URL du CV' },
        { name: 'github', label: 'GitHub URL' },
        { name: 'linkedin', label: 'LinkedIn URL' },
        { name: 'email', label: 'Email de contact' },
      ]}
      emptyForm={{ name: '', title: '', description: '', avatar: '', cvUrl: '', github: '', linkedin: '', email: '' }}
    />
  )
}