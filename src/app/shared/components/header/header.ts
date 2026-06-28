import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { HamburgerButton } from '../hamburger-button/hamburger-button';
import { filter } from 'rxjs';

interface NavLinks {
  label: string
  url: string
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, HamburgerButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  isOpen = signal(false)
  isScrolled = signal(false)
  router = inject(Router)

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isOpen.set(false)
      })
  }

  openMenu() {
    this.isOpen.set(true)
  }

  closeMenu() {
    this.isOpen.set(false)
  }

  navLinks = signal<NavLinks[]>([
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'About', url: '/about' },
    { label: 'Settings', url: '/settings' },
  ])

}
