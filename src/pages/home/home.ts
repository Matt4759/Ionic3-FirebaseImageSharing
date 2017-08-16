import { PhotoProvider } from './../../providers/photo/photo';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photoList = [];
  constructor(public navCtrl: NavController, public photoProvider: PhotoProvider) {}
  //calling our list from our Database, and setting values 
  ionViewDidEnter(){
    this.photoProvider.getPhotoList().on('value', snapshot => {
      this.photoList = [];
      snapshot.forEach( snap => {
        this.photoList.push({
          id: snap.key,
          name: snap.val().name,
          picture: snap.val().picture,
        });
        console.log(this.photoList);
        return false
      });
    });
  }

  //go to the Add Photo Page
  goToAddPhoto(){
    this.navCtrl.push('AddPhotoPage');
  }
}
