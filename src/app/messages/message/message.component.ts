import { Component, Input, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message[];
  @Input() toggleStar: (id: number) => void;
  @Input() toggleCheckbox: (id: number) => void;

  constructor() { }

  ngOnInit(){

  }
}
