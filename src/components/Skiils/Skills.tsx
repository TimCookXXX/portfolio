/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./skills.module.css";

const skills = [
  { name: "Крутой JavaScript", level: 65 },
  { name: "Стильный React", level: 65 },
  { name: "Неоновый HTML/CSS", level: 80 },
  { name: "Ретро TypeScript", level: 40 },
  { name: "Синтвейв Node.js", level: 40 },
  { name: "Диско Redux", level: 60 },
  { name: "Винтажный Git", level: 90 },
  { name: "Фанковый REST API", level: 50 },
  { name: "Яркий Firebase", level: 40 },
  { name: "Олдскульный MongoDB", level: 35 },
];

const SkillItem: React.FC<{ skill: (typeof skills)[0]; index: number }> =
  React.memo(({ skill, index }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), index * 200);
      return () => clearTimeout(timer);
    }, [index]);

    return (
      <motion.div
        className={styles.skillItem}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <span className={styles.skillRank}>{index + 1}</span>
        <span className={styles.skillName}>{skill.name}</span>
        <div className={styles.skillBar}>
          <motion.div
            className={styles.skillProgress}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <span className={styles.skillLevel}>{skill.level}%</span>
      </motion.div>
    );
  });

const Skills: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const memoizedSkills = useMemo(
    () =>
      skills.map((skill, index) => (
        <SkillItem key={skill.name} skill={skill} index={index} />
      )),
    []
  );

  return (
    <div className={styles.skillsContainer}>
      <motion.h2
        className={styles.title}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Miami Vice Skills Chart
      </motion.h2>
      <div className={styles.skillsChart}>
        <AnimatePresence>{memoizedSkills}</AnimatePresence>
      </div>
      <div className={styles.currentTrack}>
        Now Playing: {skills[currentSkill].name}
      </div>
      <div className={styles.vhsTape}>SKILLS</div>
    </div>
  );
};

export default React.memo(Skills);
