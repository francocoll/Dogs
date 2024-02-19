import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import fondo from "../../assets/fondo.png";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

const Landing = () => {
  return (
    <div className={styles.background}>
      <div className={styles.contIzq}>
        <div className={styles.logo}>
          <a
            href="https://www.linkedin.com/in/franco-coll/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={linkedin} alt="linkedin" className={styles.linkedin} />
          </a>

          <a
            href="https://github.com/francocoll"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <img src={github} alt="github" className={styles.github} />
          </a>
        </div>
        <div className={styles.contTitle}>
          <div className={styles.title}>¡Welcome to the Dogs App!</div>
          <Link to="/home">
            <button className={styles.button}>START</button>
          </Link>
        </div>
      </div>
      <div className={styles.contDer}>
        <img src={fondo} alt="perro" className={styles.dogImg} />
      </div>
    </div>
  );
};

export default Landing;
