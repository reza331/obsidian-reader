import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fetch-error-box',
  imports: [],
  templateUrl: './fetch-error-box.html',
  styleUrl: './fetch-error-box.css',
})
export class FetchErrorBox {

  refetchFunction = input.required<any>()
  refetch() {
    this.refetchFunction()()
  }

}
