import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * Modulo donde se realizan importaciones de AngularMaterial.
 * 
 * @module NgModule
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    FlexLayoutModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,    
    MatGridListModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatRadioModule
    
  ], exports:[
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    FlexLayoutModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatStepperModule,
    MatProgressBarModule,
    MatGridListModule,
    MatRadioModule
    
  ]
})
export class MaterialModule { }
