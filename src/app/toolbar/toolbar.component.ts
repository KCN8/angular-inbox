import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Input() messages
  @Input() onselect: () => void;
  @Input() onclickread: () => void;
  @Input() onclickunread: () => void;
  @Input() deletemessage: () => void;
  constructor() { }

  ngOnInit() {
  }

}
