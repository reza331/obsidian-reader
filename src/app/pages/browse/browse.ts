import { Component, inject, OnInit, signal } from '@angular/core';
import { MangaServices } from '../../core/api/manga-services';
import { ActivatedRoute } from '@angular/router';
import { MangaItem } from '../../models/magna';
import { FetchErrorBox } from '../../shared/components/fetch-error-box/fetch-error-box';
import { LoadingBox } from '../../shared/components/loading-box/loading-box';
import { MangaCard } from '../../shared/components/manga-slide-card/manga-card';

@Component({
  selector: 'app-browse',
  imports: [MangaCard, LoadingBox, FetchErrorBox],
  templateUrl: './browse.html',
  styleUrl: './browse.css',
})
export class Browse implements OnInit {

  mangaServices = inject(MangaServices)
  activatedRoute = inject(ActivatedRoute)
  title = signal('')
  queryOption = signal('')
  isLoading = signal(false)
  isError = signal(false)
  mangaList = signal<MangaItem[]>([])
  // page
  currentPage = signal(1)
  totalPage = signal<number>(1)
  limit = signal(16)
  jumpPageValue = signal(1)

  getOffset() {
    return (this.currentPage() - 1) * this.limit()
  }

  getList(offset: number, limit: number) {
    this.isLoading.set(true)
    this.isError.set(false)
    this.mangaServices.getMangas(offset, limit, `${this.queryOption() === '#' ? '' : this.queryOption + '&'}includes[]=cover_art`)
      .pipe()
      .subscribe({
        next: (data) => {
          if (Math.ceil(data.total / limit) > 620) {
            this.totalPage.set(620)
          } else {
            this.totalPage.set(Math.ceil(data.total / limit))
          }
          this.mangaList.set(data.data)
          this.isLoading.set(false)
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false)
          this.isError.set(true)
        }
      })
  }

  nextPage() {
    if (this.currentPage() === this.totalPage()) return
    this.mangaList.set([])
    this.currentPage.update(prev => prev + 1)
    this.getList(this.getOffset(), this.limit())
  }
  prevPage() {
    if (this.currentPage() === 1) return
    this.mangaList.set([])
    this.currentPage.update(prev => prev - 1)
    this.getList(this.getOffset(), this.limit())
  }

  jumpPage(page: number) {
    if (isNaN(page)) return
    if (page > this.totalPage() || page < 1) return
    this.mangaList.set([])
    this.currentPage.set(page)
    this.getList(this.getOffset(), this.limit())
  }

  keyUp(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement
    const value = target.value
    this.jumpPageValue.set(+value)
    if (e.key === 'Enter') {
      this.jumpPage(this.jumpPageValue())
    }
  }

  refetch = () => {
    this.getList(this.getOffset(), this.limit())
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.title.set(params['title'])
      this.queryOption.set(params['query'])
      this.mangaList.set([])
      this.getList(this.getOffset(), this.limit())
    })
  }

}
