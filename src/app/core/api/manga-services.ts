import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MangaResponse, MangasResponse } from '../../models/magna';
import { CoverArtResponse } from '../../models/cover';
import { ChaptersResponse } from '../../models/chapter';
import { Author } from '../../models/author';
import { MangaStatistics } from '../../models/statics';

@Injectable({
  providedIn: 'root',
})
export class MangaServices {

  private http = inject(HttpClient)

  url = 'https://proxy-lguy.onrender.com/mangadex'

  getMangas(offset: number = 0, limit: number = 20 , otherQueries: string = '') {
    return this.http.get<MangasResponse>(`${this.url}/manga?offset=${offset}&limit=${limit}&${otherQueries}`)
  }

  getCover(id: string) {
    return this.http.get<CoverArtResponse>(`${this.url}/cover/${id}`)
  }

  getManga(id: string) {
    return this.http.get<MangaResponse>(`${this.url}/manga/${id}`)
  }

  getChapters(mangaID: string, offset: number = 0, limit: number = 500 , lang: string = 'en') {
    return this.http.get<ChaptersResponse>(`${this.url}/manga/${mangaID}/feed?offset=${offset}&limit=${limit}&translatedLanguage[]=${lang}&order[chapter]=asc`)
  }

  getAuthor(id: string) {
    return this.http.get<Author>(`${this.url}/author/${id}`)
  }

  getStatics(id:string) {
    return this.http.get<MangaStatistics>(`${this.url}/statistics/manga/${id}`)
  }

}
