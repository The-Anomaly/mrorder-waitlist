import { Logo } from "assets";
import styles from "./styles.module.scss";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo(-0, -0);
  };
  return (
    <footer className={styles.footerBg}>
      <div className={`appContainer ${styles.footer}`}>
        <h4>We are cooking something.</h4>
        <button>Join Waitlist</button>
        <p>Interested in adding your restaurant to Mr Order? </p>
        <a href="mailto:">Send Us an email</a>
        <hr />
        <Logo role="button" onClick={goToTop} className={styles.logo} />
      </div>
    </footer>
  );
};

export { Footer };
