type About = { description?: string | null; avatar?: string | null } | null

export default function About({ about }: { about: About }) {
  return (
    <section className="about section" id="about">
      <h2 className="section-title">À propos</h2>
      <div className="about__container bd-grid">
        {about?.avatar && (
          <div className="about__img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.avatar} alt="Photo de profil" />
          </div>
        )}
        <div>
          <h2 className="about__subtitle">Je suis développeur</h2>
          <p>{about?.description ?? 'Description non renseignée.'}</p>
        </div>
      </div>
    </section>
  )
}