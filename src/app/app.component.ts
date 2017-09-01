import { Component } from '@angular/core';
import data from './app.data'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages = data

  deletemessage() {
      for (let i = this.messages.length-1; i >= 0; --i) {
        if (this.messages[i].selected === true) {
          this.messages.splice(i, 1)
        }
      }
  }

  onselect() {
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

  onclickread() {
    for(let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].read === false) {
        if (this.messages[i].selected === true){
          this.messages[i].read = true
        }
      }
    }
  }

  onclickunread() {
    for(let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].read === true) {
        if (this.messages[i].selected === true){
          this.messages[i].read = false
        }
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
