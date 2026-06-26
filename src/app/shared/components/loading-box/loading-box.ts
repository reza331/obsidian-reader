import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-box',
  imports: [],
  templateUrl: './loading-box.html',
  styleUrl: './loading-box.css',
})
export class LoadingBox {
  text = input('')
}
