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


  currentCategory = 'Passenger Vehicles';

  categories = [
    {
      name: 'Passenger Vehicles',
      image: '/assets/images/Home/car.png',
      content: 'Our radiator product range for passenger vehicles is engineered to deliver efficient and consistent cooling performance under varying driving conditions. Designed with a precision-engineered aluminum core for superior heat dissipation and lightweight construction, each unit is combined with high-strength injection-molded plastic tanks that ensure secure sealing and resistance to pressure fluctuations. These radiators enhance engine efficiency, reduce thermal stress, and support long-term reliability in daily urban and highway usage across diverse climatic conditions.'
    },
    {
      name: 'Tractor',
      image: '/assets/images/Home/tractor.png',
      content: 'Our tractor radiator range is engineered for reliable cooling performance during prolonged agricultural operations under demanding field conditions. Each radiator features a high-efficiency aluminum core that promotes rapid heat dissipation, combined with rugged injection-molded plastic tanks for secure sealing and pressure stability. The design resists vibration, dust, and temperature fluctuations, ensuring consistent engine cooling, improved fuel efficiency, reduced thermal stress, and extended service life across diverse farming applications and long term operational reliability.'
    },
    {
      name: 'Cranes & Earthmovers',
      image: '/assets/images/Home/cranes.png',
      content: 'Radiators for cranes and earthmovers are engineered to operate under extreme loads, continuous duty cycles, and severe vibration. Precision aluminum cores provide superior heat transfer, while reinforced injection-molded plastic tanks ensure pressure resistance and sealing integrity. The robust construction supports heavy equipment operation, reduces maintenance requirements, and delivers reliable cooling performance and long service life in construction and infrastructure environments during off-highway operations.'
    },
    {
      name: 'Agriculture Series',
      image: '/assets/images/Home/tractor.png',
      content: 'Agriculture Series radiators are engineered to meet the cooling demands of agricultural machinery operating for extended hours in harsh field environments. High-efficiency aluminum cores ensure effective heat dissipation, while durable injection-molded plastic tanks provide secure sealing and pressure resistance. These radiators withstand dust, vibration, and temperature variations, ensuring consistent engine cooling, improved productivity, reduced downtime, and reliable performance across tractors, harvesters, and other agricultural equipment.'
    },
    {
      name: 'Industrial Gen-Sets',
      image: '/assets/images/Home/Gen-Sets.png',
      content: 'Radiators for industrial generator sets are engineered to deliver stable and efficient cooling during continuous and standby power operations. Precision aluminum cores provide high thermal efficiency, while pressure-resistant injection-molded plastic tanks manage sustained heat loads. The robust design minimizes thermal fatigue, supports uninterrupted operation, improves engine reliability, and ensures long service life in ambient temperature environments across demanding industrial applications and critical power backup systems.'
    },
    {
      name: 'Buses',
      image: '/assets/images/Home/bus.png',
      content: 'Bus radiators are designed to support high-capacity engines operating under extended duty cycles and frequent stop-and-go driving conditions. Utilizing high-efficiency aluminum cores for rapid heat exchange and durable injection-molded plastic tanks for pressure stability, these radiators ensure consistent cooling. The robust construction enhances engine performance, reduces overheating risks, lowers maintenance needs, and delivers reliable operation in urban transit and long-distance passenger transportation services under varying load cycles, climates, traffic conditions, daily operations nationwide.'
    },
    {
      name: 'Mining & Construction Equipments',
      image: '/assets/images/Home/mining.png',
      content: 'Radiators for mining and construction equipment are engineered to perform reliably in extreme environments involving heavy loads, abrasive dust, and elevated temperatures. Built with robust aluminum cores for efficient heat dissipation and reinforced injection-molded plastic tanks for durability, these radiators maintain stable cooling. The design minimizes engine stress, reduces downtime, improves operational efficiency, and ensures long-term reliability in demanding off-highway and mining applications across continuous heavy-duty operations, harsh terrain, remote sites, daily usage.'
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
