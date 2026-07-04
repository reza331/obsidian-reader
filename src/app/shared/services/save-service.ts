import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaveService {

  isSaved = signal(false)

  saveManga(mangaID: string) {

    if (typeof window === 'undefined') return

    this.checkSaved(mangaID)

    const savedList = JSON.parse(localStorage.getItem('saveList') as string) as string[] || []

    if (!this.isSaved()) {
      savedList.push(mangaID)
      localStorage.setItem('saveList', JSON.stringify(savedList))
      this.isSaved.set(true)
      return
    }

    const newList = savedList.filter(id => id !== mangaID)
    localStorage.setItem('saveList', JSON.stringify(newList))
    this.isSaved.set(false)

    return

  }

  checkSaved(mangaID: string) {

    if (typeof window === 'undefined') return

    const savedList = JSON.parse(localStorage.getItem('saveList') as string) as string[]
    const targetID = savedList.find(id => id === mangaID)

    if (targetID) {
      this.isSaved.set(true)
    } else {
      this.isSaved.set(false)
    }

  }


}
