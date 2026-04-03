type Skill = { id: number; name: string; icon?: string | null; percentage: number }

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section className="skills section" id="skills">
      <h2 className="section-title">Compétences</h2>
      <div className="skills__container bd-grid">
        {skills.map((skill) => (
          <div key={skill.id}>
            <div className="skills__data">
              <div className="skills__names">
                {skill.icon && <i className={`${skill.icon} skills__icon`}></i>}
                <span className="skills__name">{skill.name}</span>
              </div>
              <span className="skills__number">{skill.percentage}%</span>
              <span
                className="skills__bar"
                style={{ width: `${skill.percentage}%` }}
              ></span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}