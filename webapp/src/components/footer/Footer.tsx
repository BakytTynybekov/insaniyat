import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-logo">Insaniyat</h3>
          <p className="footer-description">
            Мы — благотворительный фонд, помогающий детям и нуждающимся. Присоединяйтесь к
            нам, чтобы изменить мир к лучшему!
          </p>
        </div>
        <div className="footer-section links">
          <h4 className="footer-heading">Разделы</h4>
          <ul>
            <li>
              <a href="#about">О нас</a>
            </li>
            <li>
              <a href="#programs">Наши программы</a>
            </li>
            <li>
              <a href="#news">Новости</a>
            </li>
            <li>
              <a href="#contacts">Контакты</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4 className="footer-heading">Контакты</h4>
          <ul>
            <li>Адрес: г. Москва, ул. Примерная, 123</li>
            <li>Телефон: +7 (999) 123-45-67</li>
            <li>Email: info@insaniyat.ru</li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4 className="footer-heading">Социальные сети</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124010.png"
                alt="Facebook"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                alt="Instagram"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/124/124021.png"
                alt="Twitter"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Insaniyat. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
