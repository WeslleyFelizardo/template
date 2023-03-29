import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';


const isAbsolute = new RegExp('(?:^[a-z][a-z0-9+.-]*:|\/\/)', 'i');
@Component({
  selector: 'app-markdown',
  templateUrl: './btp-markdown.component.html',
  styleUrls: ['./btp-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
// USAGE
// import sharedmodules;
// <app-markdown url="https://markdownfileurl.md" ></app-markdown>
export class BtpMarkdownComponent implements OnInit, OnDestroy {
  @Input()
  url: string;
  public portalDevelopersDocUrl = 'https://strgbtpapim.blob.core.windows.net/btp-docs/developer-portal/'

  @ViewChild('btpmarkdown', { static: false }) public markdowndiv: MarkdownComponent;

  listenObj: any;
  constructor(
    private markdownService: MarkdownService,
    private renderer: Renderer2,
    private router: Router,
    private translocoService: TranslocoService  ) { }

  ngOnInit() {

    console.log(this.url);

    const me = this;
    me.markdownService.renderer.image = (
      href: string,
      title: string,
      text: string
    ) => {
      href = isAbsolute.test(href) ? href : `${me.url.substring(0, me.url.lastIndexOf('/')) + '/' + href}`;
      return `
      <center>
        <img src=${href} title=${text}></img>
      </center>
      `;
    };

    me.markdownService.renderer.blockquote = (text: string) => {
      let tagClass = '';
      let type = '';
      if (new RegExp(/\[!NOTE\]/gm).test(text)) {
        text = text.replace('[!NOTE]', '');
        type = this.translocoService.translate("markdown.observacao");
        tagClass = 'md-note';
        return   `<blockquote class="md-custom-tag ${tagClass}">
                      <p class="custom-headinfo">
                        <span class="material-icons-outlined custom-headinfo-icon">info
                        </span>
                        <span class="custom-headinfo-title">${type}
                        </span>
                      </p>
                      <p class="md-custom-tag-content">${text}</p>
                      </blockquote>`;
      } else if (new RegExp(/\[!TIP\]/igm).test(text)) {
        text = text.replace('[!TIP]', '');
        type = this.translocoService.translate("markdown.dica");
        tagClass = 'md-tip';
        return   `<blockquote class="md-custom-tag ${tagClass}">
                      <p class="custom-headinfo">
                        <span class="material-icons-outlined custom-headinfo-icon">tips_and_updates
                        </span>
                        <span class="custom-headinfo-title">${type}
                        </span>
                      </p>
                      <p class="md-custom-tag-content">${text}</p>
                      </blockquote>`;
      } else if (new RegExp(/\[!IMPORTANT\]/igm).test(text)) {
        text = text.replace('[!IMPORTANT]', '');
        type = this.translocoService.translate("markdown.importante");

         tagClass = 'md-important';
         return   `<blockquote class="md-custom-tag ${tagClass}">
                      <p class="custom-headinfo">
                        <span class="material-icons-outlined custom-headinfo-icon">priority_high
                        </span>
                        <span class="custom-headinfo-title">${type}
                        </span>
                      </p>
                      <p class="md-custom-tag-content">${text}</p>
                      </blockquote>`;
      } else if (new RegExp(/\[!CAUTION\]/igm).test(text)) {
        text = text.replace('[!CAUTION]', '');
        type = this.translocoService.translate("markdown.cuidado");
         tagClass = 'md-caution';
        return   `<blockquote class="md-custom-tag ${tagClass}">
                     <p class="custom-headinfo">
                       <span class="material-icons-outlined custom-headinfo-icon">report
                       </span>
                       <span class="custom-headinfo-title">${type}
                       </span>
                     </p>
                     <p class="md-custom-tag-content">${text}</p>
                     </blockquote>`;
      } else if (new RegExp(/\[!WARNING\]/igm).test(text)) {
        text = text.replace('[!WARNING]', '');
        type = this.translocoService.translate("markdown.aviso");
        tagClass = 'md-warning';
        return   `<blockquote class="md-custom-tag ${tagClass}">
                     <p class="custom-headinfo">
                       <span class="material-icons-outlined custom-headinfo-icon">report
                       </span>
                       <span class="custom-headinfo-title">${type}
                       </span>
                     </p>
                     <p class="md-custom-tag-content">${text}</p>
                     </blockquote>`;
      } else {
        return text;
      }
    };
    me.markdownService.renderer.html = (html: string) => {
      return html;
    };
    me.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + ' class="' + 'h' + level + 'custom">' +
        '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
        '<span class="header-link"></span>' +
        '</a>' + text +
        '</h' + level + '>';
    };
  }
  public onMarkdownLoad(event: any) {
    if (this.markdowndiv) {
      this.listenObj = this.renderer.listen(this.markdowndiv.element.nativeElement, 'click', (e: Event) => {
        if (e?.target && (e?.target as HTMLElement)?.tagName === 'A') {
          const el = (e.target as HTMLElement);
          const linkURL = el.getAttribute && el.getAttribute('href');
          if (linkURL && !isAbsolute.test(linkURL)) {
            e.preventDefault();
            this.router.navigate([linkURL]);
          } else {
             (e?.target as HTMLAreaElement).target = '_blank';
          }
        }
      });
    }
  }
  ngOnDestroy(): void {
    if (this.listenObj) {
      this.listenObj();
    }
  }
}
