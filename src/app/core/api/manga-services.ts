import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MangaResponse, MangasResponse } from '../../models/magna';
import { CoverArtResponse } from '../../models/cover';
import { ChapterResponse, ChaptersResponse } from '../../models/chapter';
import { Author } from '../../models/author';
import { MangaStatistics } from '../../models/statics';
import { ChapterImagesResponse } from '../../models/chapter-images';
import { ScanlationGroupResponse } from '../../models/scan-group';

@Injectable({
  providedIn: 'root',
})
export class MangaServices {

  private http = inject(HttpClient)

  url = 'https://proxy331.netlify.app/mangadex'

  getMangas(offset: number = 0, limit: number = 20, otherQueries: string = '') {
    return this.http.get<MangasResponse>(`${this.url}/manga?offset=${offset}&limit=${limit}&${otherQueries}`)
  }

  getCover(id: string) {
    return this.http.get<CoverArtResponse>(`${this.url}/cover/${id}`)
  }

  getManga(id: string) {
    return this.http.get<MangaResponse>(`${this.url}/manga/${id}`)
  }

  getChapters(mangaID: string, offset: number = 0, limit: number = 500, lang: string = 'en') {
    return this.http.get<ChaptersResponse>(`${this.url}/manga/${mangaID}/feed?offset=${offset}&limit=${limit}&translatedLanguage[]=${lang}&order[chapter]=asc`)
  }

  getChapter(chapterID: string) {
    return this.http.get<ChapterResponse>(`${this.url}/chapter/${chapterID}`)
  }

  getChapterImages(chapterID: string) {
    return this.http.get<ChapterImagesResponse>(`${this.url}/at-home/server/${chapterID}`)
  }

  getAuthor(id: string) {
    return this.http.get<Author>(`${this.url}/author/${id}`)
  }

  getStatics(id: string) {
    return this.http.get<MangaStatistics>(`${this.url}/statistics/manga/${id}`)
  }

  getScanGroup(id: string) {
    return this.http.get<ScanlationGroupResponse>(`${this.url}/group/${id}`)
  }

}
