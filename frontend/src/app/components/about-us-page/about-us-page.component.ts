import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us-page',
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.css']
})
export class AboutUsPageComponent implements OnInit {

  constructor(private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Sobre nosotros")
  }

}
