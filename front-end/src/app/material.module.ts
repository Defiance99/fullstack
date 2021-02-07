import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatCheckboxModule,MatStepperModule
  ],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatCheckboxModule,MatStepperModule],
})
export class MaterialModel { }