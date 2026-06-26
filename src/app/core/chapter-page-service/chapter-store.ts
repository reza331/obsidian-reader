import { inject, Injectable, signal } from '@angular/core';
import { MangaServices } from '../api/manga-services';

@Injectable({
  providedIn: 'root',
})
export class ChapterStore {

  apiService = inject(MangaServices)

  proxyAddress = signal('https://proxy331.netlify.app/image-proxy?url=')
  hash = signal('')
  images = signal<string[]>([])
  baseUrl = signal('')
  scangroup = signal('')

  getChapterImages(chapterID: string) {
    this.apiService.getChapterImages(chapterID).subscribe(
      {
        next: (data) => {
          this.hash.set(data.chapter.hash)
          this.baseUrl.set(data.baseUrl)
          this.images.set(data.chapter.dataSaver)
        }
      }
    )
  }

  getScanGroup(chapterID: string) {
    this.apiService.getChapter(chapterID).subscribe({
      next: (data) => {
        const scanlationID = data.data.relationships.find(r => r.type === 'scanlation_group')?.id ?? ''
        this.apiService.getScanGroup(scanlationID).subscribe({
          next: (data) => {
            this.scangroup.set(data.data.attributes.name)
          }
        })
      }
    })
  }



}
