import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, OnInit, signal } from '@angular/core';
import { MangaItem } from '../../../models/magna';
import { MangaServices } from '../../../core/api/manga-services';
import { catchError } from 'rxjs';
import { SlideSectionsConfig } from '../../../pages/home/home';
import { MangaSlideCard } from '../manga-slide-card/manga-slide-card';
import { LoadingBox } from "../loading-box/loading-box";

@Component({
  selector: 'app-manga-slide',
  imports: [MangaSlideCard, LoadingBox],
  templateUrl: './manga-slide.html',
  styleUrl: './manga-slide.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MangaSlide implements OnInit {

  mangas = signal<MangaItem[]>([])

  mangaservices = inject(MangaServices)

  options = input<SlideSectionsConfig>()

  isLoading = signal(false)
  isError = signal(false)

  getMangas() {

    this.isLoading.set(true)

    this.mangaservices.getMangas(0, 20, `${this.options()?.queryOption}&includes[]=cover_art`)
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

  ngOnInit() {
    this.getMangas()
  }

}
