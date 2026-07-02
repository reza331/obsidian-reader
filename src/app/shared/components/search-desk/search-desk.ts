import { Component, inject, signal } from '@angular/core';
import { MangaServices } from '../../../core/api/manga-services';
import { MangaItem } from '../../../models/magna';
import { Router } from "@angular/router";
import { ClickoutsideDirective } from '../../directives/clickoutside-directive';
import { imgProxyAddress } from '../../../content/image-proxy';

@Component({
  selector: 'app-search-desk',
  imports: [ClickoutsideDirective],
  templateUrl: './search-desk.html',
  styleUrl: './search-desk.css',
})
export class SearchDesk {

  mangaService = inject(MangaServices)
  router = inject(Router)
  totalResult = signal<number>(0)
  searchResult = signal<MangaItem[]>([])
  filterValue = signal('')

  findManga(searchValue: string) {
    this.mangaService.getMangas(0, 5, `title=${searchValue}&includes[]=cover_art`).subscribe({
      next: (data) => {
        this.searchResult.set(data.data)
        this.totalResult.set(data.total)
      }
    })
  }

  searchHandler(e: Event) {
    const input = e.target as HTMLInputElement
    const value = input.value
    this.filterValue.set(value)
    if (value && value.length > 2) {
      this.findManga(value)
    } else {
      this.searchResult.set([])
      return
    }
  }

  focusHandler(e: Event) {
    const input = e.target as HTMLInputElement
    const value = input.value
    this.filterValue.set(value)
  }

  getTitle(manga: MangaItem) {

    const altTitles = manga.attributes.altTitles
    const titles = manga?.attributes.title

    if (!altTitles || !titles) return 'No Title'

    const engTitle = altTitles.find(t => t['en'])

    if (engTitle) return engTitle['en']

    if (titles['en']) return titles['en']
    const firstKey = Object.values(titles)[0]
    return firstKey
  }

  clickItem(mangaID: string) {
    this.closeSearch()
    this.router.navigate([
      '/manga',
      mangaID
    ])
  }

  viewAll() {
    this.router.navigate([
      'search',
      this.filterValue()
    ])
    this.closeSearch()
  }

  getCoverUrl(manga: MangaItem) {
    const fileName = manga.relationships.find(r => r.type === 'cover_art')?.attributes.fileName
    const imgUrl = `${imgProxyAddress}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
    return imgUrl
  }

  closeSearch() {
    this.filterValue.set('')
  }

}
