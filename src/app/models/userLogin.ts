export class UserLogin {
  constructor(public email: string,
              public password: string,
              public isFb: boolean,
              public fbId: string,
              public mobileNumber: string,
              public firstName: string,
              public lastName: string,
              public photoURL: string,
              public authToken = '') {

  }

}
