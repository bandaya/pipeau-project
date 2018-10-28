import {Injectable} from '@angular/core';
import {StorageService} from "../storage/storage.service";
import * as AWS from 'aws-sdk';
import {Profile} from "../../shared/models/Profile";
import {isUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  private static readonly PROFILES_KEY = 'profiles'
  private static readonly CURRENT_PROFILE_KEY = 'current_profile'

  private _profiles = [];

  private _currentProfile: Profile;

  public constructor(
    private store: StorageService) {

    this.loadFromStorage();
  }

  private loadFromStorage() {
    let loadedProfiles: Profile[] = this.store.getObject(ProfilesService.PROFILES_KEY)
    this._profiles = this._profiles.concat(loadedProfiles);
    let profileIndex: number = this.store.getInt(ProfilesService.CURRENT_PROFILE_KEY);
    if (isUndefined(profileIndex))
      this.currentProfile = null
    else
      this.currentProfile = this._profiles.length > profileIndex ? this._profiles[profileIndex] : null;
  }

  private saveInStorage() {
    this.store.store(ProfilesService.PROFILES_KEY, this._profiles);
    if (this._currentProfile) {
      let idx = this._profiles.indexOf(this._currentProfile);
      if (idx >= 0)
        this.store.store(ProfilesService.CURRENT_PROFILE_KEY, idx)
      else
        this.store.store(ProfilesService.CURRENT_PROFILE_KEY, null);
    } else {
      this.store.store(ProfilesService.CURRENT_PROFILE_KEY, null)
    }
  }

  addProfile(profile: Profile) {
    this._profiles = this._profiles.concat(profile);
    this.saveInStorage();
  }

  replace(index: number, profile: Profile) {
    if (this._profiles.length > index) {
      Object.assign(this.profiles[index], profile)
      this.saveInStorage();
    }
  }

  delete(index: number) {
    if (this._profiles.length > index) {
      this.profiles.splice(index, 1);
      this.saveInStorage();
    }
  }


  get profiles(): Profile[] {
    return this._profiles;
  }


  set currentProfile(profile: Profile) {
    if(profile!=null) {
      AWS.config.update({
        region: profile.awsDefaultRegion,
        credentials: new AWS.Credentials(profile.awsAccessKeyId, profile.awsSecretAccessKey)
      })
    }
    this._currentProfile = profile;
    this.saveInStorage()
  }

  get currentProfile(): Profile {
    return this._currentProfile
  }


}
