import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../shared/posts.service";
import {Post} from "../shared/interfaces";
import {Subscription, throwError} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  pSub: Subscription | undefined
  dSub: Subscription | undefined
  searchStr = ''
  loading = false

  constructor(private postsService: PostsService, private alert: AlertService) { }

  ngOnInit() {
    this.loading = true
    this.pSub = this.postsService.getAll().subscribe({
      next: posts => {
        this.posts = posts
        this.loading = false
      },
      error: error => {
        throwError(error)
        this.loading = false
      }
      }
    )
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alert.danger('Post was deleted')
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }

    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }
}
