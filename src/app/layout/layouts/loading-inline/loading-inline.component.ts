import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-inline',
  templateUrl: './loading-inline.component.html',
  styleUrls: ['./loading-inline.component.scss']
})
export class LoadingInlineComponent implements OnInit {

  @Input('loading')
  public loading = true;
  constructor() { }

  ngOnInit(): void {
  }

}
