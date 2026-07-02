import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChapterStore } from '../../core/chapter-page-service/chapter-store';
import { MangaStore } from '../../core/manga-page-service/manga-store';
import { languages } from '../../content/language-options';

@Component({
  selector: 'app-chapter',
  imports: [],
  templateUrl: './chapter.html',
  styleUrl: './chapter.css',
})
export class Chapter implements OnInit {

  router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  chapterStore = inject(ChapterStore)
  mangaStore = inject(MangaStore)
  isChaptersOpen = signal(false)
  languages = signal(languages)
  chapterID = signal('')

  openChapters() {
    document.body.style.overflow = 'hidden'
    this.isChaptersOpen.set(true)
  }

  closeChapters() {
    document.body.style.overflow = ''
    this.isChaptersOpen.set(false)
  }

  changeLang(event: any) {
    this.mangaStore.getChapters(this.mangaStore.manga()?.id as string, event.target.value)
  }

  goMangaPage() {
    this.router.navigate([
      '/manga',
      this.mangaStore.manga()?.id
    ]);
  }

  chapterSelect(chapterID: string) {

    this.closeChapters();
    this.router.navigate([
      '/chapter',
      this.mangaStore.manga()?.id,
      chapterID
    ]);

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.chapterStore.images.set([])
      this.chapterID.set(params['chapterID'])
      this.chapterStore.getChapterImages(params['chapterID'])
      this.chapterStore.getScanGroup(params['chapterID'])
      this.mangaStore.loadManga(params['mangaID']);
    });
  }

}









