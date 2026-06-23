import { inject, Injectable, signal } from '@angular/core';
import { MangaItem } from '../../models/magna';
import { MangaServices } from '../api/manga-services';
import { catchError } from 'rxjs';
import { ChapterItem } from '../../models/chapter';

@Injectable({
  providedIn: 'root',
})
export class MangaStore {

  manga = signal<MangaItem | null>(null);
  fileUrl = signal<string>('');
  author = signal<string>('');
  authorID = signal<string>('');
  chapters = signal<ChapterItem[]>([]);
  rating = signal<number>(0)

  mangaServices = inject(MangaServices);

  loadManga(id: string) {

    this.reset()

    this.mangaServices.getManga(id)
      .pipe(catchError((err) => {
        console.error('Error fetching manga:', err);
        return [];
      })).subscribe(
        {
          next: (data) => {
            this.manga.set(data.data)
            this.getCoverUrl()
            this.getAuthor()
            this.getRating(id)
            this.getChapters(id)
          }
        })

  }

  getCoverUrl() {

    const coverID = this.manga()?.relationships.find(rel => rel.type === 'cover_art')?.id;
    const proxyAddress = `https://proxy-lguy.onrender.com/image-proxy?quality=40&url=`
    if (coverID) {
      this.mangaServices.getCover(coverID).subscribe({
        next: (data) => {
          this.fileUrl.set(`${proxyAddress}https://uploads.mangadex.org/covers/${this.manga()?.id}/${data.data.attributes.fileName}` || '')
        }
      })
    }

  }

  getAuthor() {
    const authorID = this.manga()?.relationships.find(rel => rel.type === 'author')?.id;
    this.authorID.set(authorID || '')
    if (authorID) {
      this.mangaServices.getAuthor(authorID).subscribe({
        next: (data) => {
          this.author.set(data.data.attributes.name)
        }
      })
    }
  }

  getChapters(mangaID: string , lang = 'en') {
    this.mangaServices.getChapters(mangaID , 0 , 500 , lang ).subscribe({
      next: (data) => {
        this.chapters.set(data.data)
      }
    })
  }

  getRating(mangaID: string) {
    this.mangaServices.getStatics(mangaID).subscribe({
      next: (data) => {
        this.rating.set(data.statistics[mangaID].rating.average)
      }
    })
  }

  reset() {
    this.manga.set(null);
    this.fileUrl.set('');
    this.author.set('');
    this.authorID.set('');
    this.chapters.set([]);
    this.rating.set(0);
  }


}
