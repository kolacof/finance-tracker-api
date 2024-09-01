import { Component } from '@angular/core';
import { transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category } from '../../models/category';
import { CategoryoService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent {
  categories:category[];
  idtransaction:number;
  transaction:transaction= new transaction();
  constructor(private transactionService:TransactionService, private categoryService:CategoryoService, private router:Router, private route:ActivatedRoute, private spinner:NgxSpinnerService){}
  
  ngOnInit(): void {
    this.spinner.show();
    this.idtransaction= this.route.snapshot.params["id"];
    this.loadTransaction();
  }

  loadTransaction(){
    this.transactionService.seeTransaction(this.idtransaction).subscribe({
      next:(res)=>{
        this.transaction=res;
      },
      error: (errorData)=> {
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar la informacion de la transaccion",
          icon: "error",
          confirmButtonColor: '#007B3E'
        });
      },
      complete: () => {
        this.loadCategories();
        this.actualizarFormulario();
      }
    });
  }

  loadCategories(){
    this.categoryService.listCategories().subscribe({
      next:(res)=>{
        this.categories=res;
      },
      error:(errorData)=>{
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las categorias existentes",
          icon: "error",
          confirmButtonColor: '#007B3E'
        });
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }

  
  formtransaction= new FormGroup({
      'type': new FormControl(this.transaction.type, Validators.required),
      'amount': new FormControl(this.transaction.amount, Validators.required),
      'categoryName': new FormControl(this.transaction.categoryName, Validators.required),
      'categoryId': new FormControl(this.transaction.categoryId),
      'date': new FormControl(this.transaction.date, Validators.required),
      'description': new FormControl(this.transaction.description, Validators.required),
      'id': new FormControl(0)
  });

  actualizarFormulario(){
    this.formtransaction.get("type")?.setValue(this.transaction.type);
    this.formtransaction.get("amount")?.setValue(this.transaction.amount);
    this.formtransaction.get("categoryName")?.setValue(this.transaction.categoryName);
    this.formtransaction.get("categoryId")?.setValue(this.transaction.categoryId);
    this.formtransaction.get("date")?.setValue(this.transaction.date);
    this.formtransaction.get("description")?.setValue(this.transaction.description);
    this.formtransaction.get("id")?.setValue(this.transaction.id);
    console.log(this.formtransaction.value);
  }

  get type() {
    return this.formtransaction.get('type') as FormControl;
  }

  get amount() {
    return this.formtransaction.get('amount') as FormControl;
  }

  get categoryName() {
    return this.formtransaction.get('categoryName') as FormControl;
  }

  get date() {
    return this.formtransaction.get('date') as FormControl;
  }


  backToList(){
    this.router.navigate(["/listTransactions"]);
  }

  updateTransaction(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas editar la transacción",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#007B3E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , crear',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.formtransaction.valid){
          var idcategory:any = this.formtransaction.get('categoryName')?.value;
          this.formtransaction.get('categoryId')?.setValue(idcategory);
          this.formtransaction.get('id')?.setValue(this.idtransaction);
          this.transactionService.updateTransaction(this.idtransaction, this.formtransaction.value).subscribe({
            next:(res)=>{
            },
            error:(errorData)=>{
              Swal.fire({
                title: "Error",
                text: "error al editar la transaccion",
                icon: "error",
                confirmButtonColor: '#007B3E'
              });
            },
            complete:()=>{
              this.backToList();
            }
          });
        }
        else{
          this.formtransaction.markAllAsTouched();
          Swal.fire({
            title: "Error",
            text: "Debes llenar todos los capos obligatorios",
            icon: "warning",
            confirmButtonColor: '#007B3E'
          });
        }
      }});
  }
}
