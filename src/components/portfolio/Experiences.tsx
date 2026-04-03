type Experience = { id: number; company: string; role: string; description: string; startDate: string; endDate?: string | null }
type Education = { id: number; school: string; degree: string; field?: string | null; startDate: string; endDate?: string | null }

export default function Experiences({
  experiences, education,
}: {
  experiences: Experience[]
  education: Education[]
}) {
  return (
    <section className="section" id="experiences" style={{ padding: '3rem 0' }}>
      <h2 className="section-title">Parcours</h2>
      <div className="bd-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--first-color)' }}>Expériences</h3>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '3px solid var(--first-color)' }}>
              <strong>{exp.role}</strong> — {exp.company}
              <p style={{ fontSize: '0.85rem', color: '#666' }}>{exp.startDate} – {exp.endDate ?? 'Présent'}</p>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--first-color)' }}>Formations</h3>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '3px solid var(--first-color)' }}>
              <strong>{edu.degree}</strong> — {edu.school}
              <p style={{ fontSize: '0.85rem', color: '#666' }}>{edu.startDate} – {edu.endDate ?? 'En cours'}</p>
              {edu.field && <p>{edu.field}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}