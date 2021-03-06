import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatToolbarModule, MatProgressSpinnerModule,
  MatMenuModule, MatSidenavModule, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS,
  MatListModule, MatFormFieldModule, MatSelectModule, MatTabsModule, MatIconModule, MatGridListModule
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
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class MaterialModule { }
