import { useState } from "react";
import styles from "./styles.module.scss";
import { Logo } from "assets";

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);

  const handleScroll = () => {
    setNavBg(window.scrollY > 80);
  };
  window.addEventListener("scroll", handleScroll);

  const goToTop = () => {
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
