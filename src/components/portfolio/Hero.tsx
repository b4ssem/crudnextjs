type About = {
  name?: string | null
  title?: string | null
  github?: string | null
  linkedin?: string | null
  cvUrl?: string | null
  avatar?: string | null
} | null

export default function Hero({ about }: { about: About }) {
  return (
    <section className="home bd-grid" id="home">
      <div className="home__data" style={{ position: 'relative', zIndex: 10 }}>
        
        <h1 className="home__title" style={{ maxWidth: '60vw', overflowWrap: 'break-word' }}>
          Bonjour,<br />je suis <br />
          
          <span className="home__title-color" style={{ display: 'inline-block', wordBreak: 'break-word' }}>
            {about?.name ?? 'Votre Nom'}
          </span>
          
          <br />{about?.title ?? 'Développeur Web'}
        </h1>
        
        {about?.cvUrl && (
          <a href={about.cvUrl} className="button" download target="_blank">Télécharger CV</a>
        )}
      </div>
      
      <div className="home__social">
        {about?.linkedin && (
          <a href={about.linkedin} className="home__social-icon" target="_blank" rel="noreferrer">
            <i className="bx bxl-linkedin"></i>
          </a>
        )}
        {about?.github && (
          <a href={about.github} className="home__social-icon" target="_blank" rel="noreferrer">
            <i className="bx bxl-github"></i>
          </a>
        )}
      </div>
      
      <div className="home__img">
        <svg className="home__blob" viewBox="0 0 479 467" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <mask id="mask0" mask-type="alpha">
            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"/>
          </mask>
          <g mask="url(#mask0)">
            <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" fill="var(--first-color)"/>
            {about?.avatar && (
              <image className="home__blob-img" x="-15" y="-10" width="105%" height="105%" href={about.avatar} />
            )}
          </g>
        </svg>
      </div>

    </section>
  )
}