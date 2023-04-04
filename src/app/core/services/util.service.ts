import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private httpClient: HttpClient,
    private _translocoService: TranslocoService
    
    //private clipboard: ClipboardService,
  ) { }
  testJSON(strJson) {
    try {
      const parsed = JSON.parse(strJson);
      if (parsed && typeof parsed === 'object') {
        return true;
      }
    } catch { return false; }
    return false;
  }

  copyTextClipboard(content: any) {
    const value = content as string;
    let strToCopy = '';
    // if (!!value && value?.length > 0) {
    //   strToCopy = value;
    //   this.clipboard.copy(strToCopy);
    //   if (!!strToCopy) {
    //     this._snackBar.open((!!strToCopy) ? 'Clipboard' : 'erro', '', {
    //       duration: 2000,
    //     });
    //   }
    // }
  }

  copyContent(content) {
    let object = {... content};
    if (Array.isArray(content)) {
      object  = content[0];
    } else {
      object  = content;
    }

    if (object?.typeSchema) {
      object = object?.typeSchema;
    }

    const strToCopy = JSON.stringify(object, null, 2);
    // this.clipboard.copy(strToCopy);
    if (!!strToCopy) {
      // this._snackBar.open((!!strToCopy) ? 'Clipboard' : 'erro', '', {
      //   duration: 2000,
      // });
    }
  }

  setLangMarkdown(name: string) {
      
    let langSelected = this._translocoService.getActiveLang();
    console.log('langSelected', langSelected)
      if (langSelected == 'en')
        name = `${name}.en`;

      return `${name}.md`;
  }

}

