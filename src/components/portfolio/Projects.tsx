type Project = {
  id: number
  title: string
  description: string
  imageUrl?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
  tags?: string | null
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="work section" id="work">
      <h2 className="section-title">Projets</h2>
      <div className="work__container bd-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            {project.imageUrl && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.imageUrl} alt={project.title} />
              </>
            )}
            <div className="project-card-text">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.tags && (
                <div className="skills">
                  {project.tags.split(',').map((tag) => (
                    <a key={tag} href="#">{tag.trim()}</a>
                  ))}
                </div>
              )}
              <div className="btns">
                {project.githubUrl && (
                  <a href={project.githubUrl} className="btn" target="_blank" rel="noreferrer">
                    <i className="bx bxl-github"></i> GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="btn" target="_blank" rel="noreferrer">
                    <i className="bx bx-link-external"></i> Live
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}