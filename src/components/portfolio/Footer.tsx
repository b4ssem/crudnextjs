export default function Footer({ name }: { name: string }) {
  return (
    <footer className="footer">
      <div className="footer__bg">
        <div className="footer__container bd-grid">
          <div>
            <h1 className="footer__title">{name}</h1>
          </div>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} {name}. Tous droits réservés.</p>
      </div>
    </footer>
  )
}