import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { MangaItem } from '../../../models/magna';
import { MangaServices } from '../../../core/api/manga-services';
import { catchError } from 'rxjs';
import { SlideSectionsConfig } from '../../../pages/home/home';
import { MangaCard } from '../manga-slide-card/manga-card';
import { LoadingBox } from "../loading-box/loading-box";
import { FetchErrorBox } from "../fetch-error-box/fetch-error-box";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manga-slide',
  imports: [LoadingBox, MangaCard, FetchErrorBox, RouterLink],
  templateUrl: './manga-slide.html',
  styleUrl: './manga-slide.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MangaSlide implements OnInit {

  mangas = signal<MangaItem[]>([])

  mangaservices = inject(MangaServices)
  options = input.required<SlideSectionsConfig>()

  isLoading = signal(false)
  isError = signal(false)

  getMangas() {

    this.isLoading.set(true)

    this.mangaservices.getMangas(0, 20, `${this.options().queryOption}&includes[]=cover_art`)
      .pipe(
        catchError((err) => {
          console.log(err)
          this.isError.set(true)
          this.isLoading.set(false)
          return []
        })
      )
      .subscribe({
        next: (data) => {
          this.mangas.set(data.data)
          this.isLoading.set(false)
          this.isError.set(false)
        }
      })
  }

  refetch = () => {
    this.getMangas()
  }

  ngOnInit() {
    this.getMangas()
  }

}
