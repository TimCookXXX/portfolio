/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "./hero.module.css";

interface HeroProps {
  name: string;
  title: string;
  nextSectionId: string;
}

const Hero: React.FC<HeroProps> = ({ name, title, nextSectionId }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    });
  }, [controls]);

  const contentVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 1 } },
    }),
    []
  );

  const nameVariants = useMemo(
    () => ({
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }),
    []
  );

  const titleVariants = useMemo(
    () => ({
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      },
      hover: { scale: 1.1 },
      tap: { scale: 0.9 },
    }),
    []
  );

  const handleStartAdventure = useCallback(() => {
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }, [nextSectionId]);

  return (
    <div className={styles.container}>
      <div className={styles.background} />

      <motion.div
        className={styles.content}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className={styles.name}
          variants={nameVariants}
          animate={controls}
        >
          {name}
        </motion.h1>

        <motion.h2
          className={styles.title}
          variants={titleVariants}
          animate={controls}
        >
          {title}
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={controls}
        >
          Погрузитесь в неоновый мир веб-разработки
        </motion.p>

        <motion.button
          className={styles.button}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={handleStartAdventure}
        >
          Начать приключение
        </motion.button>
      </motion.div>
    </div>
  );
};

export default React.memo(Hero);
