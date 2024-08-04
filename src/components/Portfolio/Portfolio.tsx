/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./portfolio.module.css";
import prodmarketImage from "../../assets/prodmarket.jpg";
import amiraFestImage from "../../assets/AmiraFest.jpg";
import starClothingImage from "../../assets/starClothing.jpg";
import staffImage from "../../assets/staff.jpg";
import GitogramImage from "../../assets/Gitogram.jpg";
import loftTaxiImage from "../../assets/loft-taxi.jpg";
import surfImage from "../../assets/surf.jpg";
import TodoImage from "../../assets/Todo.jpg";

const projects = [
  {
    id: 1,
    title: "ProdMarket",
    description:
      "Революционное веб-приложение для торговли замороженными продуктами будущего.",
    imageUrl: prodmarketImage,
    projectUrl: "https://prodmarket-lovat.vercel.app/",
    technologies: ["React", "Firebase"],
  },
  {
    id: 2,
    title: "AmiraFest",
    description:
      "Система управления для мероприятий, улучшающая взаимодействие участников.",
    imageUrl: amiraFestImage,
    projectUrl: "https://amirafest.vercel.app/",
    technologies: ["React", "Redux", "Firebase"],
  },
  {
    id: 3,
    title: "Star Clothing",
    description:
      "Полностью функциональный интернет-магазин, оптимизированный для удобства пользователя.",
    imageUrl: starClothingImage,
    projectUrl: "https://star-clothing.netlify.app/",
    technologies: ["React", "Redux", "Firebase", "Styled-Components"],
  },
  {
    id: 4,
    title: "ViewUsersNav",
    description:
      "Веб-приложение для управления информацией о сотрудниках с системой регистрации и авторизации.",
    imageUrl: staffImage,
    projectUrl: "https://viewusersnav.netlify.app/",
    technologies: ["React", "Redux"],
  },
  {
    id: 5,
    title: "Gitogram",
    description:
      "Клиентское приложение для GitHub, упрощающее работу с репозиториями.",
    imageUrl: GitogramImage,
    projectUrl: "https://timcookxxx.github.io/Gitogram/dist",
    technologies: ["Vue", "Vuex"],
  },
  {
    id: 6,
    title: "Loft-Taxi",
    description: "Клиент приложения для заказа такси.",
    imageUrl: loftTaxiImage,
    projectUrl: "https://loft-taxis.netlify.app/",
    technologies: ["React", "Redux", "Material UI"],
  },
  {
    id: 7,
    title: "Surfboard",
    description: "Лендинг для интернет-магазина.",
    imageUrl: surfImage,
    projectUrl: "https://timcookxxx.github.io/surfboard/dist/",
    technologies: ["JavaScript", "HTML5", "CSS3"],
  },
  {
    id: 8,
    title: "Todo-List",
    description: "Todo-List для записи и контроля задач",
    imageUrl: TodoImage,
    projectUrl: "https://timcookxxx.github.io/Todo-List/",
    technologies: ["JavaScript", "HTML5", "CSS3"],
  },
];

const ProjectCard: React.FC<{ project: (typeof projects)[0] }> = React.memo(
  ({ project }) => (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.projectImage}>
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
      </div>
      <div className={styles.projectInfo}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <div className={styles.techStack}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.launchButton}
        >
          Launch Project
        </a>
      </div>
    </motion.div>
  )
);

const Portfolio: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length
    );
  }, []);

  const currentProject = useMemo(() => projects[currentIndex], [currentIndex]);

  return (
    <div className={styles.miamiViceContainer}>
      <div className={styles.grid}>
        <div className={styles.header}>
          <h1 className={styles.title}>Portfolio</h1>
        </div>
        <div className={styles.projectScreen}>
          <AnimatePresence mode="wait">
            <ProjectCard key={currentIndex} project={currentProject} />
          </AnimatePresence>
        </div>
        <div className={styles.controls}>
          <button
            onClick={prevProject}
            className={styles.navButton}
            aria-label="Previous project"
          >
            &#9664;
          </button>
          <button
            onClick={nextProject}
            className={styles.navButton}
            aria-label="Next project"
          >
            &#9654;
          </button>
        </div>
      </div>
      <div className={styles.geometricOverlay} aria-hidden="true"></div>
    </div>
  );
};

export default React.memo(Portfolio);
