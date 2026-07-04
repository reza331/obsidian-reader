import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MangaServices } from '../../../core/api/manga-services';
import { MangaItem } from '../../../models/magna';
import { imgProxyAddress } from '../../../content/image-proxy';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-saved-card',
  imports: [RouterLink],
  templateUrl: './saved-card.html',
  styleUrl: './saved-card.css',
})
export class SavedCard implements OnInit {

  mangaID = input.required<string>()
  mangaServices = inject(MangaServices)
  manga = signal<MangaItem | null>(null)
  isLoading = signal<boolean>(false)
  imageUrl = signal('')

  getInfo() {
    this.isLoading.set(true)
    this.mangaServices.getManga(this.mangaID(), 'includes[]=cover_art').subscribe({
      next: (data) => {
        this.manga.set(data.data)
        this.getCoverUrl()
        this.isLoading.set(false)
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false)
      }
    })
  }

  getCoverUrl() {
    const fileName = this.manga()?.relationships.find(rel => rel.type === 'cover_art')?.attributes.fileName;
    this.imageUrl.set(`${imgProxyAddress}https://uploads.mangadex.org/covers/${this.manga()?.id}/${fileName}.256.jpg`)
  }

  get mangaTitle() {

    const altTitles = this.manga()?.attributes.altTitles
    const titles = this.manga()?.attributes.title

    if (!altTitles || !titles) return 'No Title'

    const engTitle = altTitles.find(t => t['en'])

    if (engTitle) return engTitle['en']

    if (titles['en']) return titles['en']
    const firstKey = Object.values(titles)[0]
    return firstKey

  }

  ngOnInit(): void {
    this.getInfo()
  }

}
