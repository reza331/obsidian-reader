import { Component, inject, OnInit, signal } from '@angular/core';
import { MangaServices } from '../../core/api/manga-services';
import { MangaItem } from '../../models/magna';
import { MangaCard } from "../../shared/components/manga-slide-card/manga-card";
import { ActivatedRoute } from '@angular/router';
import { LoadingBox } from "../../shared/components/loading-box/loading-box";
import { FetchErrorBox } from "../../shared/components/fetch-error-box/fetch-error-box";

@Component({
  selector: 'app-search',
  imports: [MangaCard, LoadingBox, FetchErrorBox],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {

  mangaServices = inject(MangaServices)
  activatedRoute = inject(ActivatedRoute)
  searchedTitle = signal('')
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

  getList(offset: number, limit: number, searchedTitle: string) {
    this.isLoading.set(true)
    this.isError.set(false)
    this.mangaServices.getMangas(offset, limit, `title=${searchedTitle}&includes[]=cover_art`)
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
    this.getList(this.getOffset(), this.limit(), this.searchedTitle())
  }
  prevPage() {
    if (this.currentPage() === 1) return
    this.mangaList.set([])
    this.currentPage.update(prev => prev - 1)
    this.getList(this.getOffset(), this.limit(), this.searchedTitle())
  }

  jumpPage(page: number) {
    if (isNaN(page)) return
    if (page > this.totalPage() || page < 1) return
    this.mangaList.set([])
    this.currentPage.set(page)
    this.getList(this.getOffset(), this.limit(), this.searchedTitle())
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
    this.getList(this.getOffset(), this.limit(), this.searchedTitle())
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.searchedTitle.set(params['searched'])
      this.mangaList.set([])
      this.getList(this.getOffset(), this.limit(), params['searched'])
    })
  }

}
