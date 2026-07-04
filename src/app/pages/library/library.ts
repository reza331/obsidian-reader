import { Component, OnInit, signal } from '@angular/core';
import { SavedCard } from '../../shared/components/saved-card/saved-card';


@Component({
  selector: 'app-library',
  imports: [SavedCard],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library implements OnInit {

  savedList = signal<string[]>([])
  slicedList = signal<string[]>([])
  currentPage = signal(1)
  jumpPageValue = signal(1)
  totalPage = signal(1)

  getSlicedList(list: string[]) {
    const itemPerPage = 5
    this.totalPage.set(Math.ceil(list.length / itemPerPage))
    const firstIndext = (this.currentPage() - 1) * itemPerPage
    const lastIndex = firstIndext + itemPerPage
    const sliced = list.slice(firstIndext, lastIndex)
    this.slicedList.set(sliced)
  }

  nextPage() {
    if (this.currentPage() === this.totalPage()) return
    this.currentPage.update(prev => prev + 1)
    this.getSlicedList(this.savedList())
  }

  prevPage() {
    if (this.currentPage() === 1) return
    this.currentPage.update(prev => prev - 1)
    this.getSlicedList(this.savedList())
  }

  jumpPage(page: number) {
    if (isNaN(page)) return
    if (page > this.totalPage() || page < 1) return
    this.currentPage.set(page)
    this.getSlicedList(this.savedList())
  }

  keyUp(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement
    const value = target.value
    this.jumpPageValue.set(+value)
    if (e.key === 'Enter') {
      this.jumpPage(this.jumpPageValue())
    }
  }

  ngOnInit(): void {
    if (typeof window === 'undefined') return
    const savedStorage: string[] = JSON.parse(localStorage.getItem('saveList') as string) || []
    this.savedList.set(savedStorage.reverse())
    this.getSlicedList(this.savedList())
  }


}
