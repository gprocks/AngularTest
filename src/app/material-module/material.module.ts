import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatProgressSpinnerModule,
  MatMenuModule, MatSidenavModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  imports: [
    MatButtonModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class MaterialModule { }
