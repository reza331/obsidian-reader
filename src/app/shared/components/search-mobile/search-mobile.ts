import { Component, inject, signal } from '@angular/core';
import { SearchMobileUi } from '../../services/search-mobile-ui';
import { MangaServices } from '../../../core/api/manga-services';
import { Router } from '@angular/router';
import { MangaItem } from '../../../models/magna';
import { imgProxyAddress } from '../../../content/image-proxy';

@Component({
  selector: 'app-search-mobile',
  imports: [],
  templateUrl: './search-mobile.html',
  styleUrl: './search-mobile.css',
})
export class SearchMobile {

  searchMobileUi = inject(SearchMobileUi)
  mangaService = inject(MangaServices)
  router = inject(Router)
  totalResult = signal<number>(0)
  searchResult = signal<MangaItem[]>([])
  filterValue = signal('')

  findManga(searchValue: string) {
    this.mangaService.getMangas(0, 8, `title=${searchValue}&includes[]=cover_art`).subscribe({
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
    this.searchMobileUi.closeMobileSearch()
    this.router.navigate([
      '/manga',
      mangaID
    ])
  }

  viewAll() {
    this.searchMobileUi.closeMobileSearch()
    this.router.navigate([
      '/search',
      this.filterValue()
    ])
  }

  getCoverUrl(manga: MangaItem) {
    const fileName = manga.relationships.find(r => r.type === 'cover_art')?.attributes.fileName
    const imgUrl = `${imgProxyAddress}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
    return imgUrl
  }

}
