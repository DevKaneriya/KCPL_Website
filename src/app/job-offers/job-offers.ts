import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Career, Job } from '../../services/career';
import { environment } from '../../environments/environment';
import { Globalservice } from '../../services/globalservice';

@Component({
  selector: 'app-job-offers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-offers.html',
  styleUrl: './job-offers.scss'
})
export class JobOffers implements OnInit, AfterViewInit {

  phpMailerURL = 'http://localhost/Phpmailer/career-mailer.php';
  sheetURL = environment.apiUrl + '?route=apply';

  uploadedFile: File | null = null;
  uploadedFileName: string | null = null;

  isSubmitting = signal(false);
  successMessage: string | null = null;
  errorMessage: string | null = null;

  private careerService = inject(Career);
  private fb = inject(FormBuilder);

  jobs = signal<Job[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  careerForm!: FormGroup;
  selectedJob = signal<Job | null>(null);

  letters: { word: string; isBlue: boolean }[] = [];
  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;
  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;

  private readonly allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp'
  ];

  private readonly maxFileSize = 3 * 1024 * 1024;

  constructor(private cdr: ChangeDetectorRef,
    public appData: Globalservice
  ) {

    effect(() => {

      const globalJobs =
        this.appData.jobs();

      /* wait until global jobs exist */
      if (!globalJobs.length)
        return;

      this.jobs.set(globalJobs);

      this.loading.set(false);

      this.error.set(null);

    });

  }

  // private loadJobs(): void {
  //   this.loading.set(true);
  //   this.error.set(null);

  //   this.careerService.getActiveJobs().subscribe({
  //     next: (jobs) => {
  //       this.jobs.set(jobs);
  //       this.loading.set(false);
  //     },
  //     error: () => {
  //       this.error.set('Failed to load jobs.');
  //       this.loading.set(false);
  //     },
  //   });
  // }

  onApply(job: Job): void {
    this.selectedJob.set(job);
  }

  onFileSelected(event: any): void {

    const file = event.target.files?.[0];
    const resumeControl = this.careerForm.get('resume');

    if (!file) {
      resumeControl?.setErrors({ required: true });
      return;
    }

    if (!this.allowedMimeTypes.includes(file.type)) {
      resumeControl?.setValue(null);
      resumeControl?.setErrors({ invalidType: true });
      resumeControl?.markAsTouched();

      this.uploadedFile = null;
      this.uploadedFileName = null;
      return;
    }

    if (file.size > this.maxFileSize) {
      resumeControl?.setValue(null);
      resumeControl?.setErrors({ maxSize: true });
      resumeControl?.markAsTouched();

      this.uploadedFile = null;
      this.uploadedFileName = null;
      return;
    }


    this.uploadedFile = file;
    this.uploadedFileName = file.name;

    resumeControl?.setValue(file);
    resumeControl?.setErrors(null);
    resumeControl?.markAsTouched();
  }

  removeFile(): void {
    this.uploadedFile = null;
    this.uploadedFileName = null;

    const resumeControl = this.careerForm.get('resume');

    resumeControl?.setValue(null);
    resumeControl?.setErrors({ required: true }); // force required
    resumeControl?.markAsTouched(); // show error
  }



  onsubmitForm(): void {

    const job = this.selectedJob();

    if (!job) {
      this.careerForm.markAllAsTouched();
      this.showError('Please select a job before applying.');
      return;
    }

    if (this.careerForm.invalid) {
      this.careerForm.markAllAsTouched();
      this.showError('Please fill all required fields correctly.');
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage = null;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('first_name', this.careerForm.value.first_name);
    formData.append('last_name', this.careerForm.value.last_name);
    formData.append('email', this.careerForm.value.email);
    formData.append('phone', this.careerForm.value.phone);
    formData.append('jobId', job.id.toString());
    formData.append('jobTitle', job.title);

    if (this.uploadedFile) {
      formData.append('resume', this.uploadedFile);
    }

    fetch(this.phpMailerURL, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(res => {

        if (res.status === 'success') {


          fetch(this.sheetURL, {
            method: 'POST',
            body: JSON.stringify({
              first_name: this.careerForm.value.first_name,
              last_name: this.careerForm.value.last_name,
              email: this.careerForm.value.email,
              phone: this.careerForm.value.phone,
              jobId: job.id,
              jobTitle: job.title
            })
          }).catch(err => console.error('Sheet log error:', err));

          this.showSuccess('Application sent successfully!');
          this.careerForm.reset();
          this.removeFile();

          (document.querySelector('.btn-close') as HTMLElement)?.click();

        } else {
          this.showError(res.message || 'Email failed to send.');
        }
      })
      .catch(() => {
        this.showError('Server error while sending your application.');
      })
      .finally(() => {
        this.isSubmitting.set(false);
      });
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;

    setTimeout(() => {
      this.successMessage = null;
    }, 5000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = null;

    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }


  ngOnInit(): void {

    this.careerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]],
      resume: [null, Validators.required],
    });


    const blueText = 'Latest Job Offers';

    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blueText, true)];
  }

  ngAfterViewInit(): void {

    const modalEl = document.getElementById('exampleModal');

    modalEl?.addEventListener('hidden.bs.modal', () => {
      this.careerForm.reset();
      this.careerForm.markAsPristine();
      this.careerForm.markAsUntouched();

      this.uploadedFile = null;
      this.uploadedFileName = null;
    });


    gsap.registerPlugin(ScrollTrigger);

    const totalLetters = this.letters.length;

    setTimeout(() => {
      ScrollTrigger.defaults({ scroller: document.documentElement });

      gsap.fromTo(
        this,
        { revealedCount: 0 },
        {
          revealedCount: totalLetters,
          ease: 'none',
          scrollTrigger: {
            trigger: this.revealH1.nativeElement,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
            invalidateOnRefresh: true
          },
          onUpdate: () => {
            this.revealedCount = Math.floor(
              gsap.getProperty(this, 'revealedCount') as number
            );
            this.cdr.detectChanges();
          }
        }
      );
    }, 0);
  }
}
