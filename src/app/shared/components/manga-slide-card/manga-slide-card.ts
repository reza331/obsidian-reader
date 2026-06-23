import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MangaItem } from '../../../models/magna';
import { MangaServices } from '../../../core/api/manga-services';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-manga-slide-card',
  imports: [RouterLink],
  templateUrl: './manga-slide-card.html',
  styleUrl: './manga-slide-card.css',
})
export class MangaSlideCard implements OnInit {

  sizeClass = input<string>('')
  manga = input<MangaItem>()
  mangaServices = inject(MangaServices)

  fileUrl = signal<string>('')

  get mangaTitle() {

    const titles = this.manga()?.attributes.title

    if (!titles) return 'No title'

    if (titles['en']) return titles['en']

    const firstKey = Object.keys(titles)[0]

    return titles[firstKey]

  }

  get tags() {
    const tags = this.manga()?.attributes.tags || []
    return tags.slice(0, 2)
  }

  ngOnInit() {
    const coverID = this.manga()?.relationships.find((rel) => rel.type === 'cover_art')?.id || ''
    const proxyAddres = `https://proxy331.netlify.app/image-proxy?&url=`
    this.mangaServices.getCover(coverID).subscribe({
      next: (data) => {
        const imgUrl = `https://uploads.mangadex.org/covers/${this.manga()?.id}/${data.data.attributes.fileName}`
        this.fileUrl.set(`${proxyAddres}${encodeURIComponent(imgUrl)}` || '')
      }
    })
  }


}
