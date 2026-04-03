'use client'

import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import type { Navigation } from '@toolpad/core'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import BuildIcon from '@mui/icons-material/Build'
import FolderIcon from '@mui/icons-material/Folder'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import EmailIcon from '@mui/icons-material/Email'
import { SessionProvider, useSession, signOut } from 'next-auth/react'

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Portfolio' },
  { segment: 'admin', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Contenu' },
  { segment: 'admin/about', title: 'À propos', icon: <PersonIcon /> },
  { segment: 'admin/skills', title: 'Compétences', icon: <BuildIcon /> },
  { segment: 'admin/projects', title: 'Projets', icon: <FolderIcon /> },
  { segment: 'admin/experiences', title: 'Expériences', icon: <WorkIcon /> },
  { segment: 'admin/education', title: 'Formations', icon: <SchoolIcon /> },
  { kind: 'divider' },
  { segment: 'admin/contacts', title: 'Messages reçus', icon: <EmailIcon /> },
]

function DashboardApp({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  const authentication = {
    signIn: () => {},
    signOut: () => signOut({ callbackUrl: '/login' }),
  }

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{ title: 'Portfolio Admin' }}
      session={session}
      authentication={authentication}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DashboardApp>{children}</DashboardApp>
    </SessionProvider>
  )
}