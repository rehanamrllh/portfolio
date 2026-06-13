import project1Image from '@/assets/projects/project1.png';
import project2Image from '@/assets/projects/project2.png';
import project3Image from '@/assets/projects/project3.png';
import project4Image from '@/assets/projects/project4.png';

const szybotPlayerImage = new URL('../assets/projects/discordbot/player.png', import.meta.url).href;
const classicoFullpageImage = new URL('../assets/projects/classico/classico.png', import.meta.url).href;
const twiceCafeCustPageImage = new URL('../assets/projects/twicecafe/customerpage.png', import.meta.url).href;
const twiceCafeAdminPageImage = new URL('../assets/projects/twicecafe/adminpage.png', import.meta.url).href;

const placeholderProject = {
  title: "Coming Soon",
  subtitle: "Project placeholder",
  shortDescription: "Work in progress. Details coming soon.",
  problem: "TBA",
  solution: "TBA",
  outcome: "TBA",
  techStack: [],
  image: null,
  repoUrl: null,
  featured: false
};

const placeholderCount = 20;

const placeholders = Array.from({ length: placeholderCount }, (_, index) => ({
  id: `coming-soon-${index + 1}`,
  repoUrl: null
}));

const rawProjects = [
  {
    id: "classico",
    title: "Classico",
    subtitle: "Class Website (SMA Negeri 1 Srengat)",
    shortDescription: "Official website for 12 MIPA 2 — a simple multi-page site for sharing class information, schedules, photos, and updates.",
    problem: "The class needed a single place to publish information and memories (photos, schedules, and announcements) that’s easy to access and share.",
    solution: "Built a lightweight static website with multiple pages and structured sections, plus a simple forms flow for collecting submissions and keeping content organized.",
    outcome: "Shipped a clean, shareable class site hosted on GitHub Pages with a straightforward structure that’s easy to maintain.",
    techStack: ["HTML", "CSS", "JavaScript", "Website"],
    image: project1Image,
    modalImage: classicoFullpageImage,
    modalImageAlt: "Classico full-page screenshot",
    repoUrl: "https://github.com/rehanamrllh/classico.github.io",
    featured: true
  },
  {
    id: "szybot",
    title: "Szybot",
    subtitle: "Discord Music Bot",
    shortDescription: "A Discord music bot that plays songs from titles, URLs, or search queries with queue management and player controls.",
    problem: "Discord servers needed a simple music bot that could handle playback, queue control, and skip or repeat actions without a cluttered command set.",
    solution: "Built a Node.js bot with discord.js and discord-player, then added prefix and slash commands for play, queue, shuffle, skip, stop, and help workflows.",
    outcome: "Shipped an interactive music bot with queue viewing, now-playing embeds, and control buttons for a smoother listening experience in Discord.",
    techStack: ["JavaScript", "Node.js", "Bot"],
    image: project2Image,
    modalImage: szybotPlayerImage,
    modalImageAlt: "Szybot player controls screenshot",
    repoUrl: "https://github.com/rehanamrllh/szybot.git",
    featured: true
  },
  {
    id: "zhapbot",
    title: "ZhapBot",
    subtitle: "Telegram AI Chat Bot",
    shortDescription: "A Telegram bot built with aiogram that uses Gemini for AI conversations, stores chat history in SQLite, and converts files to PDF.",
    problem: "Telegram users needed one bot that could keep conversation context, manage chat history, and also handle simple PDF conversion workflows.",
    solution: "Built a Python bot with aiogram, Gemini-powered chat responses, SQLite-backed memory, and file handlers for JPG, PNG, TXT, and image album to PDF conversion.",
    outcome: "Delivered a multi-purpose Telegram bot with persistent conversation context, quick cleanup commands, and a compact command set for everyday use.",
    techStack: ["Python", "Gemini", "SQLite", "Telegram Bot API", "Gemini API", "Bot"],
    image: project3Image,
    repoUrl: "https://github.com/rehanamrllh/ZhapBot.git",
    featured: true
  },
  {
    id: "Self Service Sistem for Cafe",
    title: "Twice Cafe - Self Service Cafe Sistem",
    subtitle: "A sistem cafe website with qr code, menu, ordering, and admin panel.",
    shortDescription: "A cafe website with QR code menu, online ordering, and admin panel for managing orders and menu items.",
    problem: "The cafe needed a digital solution for customers to view the menu, place orders, and for staff to manage orders and menu items efficiently.",
    solution: "Built a full-stack web application with a QR code generator for the menu, an ordering system, and an admin panel for order and menu management.",
    outcome: "Shipped a functional cafe website that streamlines the ordering process for customers and simplifies management for staff.",
    techStack: ["HTML", "CSS", "JavaScript", "React", "Vite", "Firebase", "Website"],
    image: project4Image,
    modalImage: twiceCafeCustPageImage, 
    modalImageSecondary: twiceCafeAdminPageImage,
    modalImageAlt: "Twice Cafe customer page screenshot",
    repoUrl: 'https://github.com/rehanamrllh/Tugas-Akhir-RPL.git',
    featured: true
  },

  ...placeholders
];

export const projects = rawProjects.map((project) => {
  if (project.repoUrl && project.repoUrl !== '#') {
    return project;
  }

  return {
    ...project,
    ...placeholderProject,
    id: project.id
  };
});
