import { Component } from '@angular/core';
import data from './app.data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages = data

  onselect(){
    let messagesLength = this.messages.length
    let trueLength = this.messages.filter(messages => messages.selected === true).length
    for(let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].selected === false) {
        this.messages[i].selected = true
      } else if (messagesLength === trueLength){
        this.messages[i].selected = false
      }
    }
  }

  onclickallread(){
    for(let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].read === false) {
        this.messages[i].read = true
      }
    }
  }

  onclickallunread(){
    for(let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].read === true) {
        this.messages[i].read = false
      }
    }
  }

  togglestar(id) {
    for(let i = 0; i < this.messages.length; i++) {
      if (id === this.messages[i].id) {
        this.messages[i].starred = !this.messages[i].starred
      }
    }
  }

  togglecheckbox(id) {
    for(let i = 0; i < this.messages.length; i++) {
      if (id === this.messages[i].id) {
        this.messages[i].selected = !this.messages[i].selected
      }
    }
  }
}
