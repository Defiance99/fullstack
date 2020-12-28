import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatCheckboxModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule, MatCheckboxModule],
})
export class MaterialModel { }