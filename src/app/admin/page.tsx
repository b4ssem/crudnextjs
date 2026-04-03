import { Box, Typography, Grid, Paper } from '@mui/material'

export default function AdminHome() {
  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {[
          { label: 'Projets', href: '/admin/projects' },
          { label: 'Compétences', href: '/admin/skills' },
          { label: 'Expériences', href: '/admin/experiences' },
          { label: 'Messages', href: '/admin/contacts' },
        ].map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.label}>            <Paper
              component="a"
              href={item.href}
              sx={{
                p: 3,
                display: 'block',
                textDecoration: 'none',
                borderRadius: 2,
                '&:hover': { boxShadow: 4 },
              }}
            >
              <Typography fontWeight={600}>{item.label}</Typography>
              <Typography variant="body2" color="text.secondary">Gérer →</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}