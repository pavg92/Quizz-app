import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-count',
  templateUrl: './initial-count.component.html',
  styleUrls: ['./initial-count.component.css']
})
export class InitialCountComponent implements OnInit, OnDestroy {
  
  count = 3;
  interval : any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.playCount();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  playCount() {
    this.interval = setInterval(() => {
      if (this.count == 0) {
        this.router.navigate(['/play/take-quizz'])
      }

      this.count--;
    },1000);
  }
}
