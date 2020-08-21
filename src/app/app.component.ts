import { Component, VERSION } from '@angular/core';
import { StorageHandlerService } from './storage-handler.service';
import { User } from './user';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  public myUser: User = new User();

  constructor(private StorageHandler: StorageHandlerService) { 

    if ( localStorage.getItem(this.StorageHandler.userkey) ) { 
        this.myUser = JSON.parse(localStorage.getItem(this.StorageHandler.userkey)) as User;
    }

    this.StorageHandler.logoutchanges.pipe().subscribe( data => { 
        alert('Browser Log Out Call');
        this.myUser = new User();
    })

    this.StorageHandler.loginchanges.pipe().subscribe( data => { 
        alert('Browser Log in Call');
        this.myUser = JSON.parse(localStorage.getItem(this.StorageHandler.userkey)) as User;
    })
    

    
  }

 login() {
   
   if ( !this.myUser.name ) { 
     alert('invalid user')
     return;
   }

   if ( !this.myUser.password ) { 
     alert('invalid password')
     return;
   }

   if ( this.myUser.name.toLocaleLowerCase() !==  this.myUser.password.toLocaleLowerCase() ) { 
     alert('user name & password must be same');
     return;
   }
    localStorage.setItem(this.StorageHandler.userkey,JSON.stringify(this.myUser));

  }
logout() {
  localStorage.removeItem(this.StorageHandler.userkey);
}


public isuserloggedin(): boolean { 
  if (localStorage.getItem(this.StorageHandler.userkey)) { 
    return true;
  } else { 
    return false;
  }
}

}
