import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './application.html',
  styleUrls: ['./application.scss']
})
export class Application {


  currentCategory = 'Passenger Cars';

  categories = [
    {
      name: 'Passenger Cars',
      image: '/assets/images/Home/car.png',
      content: 'High-performance radiators and condensers designed to keep passenger vehicles running cool in every condition.'
    },
    {
      name: 'Mining and Construction',
      image: '/assets/images/Home/mining.png',
      content: 'Rugged thermal solutions designed for mining and construction equipment operating in the harshest conditions.'
    },
    {
      name: 'Equipments',
      image: '/assets/images/Home/equipment.png',
      content: 'Radiators help regulate temperature in heavy equipment by efficiently dissipating excess heat generated during operation.'
    },
    {
      name: 'Tractor and Agriculture Series',
      image: '/assets/images/Home/tractor.png',
      content: 'Durable cooling solutions engineered to keep tractors and agricultural equipment performing efficiently in tough field conditions.'
    },
    {
      name: 'Industrial Gensets',
      image: '/assets/images/Home/Gen-Sets.png',
      content: 'Heavy-duty radiators and condensers designed for dependable performance in power generation applications.'
    },
    {
      name: 'Cranes and Earthmovers',
      image: '/assets/images/Home/cranes.png',
      content: 'Durable radiators and condensers developed for powerful machines that demand consistent temperature control.'
    },
    {
      name: 'Buses and Trucks',
      image: '/assets/images/Home/bus.png',
      content: 'High-capacity radiators and condensers designed to deliver durability, efficiency, and reliability for buses and trucks.'
    }
  ];

  setCategory(name: string) {
    this.currentCategory = name;
  }

  get currentData() {
    return this.categories.find(c => c.name === this.currentCategory)!;
  }


  letters: { word: string; isBlue: boolean }[] = [];

  revealedCount = 0;

  @ViewChild('revealH1', { static: true }) revealH1!: ElementRef<HTMLHeadingElement>;



  @ViewChild('animateTarget', { static: true }) animateTarget!: ElementRef;


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const blackText = 'Application';
    const blueText = '';

    const mapWords = (text: string, isBlue: boolean) =>
      text.split(' ').map((word) => ({
        word,
        isBlue
      }));

    this.letters = [...mapWords(blackText, false), ...mapWords(blueText, true)];
  }

  ngAfterViewInit(): void {

    //Text reveal animation

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
            this.revealedCount = Math.floor(gsap.getProperty(this, 'revealedCount') as number);
            this.cdr.detectChanges();
          }
        }
      );
    }, 0);

  }

}
