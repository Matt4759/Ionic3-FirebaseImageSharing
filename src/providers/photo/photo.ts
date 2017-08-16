import firebase from 'firebase';
import { Injectable } from '@angular/core';
/*
 Provider, contains methods used in AddPhoto
*/
@Injectable()
export class PhotoProvider {
public DbRef:firebase.database.Reference;
  constructor() {
    this.DbRef = firebase.database().ref('pictureList')
  }

  //will take the image from the addphoto page, push the image to storage, and then store the downloadUrl and given name of the photo
  
  createPost(pictureName: string, picture: string): firebase.Promise<any> {
    firebase.storage().ref('/pictures/').child(pictureName)
    .child('plantPicture.png')
    .putString(picture, 'base64', {contentType: 'image/png'})
    .then((savedPicture) => {
    this.DbRef.push({
     picture: savedPicture.downloadURL,
      name: pictureName,
     })
    });
    return 
  }

  //returns the db refrence of our images so we can display them 
  getPhotoList(): firebase.database.Reference {
    return this.DbRef;
  }

}
