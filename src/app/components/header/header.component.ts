import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Movie App';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showMovies() {
    this.router.navigateByUrl('/movies');
  }

  showTVShows() {
    this.router.navigateByUrl('/tvshows');
  }
}
