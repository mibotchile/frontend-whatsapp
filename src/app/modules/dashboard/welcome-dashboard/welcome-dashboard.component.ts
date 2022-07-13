import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'frontend-whatsapp-welcome-dashboard',
  templateUrl: './welcome-dashboard.component.html',
  styleUrls: ['./welcome-dashboard.component.scss']
})
export class WelcomeDashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        console.log(params)
    })
  }

}
