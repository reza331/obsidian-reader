import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterStore } from '../../core/chapter-page-service/chapter-store';

@Component({
  selector: 'app-chapter',
  imports: [],
  templateUrl: './chapter.html',
  styleUrl: './chapter.css',
})
export class Chapter implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  chapterStore = inject(ChapterStore)


  ngOnInit(): void {
     this.activatedRoute.params.subscribe(params => {
      this.chapterStore.getChapterImages(params['chapterID'])
      this.chapterStore.getScanGroup(params['chapterID'])
    });
  }

}









