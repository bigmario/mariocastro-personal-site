
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type Lang = 'en' | 'es';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Navigation & UI State
  isMenuOpen = signal(false);
  language = signal<Lang>('en');
  currentYear = new Date().getFullYear();

  // Static Profile Data (Universal)
  profile = {
    name: 'Mario Castro',
    email: 'mariocastro.pva@gmail.com',
    phone: '+58 414-4418611 / +58 412-4679782',
    linkedin: 'linkedin.com/in/mariocastrove',
    github: 'github.com/bigmario',
  };

  // Content Data Store
  data = {
    en: {
      nav: {
        about: 'About',
        skills: 'Skills',
        experience: 'Experience',
        contact: 'Contact Me'
      },
      hero: {
        badge: 'Available for new opportunities',
        greeting: "Hi, I'm",
        title: 'FullStack Developer | AI & Automation Specialist',
        description: 'Transforming complex problems into scalable solutions. Expert in bridging the gap between robust backend architecture and intuitive frontend experiences.',
      },
      about: {
        title: 'About Me',
        contactInfo: 'Contact Info',
        summary: 'Full Stack Developer with an extensive track record in the software development life cycle. Specialist in creating scalable solutions and process automation using AI. Expert in robust architectures with TypeScript, Angular, and Node.js, with a practical focus on operational optimization and the implementation of intelligent workflows.',
        education: {
          title: 'Education',
          degree: 'B.S. in Computer Science',
          school: 'Universidad de Carabobo (1997-2007)'
        },
        languages: {
          title: 'Languages',
          items: [
            { name: 'Spanish', level: 'Native' },
            { name: 'English', level: 'Professional' }
          ]
        }
      },
      skills: {
        title: 'Technical Arsenal',
        subtitle: 'A comprehensive stack designed to build scalable, high-performance applications from database to user interface.',
        groups: [
          {
            category: 'AI & Automation',
            items: ['Prompt Engineering', 'n8n (Self-hosted)', 'Workflow Automation', 'AI Logic Integration'],
            icon: 'bot'
          },
          {
            category: 'Frontend',
            items: ['Angular (v11+)', 'TypeScript', 'HTML5', 'CSS3/Tailwind', 'JavaScript'],
            icon: 'code'
          },
          {
            category: 'Backend',
            items: ['Node.js', 'NestJS', 'Express.js', 'Laravel (PHP)', 'FastAPI (Python)', 'Prisma ORM'],
            icon: 'server'
          },
          {
            category: 'Data & Tools',
            items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Git', 'RabbitMQ', 'Celery', 'SQLite'],
            icon: 'database'
          }
        ]
      },
      experience: {
        title: 'Professional Journey',
        jobs: [
          {
            company: 'Proper Business Solutions',
            role: 'Full Stack Developer',
            period: 'Feb 2024 – Present',
            description: [
              'Developed an AI-First Calibration System for fuel truck management using SQL validation and sensor data analysis.',
              'Implemented automated workflows with self-hosted n8n to optimize internal processes.',
              'Built administrative modules using Angular (Frontend) and Node.js (Backend).',
              'Managed SQL databases ensuring data integrity for critical systems.'
            ],
            tech: ['Angular', 'Node.js', 'n8n', 'AI', 'SQL']
          },
          {
            company: 'POS Global C.A.',
            role: 'Web Development Coordinator / Backend Developer',
            period: 'Jan 2022 – Feb 2024',
            description: [
              'Led technical teams to deliver effective and scalable web solutions.',
              'Designed RESTful APIs with Node.js, NestJS, and Prisma ORM, reducing development time by 20%.',
              'Implemented Laravel backend components resulting in a 15% increase in customer satisfaction.',
              'Developed the backend for SUNMI Corporation Venezuela\'s intranet using NestJS and PostgreSQL.'
            ],
            tech: ['NestJS', 'Prisma', 'Laravel', 'PostgreSQL', 'Leadership']
          },
          {
            company: 'Jacidi',
            role: 'Semi-Senior Developer',
            period: 'Jul 2021 – Jan 2022',
            description: [
              'Developed Data Warehouse and ETL process automation using Python and Celery.',
              'Integrated messaging services with RabbitMQ for synchronous/asynchronous data processing.'
            ],
            tech: ['Python', 'Celery', 'RabbitMQ', 'MongoDB', 'ETL']
          },
          {
            company: 'Fundación Musical Simón Bolívar',
            role: 'Programmer Analyst / Coordinator',
            period: 'Nov 2006 – Jan 2022',
            description: [
              'Developed and maintained the Teacher and Student Management System using Python, wxPython, and SQLite.',
              'Managed web platforms and solutions based on PHP and MySQL.'
            ],
            tech: ['Python', 'PHP', 'MySQL', 'Legacy Systems']
          }
        ]
      },
      footer: {
        rights: 'Mario Castro. All rights reserved. Built with Angular & Tailwind.'
      }
    },
    es: {
      nav: {
        about: 'Sobre Mí',
        skills: 'Habilidades',
        experience: 'Experiencia',
        contact: 'Contáctame'
      },
      hero: {
        badge: 'Disponible para nuevas oportunidades',
        greeting: "Hola, soy",
        title: 'Desarrollador FullStack | Especialista en IA y Automatización',
        description: 'Transformando problemas complejos en soluciones escalables. Experto en unir arquitectura backend robusta con experiencias frontend intuitivas.',
      },
      about: {
        title: 'Sobre Mí',
        contactInfo: 'Información de Contacto',
        summary: 'Desarrollador Full Stack con amplia trayectoria en el ciclo de vida del desarrollo de software. Especialista en la creación de soluciones escalables y automatización de procesos mediante IA. Experto en arquitecturas robustas con TypeScript, Angular y Node.js, con un enfoque práctico en la optimización operativa y la implementación de flujos de trabajo inteligentes.',
        education: {
          title: 'Educación',
          degree: 'Licenciado en Computación',
          school: 'Universidad de Carabobo (1997-2007)'
        },
        languages: {
          title: 'Idiomas',
          items: [
            { name: 'Español', level: 'Nativo' },
            { name: 'Inglés', level: 'Profesional' }
          ]
        }
      },
      skills: {
        title: 'Arsenal Técnico',
        subtitle: 'Un stack completo diseñado para construir aplicaciones escalables y de alto rendimiento, desde la base de datos hasta la interfaz de usuario.',
        groups: [
          {
            category: 'IA y Automatización',
            items: ['Prompt Engineering', 'n8n (Self-hosted)', 'Automatización de Flujos', 'Integración Lógica IA'],
            icon: 'bot'
          },
          {
            category: 'Frontend',
            items: ['Angular (v11+)', 'TypeScript', 'HTML5', 'CSS3/Tailwind', 'JavaScript'],
            icon: 'code'
          },
          {
            category: 'Backend',
            items: ['Node.js', 'NestJS', 'Express.js', 'Laravel (PHP)', 'FastAPI (Python)', 'Prisma ORM'],
            icon: 'server'
          },
          {
            category: 'Datos y Herramientas',
            items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Docker', 'Git', 'RabbitMQ', 'Celery', 'SQLite'],
            icon: 'database'
          }
        ]
      },
      experience: {
        title: 'Trayectoria Profesional',
        jobs: [
          {
            company: 'Proper Business Solutions',
            role: 'Desarrollador Full Stack',
            period: 'Feb 2024 – Presente',
            description: [
              'Desarrollé un Sistema de Calibración "AI-First" para gestión de camiones de combustible usando validación SQL y análisis de sensores.',
              'Implementé flujos automatizados con n8n autoalojado para optimizar procesos internos.',
              'Construí módulos administrativos usando Angular (Frontend) y Node.js (Backend).',
              'Administré bases de datos SQL asegurando integridad de datos para sistemas críticos.'
            ],
            tech: ['Angular', 'Node.js', 'n8n', 'AI', 'SQL']
          },
          {
            company: 'POS Global C.A.',
            role: 'Coordinador de Desarrollo Web / Desarrollador Backend',
            period: 'Ene 2022 – Feb 2024',
            description: [
              'Lideré equipos técnicos para entregar soluciones web efectivas y escalables.',
              'Diseñé APIs RESTful con Node.js, NestJS y Prisma ORM, reduciendo tiempo de desarrollo en 20%.',
              'Implementé componentes backend en Laravel aumentando satisfacción del cliente en 15%.',
              'Desarrollé el backend para intranet de SUNMI Corporation Venezuela usando NestJS y PostgreSQL.'
            ],
            tech: ['NestJS', 'Prisma', 'Laravel', 'PostgreSQL', 'Liderazgo']
          },
          {
            company: 'Jacidi',
            role: 'Desarrollador Semi-Senior',
            period: 'Jul 2021 – Ene 2022',
            description: [
              'Desarrollé Data Warehouse y automatización ETL usando Python y Celery.',
              'Integré servicios de mensajería con RabbitMQ para procesamiento de datos síncrono/asíncrono.'
            ],
            tech: ['Python', 'Celery', 'RabbitMQ', 'MongoDB', 'ETL']
          },
          {
            company: 'Fundación Musical Simón Bolívar',
            role: 'Analista Programador / Coordinador',
            period: 'Nov 2006 – Ene 2022',
            description: [
              'Desarrollé y mantuve el Sistema de Gestión de Profesores y Estudiantes usando Python, wxPython y SQLite.',
              'Gestioné plataformas web y soluciones basadas en PHP y MySQL.'
            ],
            tech: ['Python', 'PHP', 'MySQL', 'Sistemas Legacy']
          }
        ]
      },
      footer: {
        rights: 'Mario Castro. Todos los derechos reservados. Construido con Angular y Tailwind.'
      }
    }
  };

  // Dynamic Content Signal
  content = computed(() => this.data[this.language()]);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  toggleLanguage() {
    this.language.update(lang => lang === 'en' ? 'es' : 'en');
  }

  scrollTo(sectionId: string) {
    this.isMenuOpen.set(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
