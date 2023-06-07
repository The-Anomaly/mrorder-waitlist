import { Logo } from "assets";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const goToTop = () => {
    window.scrollTo(-0, -0);
  };

  const handleWaitlist = () => {
    navigate("/waitlist");
  };
  return (
    <footer className={styles.footerBg}>
      <div className={`appContainer ${styles.footer}`}>
        <h4>We are cooking something.</h4>
        <button onClick={handleWaitlist}>Join Waitlist</button>
        <p>Interested in adding your restaurant to Mr Order? </p>
        <a href="mailto:">Send Us an email</a>
        <hr />
        <Logo role="button" onClick={goToTop} className={styles.logo} />
      </div>
    </footer>
  );
};

export { Footer };
