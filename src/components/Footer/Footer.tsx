import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTelegram, FaEnvelope } from "react-icons/fa";
import styles from "./footer.module.css";

const currentYear = new Date().getFullYear();

const socialLinks = [
  { href: "https://github.com/TimCookXXX", icon: FaGithub },
  { href: "https://t.me/timleadofficial", icon: FaTelegram },
  { href: "mailto:timleadofficial@gmail.com", icon: FaEnvelope },
];

const Footer: React.FC = React.memo(() => {
  return (
    <footer className={styles.footer}>
      <div className={styles.neonSign}>
        <h2 className={`${styles.neonText} ${styles.flicker}`}>
          Tim's Retro Lounge
        </h2>
      </div>
      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <p>Vibing in the 80s</p>
          <p>Coding in the future</p>
          <p>Somewhere in Miami</p>
        </div>
        <div className={styles.socialLinks}>
          {socialLinks.map(({ href, icon: Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
      <div className={styles.copyright}>
        <p>
          &copy; {currentYear} Tim's Retro Lounge. All rights reserved in the
          past, present, and future.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
