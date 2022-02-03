import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './posts/index/index.component';
import { ViewComponent } from './posts/view/view.component';
import { EditComponent } from './posts/edit/edit.component';
import { AddComponent } from './posts/add/add.component';

@NgModule({
  declarations: [AppComponent, IndexComponent, ViewComponent, EditComponent, AddComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
