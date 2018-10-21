import {Component, OnInit} from '@angular/core';
import {ProfilesService} from "../services/profiles.service";
import {Profile} from "../../shared/models/Profile";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public profileService: ProfilesService,

  ) {
  }

  ngOnInit() {

  }

  public selectProfile(profile:Profile){
    this.profileService.currentProfile = profile;
  }
}
