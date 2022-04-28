import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {
  form!: FormGroup
  isSticky: boolean = false
  isDropdownActive: boolean = false
  isSearchActive: boolean = false

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null)
    })
  }

  @HostListener("document:scroll")
  stickyHandler() {
    this.isSticky = window.scrollY >= 50;
  }

  @HostListener("document:keydown", ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isSearchActive = false
    }
  }

  showDropdown(show: boolean) {
    this.isDropdownActive = show;
  }

  showSearch(search: boolean) {
    if (this.form.value.search !== null) {
      // TODO: add search API
    } else {
      this.isSearchActive = !search
    }
  }
}
