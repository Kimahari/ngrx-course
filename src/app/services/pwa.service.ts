import { Injectable } from '@angular/core'; import { SwUpdate } from '@angular/service-worker';

function askUserToUpdate() {
  console.info('There is install stuffs');
  return true;
}

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  promptEvent: any;

  constructor(swUpdate: SwUpdate) {
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });

    swUpdate.available.subscribe(event => {
      if (askUserToUpdate()) {
        window.location.reload();
      }
    });
  }
}
