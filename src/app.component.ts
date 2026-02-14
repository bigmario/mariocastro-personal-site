
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

type Lang = 'en' | 'es';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  // Navigation & UI State
  isMenuOpen = signal(false);
  isContactModalOpen = signal(false);
  isSubmitting = signal(false);
  language = signal<Lang>('en');
  currentYear = new Date().getFullYear();

  // Contact Form
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

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
              'Developed administrative modules and full-stack features using Angular and Node.js, ensuring robust integration with SQL databases.',
              'Designed and implemented intelligent workflow automations using n8n and AI logic to optimize internal processes.',
              'Led the analysis and resolution of critical incidents, ensuring high availability and stability of administrative systems.'
            ],
            tech: ['Angular', 'TypeScript', 'Node.js', 'MySQL', 'Git', 'n8n', 'AI']
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
              'Analysis, development, and implementation of Data Warehouse.',
              'Implementation of scheduled tasks with Python and Celery for ETL data processes from APIs and MongoDB.',
              'Simultaneous data processing using RabbitMQ as a Broker service.'
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
      contact: {
        title: 'Contact Me',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
        cancel: 'Cancel',
        success: 'Message sent successfully!',
        errors: {
          nameRequired: 'Name is required.',
          emailRequired: 'Email is required.',
          emailInvalid: 'Invalid email format.',
          messageRequired: 'Message is required.'
        },
        errorTitle: 'Error',
        errorMessage: 'There was a problem sending your message. Please try again later.',
        okButton: 'OK'
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
              'Desarrollé módulos administrativos y funcionalidades full-stack utilizando Angular y Node.js, asegurando una integración robusta con bases de datos SQL.',
              'Diseñé e implementé automatizaciones de flujos de trabajo inteligentes con n8n e IA para optimizar procesos internos.',
              'Análisis y resolución de incidencias críticas, garantizando la alta disponibilidad y estabilidad de los sistemas administrativos.'
            ],
            tech: ['Angular', 'TypeScript', 'Node.js', 'MySQL', 'Git', 'n8n', 'IA']
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
              'Análisis, desarrollo e implementación de Data Warehouse.',
              'Implementación de tareas programadas con Python y Celery para procesos de ETL de datos desde APIs y MongoDB.',
              'Procesamiento simultáneo de datos usando RabbitMQ como servicio de Broker.'
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
      contact: {
        title: 'Contáctame',
        name: 'Nombre',
        email: 'Correo Electrónico',
        message: 'Mensaje',
        send: 'Enviar Mensaje',
        cancel: 'Cancelar',
        success: '¡Mensaje enviado con éxito!',
        errors: {
          nameRequired: 'El nombre es obligatorio.',
          emailRequired: 'El correo electrónico es obligatorio.',
          emailInvalid: 'Formato de correo inválido.',
          messageRequired: 'El mensaje es obligatorio.'
        },
        errorTitle: 'Error',
        errorMessage: 'Hubo un problema al enviar tu mensaje. Por favor intenta más tarde.',
        okButton: 'Aceptar'
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

  openContactModal() {
    this.isContactModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeContactModal() {
    this.isContactModalOpen.set(false);
    document.body.style.overflow = '';
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      const formData = {
        nombre: this.contactForm.value.name,
        email: this.contactForm.value.email,
        mensaje: this.contactForm.value.message
      };

      this.http.post('https://n8n.mariocastro.dev/webhook/5a27094c-cbe3-4294-8b48-da5f9b2b51f7', formData)
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            Swal.fire({
              title: this.content().contact.success,
              icon: 'success',
              background: '#0f172a', // slate-900
              color: '#e2e8f0', // slate-200
              confirmButtonColor: '#0891b2', // cyan-600
              confirmButtonText: this.content().contact.okButton,
              customClass: {
                popup: 'border border-slate-700/50 rounded-xl shadow-2xl shadow-cyan-500/10'
              }
            });
            this.contactForm.reset();
            this.closeContactModal();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            console.error('Error sending message:', err);
            Swal.fire({
              title: this.content().contact.errorTitle,
              text: this.content().contact.errorMessage,
              icon: 'error',
              background: '#0f172a', // slate-900
              color: '#e2e8f0', // slate-200
              confirmButtonColor: '#ef4444', // red-500
              confirmButtonText: this.content().contact.okButton,
              customClass: {
                popup: 'border border-slate-700/50 rounded-xl shadow-2xl shadow-red-500/10'
              }
            });
          }
        });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
