import project1Image from '@/assets/projects/project1.png';
import project2Image from '@/assets/projects/project2.png';

export const projects = [
  {
    id: "classico",
    title: "Classico",
    subtitle: "Class Website (SMA Negeri 1 Srengat)",
    shortDescription: "Official website for 12 MIPA 2 — a simple multi-page site for sharing class information, schedules, photos, and updates.",
    problem: "The class needed a single place to publish information and memories (photos, schedules, and announcements) that’s easy to access and share.",
    solution: "Built a lightweight static website with multiple pages and structured sections, plus a simple forms flow for collecting submissions and keeping content organized.",
    outcome: "Shipped a clean, shareable class site hosted on GitHub Pages with a straightforward structure that’s easy to maintain.",
    techStack: ["HTML", "CSS", "JavaScript", "PHP"],
    image: project1Image,
    liveUrl: "https://rehanamrllh.github.io/classico.github.io/",
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
    techStack: ["JavaScript", "Node.js", "discord.js", "discord-player", "FFmpeg"],
    image: project2Image,
    liveUrl: "https://github.com/rehanamrllh/szybot",
    repoUrl: "https://github.com/rehanamrllh/szybot.git",
    featured: true
  },
  {
    id: "ecotrack",
    title: "EcoTrack",
    subtitle: "Environmental Data Visualizer",
    shortDescription: "An interactive data visualization tool for monitoring environmental metrics with beautiful charts and predictive insights.",
    problem: "Environmental data from IoT sensors was being stored in raw CSV files with no accessible way to visualize trends or generate actionable insights.",
    solution: "Created an interactive dashboard that ingests sensor data, processes it through a Python analytics pipeline, and renders dynamic charts with drill-down capabilities and anomaly detection alerts.",
    outcome: "Successfully processed and visualized 50,000+ data points. The predictive model achieved 89% accuracy in forecasting air quality trends.",
    techStack: ["Python", "React", "D3.js", "PostgreSQL", "Docker"],
    image: null,
    liveUrl: "#",
    repoUrl: "#",
    featured: true
  },
  {
    id: "pixelcraft",
    title: "PixelCraft Studio",
    subtitle: "Design Collaboration Tool",
    shortDescription: "A browser-based design tool for creating and sharing UI mockups with real-time collaboration features.",
    problem: "Small teams and students often cannot afford premium design tools, yet need collaborative prototyping capabilities for their projects.",
    solution: "Built a lightweight, browser-based design canvas using HTML5 Canvas API with real-time cursor sharing via WebRTC, component libraries, and one-click export to PNG/SVG formats.",
    outcome: "Used by 3 student teams during a university hackathon. The tool handled concurrent editing sessions with less than 100ms latency.",
    techStack: ["JavaScript", "Canvas API", "WebRTC", "Express", "MySQL"],
    image: null,
    liveUrl: "#",
    repoUrl: "#",
    featured: false
  }
];
