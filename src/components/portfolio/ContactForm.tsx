'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(false)
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } else {
      setError(true)
    }
  }

  return (
    <section className="contact section" id="contact">
      <h2 className="section-title">Contact</h2>
      <div className="contact__container bd-grid">
        {sent ? (
          <p style={{ textAlign: 'center', color: 'var(--first-color)' }}>
            ✅ Message envoyé !
          </p>
        ) : (
          <form className="contact__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom"
              className="contact__input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="contact__input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Message"
              className="contact__input"
              rows={7}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
            {error && <p style={{ color: 'red' }}>Erreur lors de l'envoi.</p>}
            <button type="submit" className="button button--flex">
              Envoyer <i className="bx bx-send"></i>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}