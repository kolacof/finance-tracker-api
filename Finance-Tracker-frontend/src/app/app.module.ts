import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { TransactionsListComponent } from './admin/components/transactions-list/transactions-list.component';
import { UpdateTransactionComponent } from './admin/components/update-transaction/update-transaction.component';
import { SidevarComponent } from './shared/components/sidevar/sidevar.component';
import { CategoryListComponent } from './admin/components/category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    TransactionsListComponent,
    UpdateTransactionComponent,
    SidevarComponent,
    CategoryListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
