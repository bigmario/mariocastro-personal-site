import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss']
})
export class ContactModalComponent {
  portfolioService = inject(PortfolioService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isSubmitting = signal(false);

  // Contact Form
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    fax: [''] // Honeypot field
  });

  onSubmit() {
    // 1. Honeypot check
    if (this.contactForm.get('fax')?.value) {
      console.warn('Bot detected via honeypot');
      return; // Silently fail
    }

    // 2. Rate Limiting Check (2 minutes cooldown)
    const lastSubmission = localStorage.getItem('lastContactSubmission');
    if (lastSubmission) {
      const timeSinceLast = Date.now() - parseInt(lastSubmission, 10);
      const cooldownMs = 2 * 60 * 1000; // 2 minutes

      if (timeSinceLast < cooldownMs) {
        Swal.fire({
          title: this.portfolioService.content().contact.errorTitle,
          text: this.portfolioService.language() === 'es' 
            ? 'Por favor espera unos minutos antes de enviar otro mensaje.' 
            : 'Please wait a few minutes before sending another message.',
          icon: 'warning',
          background: '#0f172a',
          color: '#e2e8f0',
          confirmButtonColor: '#0891b2',
          confirmButtonText: this.portfolioService.content().contact.okButton,
          customClass: {
            popup: 'border border-slate-700/50 rounded-xl shadow-2xl shadow-cyan-500/10'
          }
        });
        return;
      }
    }

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
            // Save submission time
            localStorage.setItem('lastContactSubmission', Date.now().toString());
            
            Swal.fire({
              title: this.portfolioService.content().contact.success,
              icon: 'success',
              background: '#0f172a', // slate-900
              color: '#e2e8f0', // slate-200
              confirmButtonColor: '#0891b2', // cyan-600
              confirmButtonText: this.portfolioService.content().contact.okButton,
              customClass: {
                popup: 'border border-slate-700/50 rounded-xl shadow-2xl shadow-cyan-500/10'
              }
            });
            this.contactForm.reset();
            this.portfolioService.closeContactModal();
          },
          error: (err) => {
            this.isSubmitting.set(false);
            console.error('Error sending message:', err);
            Swal.fire({
              title: this.portfolioService.content().contact.errorTitle,
              text: this.portfolioService.content().contact.errorMessage,
              icon: 'error',
              background: '#0f172a', // slate-900
              color: '#e2e8f0', // slate-200
              confirmButtonColor: '#ef4444', // red-500
              confirmButtonText: this.portfolioService.content().contact.okButton,
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
