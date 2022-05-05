import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../shared/interfaces";
import {PostsService} from "../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup
  selectCategories = [
    {category: 'Design'},
    {category: 'Illustrations'},
    {category: 'Posters'},
    {category: 'Interior'},
    {category: 'Travel'},
  ]
  selectTags = [
    {tag: 'Abstract'},
    {tag: 'Creative'},
    {tag: 'Photo'},
    {tag: 'Art'},
    {tag: 'Style'},
    {tag: 'Pattern'},
    {tag: 'Drawing'},
  ]

  constructor(private postService: PostsService, private alert: AlertService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      imgUrl: new FormControl(null),
      title: new FormControl(null, Validators.required),
      category: new FormControl(this.selectCategories[0].category, Validators.required),
      tags: new FormControl(this.selectTags[0].tag, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.form.disable()

    const post: Post = {
      imgUrl: this.form.value.imgUrl,
      title: this.form.value.title,
      category: this.form.value.category,
      tags: this.form.value.tags,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
    }

    this.postService.create(post).subscribe({
      next: () => {
        this.form.reset()
        this.alert.success('Post was created')
        this.form.enable()
      }
    })
  }
}
