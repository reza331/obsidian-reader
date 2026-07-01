import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchMobileUi {
  
  isSearchOpen = signal(false)

  openMobileSearch() {
    this.isSearchOpen.set(true)
  }

  closeMobileSearch() {
    this.isSearchOpen.set(false)
  }

}
