import { useState } from "react";
import styles from "./styles.module.scss";
import { Logo } from "assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [navBg, setNavBg] = useState(false);

  const handleScroll = () => {
    setNavBg(window.scrollY > 80);
  };
  window.addEventListener("scroll", handleScroll);

  const goToTop = () => {
    navigate("/");
    window.scrollTo(-0, -0);
  };
  return (
    <nav className={`${styles.navBg} ${navBg ? styles.solidBg : ""}`}>
      <div className={`appContainer ${styles.nav}`}>
        <Logo role="button" onClick={goToTop} />
      </div>
    </nav>
  );
};

export { Navbar };
