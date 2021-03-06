import { Component, ViewChild } from "@angular/core";
import { MenuItem } from "./models/menu-item";
import { MatSidenav } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("sidenav") sidenav: MatSidenav;

  constructor(private router: Router) {}

  menuItems: MenuItem[] = [
    { title: "Home", link: "home" },
    { title: "Schedule", link: "raceschedule" },
    { title: "Results", link: "raceresult" }
  ];

  public redirectAndCloseSideNav(redirectLocation) {
    this.toggleSideNav();
    this.router.navigate([redirectLocation]);
  }

  public toggleSideNav(): void {
    this.sidenav.toggle();
  }
}
