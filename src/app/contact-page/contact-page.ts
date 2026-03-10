import { Component } from '@angular/core';
import { News } from "../news/news";
import { Footer } from '../footer/footer';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact, ContactFormPayload } from '../../services/contact';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";


@Component({
  selector: 'app-contact-page',
  imports: [News, Footer, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-page.html',
  styleUrls: ['./contact-page.scss']
})
export class ContactPage {

  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactFormService: Contact,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z]+$/)
        ]
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[A-Za-z]+$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],
      website: [''],

      company_name: ['']
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onsubmitForm(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: ContactFormPayload = this.contactForm.value;

    this.contactFormService.submitForm(payload).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;

        // Normalize response: sometimes backend returns a string
        let parsed: any = res;
        if (typeof res === 'string') {
          try {
            parsed = JSON.parse(res);
          } catch (err) {
            parsed = { status: 'unknown', raw: res };
          }
        }

        // Accept either { status: 'success' } or { success: true }
        const ok = parsed && (parsed.status === 'success' || parsed.success === true);

        if (ok) {
          this.successMessage = 'Your enquiry has been submitted!';
          // clear form after success
          this.contactForm.reset();
          // optionally mark pristine/touched states
          this.contactForm.markAsPristine();
          this.contactForm.markAsUntouched();
        } else {
          // if backend returned an error message, show it; otherwise generic
          this.errorMessage = 'There was an error saving your enquiry.';
        }

        // auto-clear messages
        if (this.successMessage) {
          setTimeout(() => this.successMessage = '', 3000);
        }
        if (this.errorMessage) {
          setTimeout(() => this.errorMessage = '', 3000);
        }
      },
      error: (err) => {
        console.error('Error submitting form', err);
        this.isSubmitting = false;
        this.errorMessage = 'Something went wrong. Please try again.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  scrollToJobs(): void {
    this.router.navigate(['/career'], { fragment: 'job-scroll-target' });
  }

}
