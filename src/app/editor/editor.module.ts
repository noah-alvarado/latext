import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorRoutingModule } from './editor-routing.module';
import { DocumentEditorComponent } from './components/document-editor/document-editor.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MediumEditorDirective } from './directives/medium-editor.directive';

@NgModule({
  declarations: [
    DocumentEditorComponent,
    MediumEditorDirective
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class EditorModule { }
