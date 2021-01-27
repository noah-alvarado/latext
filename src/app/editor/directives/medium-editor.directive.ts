import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { UserContentService } from '../../shared/services/user-content.service';
import * as unicodeit from 'unicodeit';
declare const MediumEditor: any;

@Directive({
  selector: '[pnclMediumEditor]'
})
export class MediumEditorDirective implements OnInit, OnChanges, OnDestroy {

  @Input('content') content: any;

  private editor: any;
  private lastContent: any;
  private initContent$: Subscription;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef<HTMLElement>,
    private userContent: UserContentService
  ) {
    // TODO: move to a resolver
    this.initContent$ = this.userContent.dbContent$.pipe(
      take(1),
      filter(content => !!content),
      tap(content => {
        this.content = content;
        this.refreshView();
      })
    ).subscribe();
  }

  ngOnInit() {
    const textarea = this.renderer.createElement('textarea');
    this.renderer.addClass(textarea, 'editable');
    this.renderer.addClass(textarea, 'medium-editor-textarea');
    this.renderer.appendChild(this.el.nativeElement, textarea);
    
    const _this = this;
    const ConvertLatexExpressionsExtension = MediumEditor.Extension.extend({
      name: 'convert-latex-expressions',

      init: function () {
        this.subscribe('editableBlur', this.handleBlur)
      },
      
      handleBlur: function ({target}: any) {
        const content = target.innerHTML as string;
        if (content) {
          const parsed = content.replace(/\$(.+?)\$/g, expr => unicodeit.replace(expr.slice(1, -1)));
          _this.content = parsed;
          _this.refreshView();
        }
      }
    });

    const options = {
      extensions: {
        'convert-latex-expressions': new ConvertLatexExpressionsExtension()
      },
      placeholder: {
        text: `Start typing here...\nTip: You may enter a LaTeX equation between two $ symbols. Try: $x \\in (-\\infty, \\infty)$`,
        hideOnClick: false
      }
    };
    this.editor = new MediumEditor('.editable', options);
    this.editor.subscribe('editableInput', () => this.updateContent());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isPropertyUpdated(changes, this.lastContent)) {
      this.lastContent = this.content;
      this.refreshView();
    }
  }

  ngOnDestroy() {
    this.editor.destroy();
    this.initContent$.unsubscribe();
  }

  updateContent() {
    const newContent = this.editor.getContent();
    this.lastContent = newContent;
    this.userContent.content = newContent;
  }

  refreshView() {
    if (this.editor) {
      this.editor.setContent(this.content);
    }
  }

  isPropertyUpdated(changes: SimpleChanges, model: any) {
    if (!changes.hasOwnProperty('content')) { return false; }

    const change = changes.content;
    if (change.isFirstChange()) {
      return true;
    }

    return model !== change.currentValue;
  }

}
