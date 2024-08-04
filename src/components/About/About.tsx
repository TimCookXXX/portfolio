/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useMemo, useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import styles from "./about.module.css";
import photo from "../../assets/photo.jpeg";

const skills = [
  "JavaScript",
  "React",
  "Redux",
  "HTML5",
  "CSS3",
  "TypeScript",
  "Firebase",
  "Node.js",
  "Express",
  "MongoDB",
  "Git",
  "Webpack",
  "Jest",
];

interface AboutProps {
  id?: string;
}

const photoVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.3,
      rotate: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5,
      },
    },
  },
};

const SkillBadge: React.FC<{ skill: string; index: number }> = React.memo(
  ({ skill, index }) => {
    const controls = useAnimation();

    useEffect(() => {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1 },
      });
    }, [controls, index]);

    return (
      <motion.div
        key={skill}
        className={styles.skillNeon}
        custom={index}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controls}
        whileHover={{
          scale: 1.1,
          rotate: [0, 5, -5, 0],
          transition: {
            duration: 0.3,
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.5,
            },
          },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {skill}
      </motion.div>
    );
  }
);

const About: React.FC<AboutProps> = ({ id }) => {
  const handleHoverStart = useCallback(() => {}, []);
  const handleHoverEnd = useCallback(() => {}, []);

  const memoizedSkills = useMemo(
    () =>
      skills.map((skill, index) => (
        <SkillBadge key={skill} skill={skill} index={index} />
      )),
    []
  );

  return (
    <motion.div
      id={id}
      className={styles.aboutContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={styles.photoFrame}
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <motion.img
          src={photo}
          alt="Tim"
          className={styles.photo}
          variants={photoVariants}
          whileHover="hover"
        />
      </motion.div>

      <motion.div
        className={styles.bioContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.h2
          className={styles.name}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Tim
        </motion.h2>
        <motion.p
          className={styles.bio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Я - Frontend-разработчик, влюбленный в красоту кода и силу технологий.
          Мой путь в мире веб-разработки - это непрерывное приключение, где
          каждый проект - новый вызов, а каждая строка кода - шаг к
          совершенству. Я не просто создаю сайты, я создаю цифровые произведения
          искусства, которые оживают в руках пользователей. Мое кредо -
          "Инновации через код, красота через дизайн".
        </motion.p>
      </motion.div>

      <motion.div
        className={styles.skillsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.h3
          className={styles.skillsTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          Мой технологический арсенал:
        </motion.h3>
        <div className={styles.skills}>{memoizedSkills}</div>
      </motion.div>
    </motion.div>
  );
};

export default React.memo(About);
