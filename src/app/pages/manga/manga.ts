import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MangaStore } from '../../core/manga-page-service/manga-store';
import { RatingColor } from '../../shared/directives/rating-color';
import { languages } from '../../content/language-options';
import { LoadingBox } from "../../shared/components/loading-box/loading-box";

@Component({
  selector: 'app-manga',
  imports: [RatingColor, LoadingBox, RouterLink],
  templateUrl: './manga.html',
  styleUrl: './manga.css',
  standalone: true
})
export class Manga implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  mangaStore = inject(MangaStore);
  isDescExtend = signal(false)
  isChaptersOpen = signal(false)
  languages = signal(languages)

  get mangaTitle() {

    const altTitles = this.mangaStore.manga()?.attributes.altTitles
    const titles = this.mangaStore.manga()?.attributes.title

    if (!altTitles || !titles) return 'No Title'

    const engTitle = altTitles.find(t => t['en'])

    if (engTitle) return engTitle['en']

    if (titles['en']) return titles['en']
    const firstKey = Object.keys(titles)[0]
    return firstKey

  }

  get tags() {
    const tags = this.mangaStore.manga()?.attributes.tags || []
    return tags.slice(0, 6)
  }

  toggleDesc() {
    this.isDescExtend.update(value => !value)
  }

  openChapters() {
    this.isChaptersOpen.set(true)
  }

  closeChapters() {
    this.isChaptersOpen.set(false)
  }

  myMessage() {
    alert('This feature is not implemented yet');
  }

  changeLang(event: any) {
    this.mangaStore.getChapters(this.mangaStore.manga()?.id as string, event.target.value)
  }

  runService() {
    this.activatedRoute.params.subscribe(params => {
      this.mangaStore.loadManga(params['id']);
    });
  }

  ngOnInit() {
    this.runService();
  }

}
