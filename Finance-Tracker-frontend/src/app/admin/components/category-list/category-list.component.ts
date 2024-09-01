import { Component, OnInit } from '@angular/core';
import DataTable from 'datatables.net-dt';
import { category } from '../../models/category';
import { CategoryoService } from '../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  table:any;
  categories:category[];
  constructor(private categoryService:CategoryoService, private spinner:NgxSpinnerService){

  }

  ngOnInit(): void {
    this.spinner.show();
    this.loadCategories();
  }

  loadCategories(){
    this.categoryService.listCategories().subscribe({
      next:(res)=>{
        this.categories=res;
      },
      error:(errorData)=>{
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al cargar la lista de categorías",
          icon: "success",
          confirmButtonColor: '#007B3E'
        });
        this.creteDatatable();
      },
      complete:()=>{
        this.creteDatatable()
        this.spinner.hide();

      }
    });
  }

  creteDatatable() {
    setTimeout(() => {
      if(this.table){
        this.table.destroy();
      }
      this.table = new DataTable("#table_categories",{
        language: {
          url: '/assets/es-ES.json',
        },
        columnDefs: [
          {
            targets: "_all",
            className: 'dt-center'
          }
        ],
        paging: true,
        pagingType: 'simple',
        layout:{
          topStart: 'search',
          topEnd: 'pageLength',
          bottomStart: 'paging',
          bottomEnd: 'info'
        },
      });
    }, 1);
  }
}
