import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() onselect: () => void;
  @Input() messages
  @Input() onclickallread: () => void;
  @Input() onclickallunread: () => void;
  constructor() { }

  ngOnInit() {
  }

}
