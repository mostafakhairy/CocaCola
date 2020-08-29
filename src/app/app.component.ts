import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { fadeAnimation } from './animation/animation.js';
import { CommonService } from './services/common.service.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'Coca Premier League';
  constructor( private translate: TranslateService,
               public commonService: CommonService ) {
    // this.translate.use('en');

  }
}

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();


