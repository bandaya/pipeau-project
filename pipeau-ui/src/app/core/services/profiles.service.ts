import {Injectable} from '@angular/core';
import {StorageService} from "../storage/storage.service";
import * as AWS from 'aws-sdk';
import {Profile} from "../../shared/models/Profile";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private static readonly PROFILES_KEY = 'profiles'

  private _profiles = [];

  private _currentProfile;

  public constructor(
    private store: StorageService) {

    this.loadFromStorage();
  }

  private loadFromStorage() {
    let loadedProfiles: Profile[] = this.store.getObject(ProfilesService.PROFILES_KEY)
    this._profiles = this._profiles.concat(loadedProfiles);

  }

  private saveInStorage() {
    this.store.store(ProfilesService.PROFILES_KEY, this._profiles);
  }

  addProfile(profile: Profile) {
    this._profiles = this._profiles.concat(profile);
    this.saveInStorage();
  }

  replace(index: number, profile: Profile) {
    if(this._profiles.length>index){
      Object.assign(this.profiles[index], profile)
      this.saveInStorage();
    }
  }

  delete(index:number) {
    if(this._profiles.length>index){
      this.profiles.splice(index,1);
      this.saveInStorage();
    }
  }


  get profiles(): Profile[] {
    return this._profiles;
  }


  set currentProfile(profile: Profile) {
    AWS.config.update({
      region: profile.awsDefaultRegion,
      credentials: new AWS.Credentials(profile.awsAccessKeyId, profile.awsSecretAccessKey)
    })
    this._currentProfile = profile;
  }

  get currentProfile():Profile {
    return this._currentProfile
  }



}
