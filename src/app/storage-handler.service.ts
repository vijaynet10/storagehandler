import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import { isNull } from "@angular/compiler/src/output/output_ast";

@Injectable()
export class StorageHandlerService implements OnDestroy {
  private onLogoutSubject = new Subject<{ key: string; value: any }>();
  public logoutchanges = this.onLogoutSubject.asObservable().pipe(share());

  private onLoginSubject = new Subject<{ key: string; value: any }>();
  public loginchanges = this.onLoginSubject.asObservable().pipe(share());

  public userkey: string;

  constructor() {
    this.userkey = 'user';
    this.start();
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  ngOnDestroy() {
    this.stop();
  }

  private storageEventListener(event: StorageEvent) {
    let v;
    if (event.storageArea == localStorage) {
      try {
        v = JSON.parse(event.newValue);
      } catch (e) {
        v = event.newValue;
      }
      
    }

    if (event.key === this.userkey ) {
      let newvalue = event.newValue;
      if (newvalue === null ) { 
        console.log('null value ', event);
        this.onLogoutSubject.next({ key: event.key, value: v });
      }

      if (newvalue !== null) { 
        console.log('new value ', event);
        this.onLoginSubject.next({ key: event.key, value: v });
      }

      
    }
  }
  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
    this.onLogoutSubject.complete();
    this.onLoginSubject.complete();
  }

}
