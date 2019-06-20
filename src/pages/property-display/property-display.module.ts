import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyDisplayPage } from './property-display';

@NgModule({
  declarations: [
    PropertyDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyDisplayPage),
  ],
})
export class PropertyDisplayPageModule {}
