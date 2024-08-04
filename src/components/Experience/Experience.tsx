/* eslint-disable react-refresh/only-export-components */
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./experience.module.css";

const experiences = [
  {
    id: 1,
    title: "Фриланс Форсаж",
    company: "Индивидуальное предпринимательство / частная практика / фриланс",
    position: "Frontend-разработчик",
    period: "Ноябрь 2023 — Апрель 2024",
    description:
      "В этом захватывающем эпизоде наш герой погружается в мир высокотехнологичных стартапов, проектируя интерфейсы будущего и оптимизируя квантовые базы данных.",
  },
  {
    id: 2,
    title: "Кодовый Рассвет",
    company: "LoftSchool",
    position: "Frontend-разработчик",
    period: "Апрель 2022 — Апрель 2023",
    description:
      "Захватывающая серия, в которой главный герой осваивает передовые технологии веб-разработки, сражаясь с багами и покоряя новые фреймворки.",
  },
];

const Episode: React.FC<{ exp: (typeof experiences)[0]; index: number }> =
  React.memo(({ exp, index }) => {
    return (
      <motion.div
        key={exp.id}
        className={styles.episode}
        initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        <div className={styles.episodeContent}>
          <h2 className={styles.episodeTitle}>{exp.title}</h2>
          <h3 className={styles.episodeSubtitle}>{exp.company}</h3>
          <p className={styles.episodeDetails}>
            {exp.position} | {exp.period}
          </p>
          <p className={styles.episodeDescription}>{exp.description}</p>
        </div>
        <div className={styles.tvButtons}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>
      </motion.div>
    );
  });

const Experience: React.FC = () => {
  const renderEpisodes = useCallback(() => {
    return experiences.map((exp, index) => (
      <Episode key={exp.id} exp={exp} index={index} />
    ));
  }, []);

  return (
    <div className={styles.tvScreen}>
      <div className={styles.staticEffect} aria-hidden="true"></div>
      <motion.h1
        className={styles.showTitle}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Miami Web: Хроники разработчика
      </motion.h1>
      <div className={styles.episodeList}>{renderEpisodes()}</div>
    </div>
  );
};

export default React.memo(Experience);
