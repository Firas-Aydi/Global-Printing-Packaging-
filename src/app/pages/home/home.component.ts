import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const elements = document.querySelectorAll('.reveal');
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'in-view');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
    elements.forEach(el => this.observer.observe(el));
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
