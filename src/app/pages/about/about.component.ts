import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  // Sélectionne tous les éléments ayant les classes d'animation
  @ViewChildren('animatedElement', { read: ElementRef }) animatedElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            if (element.classList.contains('reveal-on-scroll')) {
              element.classList.add('visible');
            } else if (element.classList.contains('reveal-left')) {
              element.classList.add('active');
            } else if (element.classList.contains('reveal-zoom')) {
              element.classList.add('active');
            } else if (element.classList.contains('reveal-section')) {
              element.classList.add('visible');
            }

            obs.unobserve(entry.target); // une seule fois
          }
        });
      },
      { threshold: 0.1 }
    );

    this.animatedElements.forEach(el => observer.observe(el.nativeElement));
  }
}
