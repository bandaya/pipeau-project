import {Component, OnInit} from '@angular/core';
import {ProfilesService} from "../../core/services/profiles.service";
import {Profile} from "../../shared/models/Profile";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  regions: string[] = [
    'eu-west-1',
    'eu-west-2',
    'eu-west-3',
  ]

  selectedProfile: Profile;
  creationMode: boolean;
  private selectedIndex: number;

  constructor(
    private profileService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      console.log(params)
      let sidx = params['selectedIndex']
      if (sidx) {
        let index: number = parseInt(sidx)
        this.creationMode = false
        if (this.profileService.profiles.length > index) {
          this.selectedProfile = Object.assign(new Profile(), this.profileService.profiles[index]);
          this.selectedIndex = index;
        } else {
          this.selectedProfile = null;
        }
      } else if (params['create']) {
        this.selectedProfile = new Profile()
        this.creationMode = true;
      } else {
        this.selectedProfile = null;
        this.selectedIndex = -1;
      }
    });
  }

  ngOnInit() {
  }

  public saveProfile(form: NgForm) {
    if (form.valid) {
      if (this.creationMode) {
        this.profileService.addProfile(this.selectedProfile);
        this.router.navigate(["/profiles", {'selectedIndex':this.profileService.profiles.length-1}]);
      } else {
        this.profileService.replace(this.selectedIndex,this.selectedProfile);
      }
    }
  }

  public deleteProfile(){
    this.profileService.delete(this.selectedIndex);
    this.router.navigate(["/profiles"]);
  }

}
