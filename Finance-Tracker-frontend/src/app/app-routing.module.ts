import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { TransactionsListComponent } from './admin/components/transactions-list/transactions-list.component';
import { UpdateTransactionComponent } from './admin/components/update-transaction/update-transaction.component';
import { CategoryListComponent } from './admin/components/category-list/category-list.component';

const routes: Routes = [
  {path: "", component:DashboardComponent, children:[
    {path:'listTransactions',component: TransactionsListComponent},
    {path:'updateTransaction/:id',component: UpdateTransactionComponent},
    {path:'listCategories',component: CategoryListComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
