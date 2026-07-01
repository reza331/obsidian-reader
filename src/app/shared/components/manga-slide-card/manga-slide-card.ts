import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MangaItem } from '../../../models/magna';
import { MangaServices } from '../../../core/api/manga-services';
import { RouterLink } from "@angular/router";
import { imgProxyAddress } from '../../../content/image-proxy';

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

  imgUrl = signal<string>('')

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

  get tags() {
    const tags = this.manga()?.attributes.tags || []
    return tags.slice(0, 2)
  }

  ngOnInit() {
    const fileName = this.manga()?.relationships.find((rel) => rel.type === 'cover_art')?.attributes.fileName 
    const img = `https://uploads.mangadex.org/covers/${this.manga()?.id}/${fileName}.256.jpg`
    this.imgUrl.set(`${imgProxyAddress}${img}`)
  }


}
