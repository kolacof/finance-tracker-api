import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { transaction } from '../../models/transaction';
import DataTable from 'datatables.net-dt';
import { CategoryoService } from '../../services/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { category } from '../../models/category';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent {
  table:any;
  transactions:transaction[];

  constructor(private transactionService: TransactionService, private categoryService:CategoryoService, private router:Router, private spinner:NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    this.listTransactions();
  }

  //LISTAR TRANSACCIONES

  creteDatatable() {
    setTimeout(() => {
      this.table= new DataTable("#tabla_clientes",{
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

  // Importar tipos de filtros y aplicarlos
  filtroOpcion: any; // Variable que interactúa con el primer select de filtros
  tipoFiltroSelect: any; // Variable que interactúa con el segundo select de filtros

  importarTipoFiltros() {
    this.filtroOpcion = $('#filtroOpcion');
    this.tipoFiltroSelect = $('#tipoFiltroSelect');
    let valorfiltroOpcion = this.filtroOpcion.val();
    if(valorfiltroOpcion=="1"){
        this.tipoFiltroSelect.empty();
        this.tipoFiltroSelect.append('<option value="">Todos</option>');
        this.categories.forEach((name) => {
          this.tipoFiltroSelect.append(`<option value="${name.name}">${name.name}</option>`);
        });
        const selectedValue = this.tipoFiltroSelect.val() as string;
        console.log("BUSCANDO"+ selectedValue);
        this.table.column(1).search(selectedValue).draw();
        this.spinner.hide();
    }else{
      this.tipoFiltroSelect.empty();
      this.tipoFiltroSelect.append('<option value="">Todos</option>');
      this.table.column(4).search('').draw();
    }
  }
  
  // Filtrar según los valores seleccionados
  filtrar() {
    let valorTipoFiltro = this.filtroOpcion.val();
    const selectedValue = this.tipoFiltroSelect.val() as string;
    this.table.column(0).search(selectedValue).draw();
  }

  listTransactions(){
    this.transactionService.listarTransactions().subscribe({
      next: (res) => {
        this.transactions=res;
      },
      error: (errorData) => {
        Swal.fire({
          title: "Error",
          text: "Error al cargar la lista de transacciones",
          icon: "error",
          confirmButtonColor: '#007B3E'
        });
        this.spinner.hide();
      },
      complete: () => {
        this.loadCategories();
        
        this.creteDatatable();
        this.spinner.hide();
        
      }
    });
  }

  //Crear Transacciones

  createTransactionModal(){
  }


  formtransaction = new FormGroup({
    'type': new FormControl('', Validators.required),
    'amount': new FormControl('', [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
    'categoryId': new FormControl(null, Validators.required),
    'description': new FormControl('', Validators.required),
    'date': new FormControl(null, Validators.required)
  });

  get type() {
    return this.formtransaction.get('type') as FormControl;
  }

  get amount() {
    return this.formtransaction.get('amount') as FormControl;
  }

  get categoryId() {
    return this.formtransaction.get('categoryId') as FormControl;
  }

  get date() {
    return this.formtransaction.get('date') as FormControl;
  }

  createTransaction(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas registrar la transacción",
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
          this.spinner.show();
          this.transactionService.createTransaction(this.formtransaction.value).subscribe({
            next:(res)=>{
            },
            error:(errorData)=>{
              Swal.fire({
                title: "Error",
                text: "Error al registrar la transacción",
                icon: "error",
                confirmButtonColor: '#007B3E'
              });
              this.spinner.hide();
            },
            complete:()=>{
              window.location.reload();
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

  //VER TRANSACCION


  seeTransaction(id:number){
    this.spinner.show();
    this.transactionService.seeTransaction(id).subscribe({
      next:(res)=>{
        this.transaction=res;
      },
      error: (errorData)=> {
        Swal.fire({
          title: "Error",
          text: "Error al cargar la información de la transacción",
          icon: "error",
          confirmButtonColor: '#007B3E'
        });
        this.spinner.hide();
      },
      complete: () => {
        this.actualizarFormulario();
        this.spinner.hide();
      }
    });
  }


  //EDITAR TRANSACCION


  idtransaction:number;
  transaction:transaction= new transaction();

  formtransactionUpdate= new FormGroup({
      'type': new FormControl(this.transaction.type, Validators.required),
      'amount': new FormControl(this.transaction.amount, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
      'categoryName': new FormControl(this.transaction.categoryName,Validators.required),
      'categoryId': new FormControl(this.transaction.categoryId),
      'date': new FormControl(this.transaction.date, Validators.required),
      'description': new FormControl(this.transaction.description, Validators.required),
      'id': new FormControl(0)
  });

  get typeUpdate() {
    return this.formtransactionUpdate.get('type') as FormControl;
  }

  get amountUpdate() {
    return this.formtransactionUpdate.get('amount') as FormControl;
  }

  get categoryNameUpdate() {
    return this.formtransactionUpdate.get('categoryName') as FormControl;
  }

  get dateUpdate() {
    return this.formtransactionUpdate.get('date') as FormControl;
  }

  actualizarFormulario(){
    this.formtransactionUpdate.get("type")?.setValue(this.transaction.type);
    this.formtransactionUpdate.get("amount")?.setValue(this.transaction.amount);
    this.formtransactionUpdate.get("categoryId")?.setValue(this.transaction.categoryId);
    this.formtransactionUpdate.get("categoryName")?.setValue(this.transaction.categoryName);
    this.formtransactionUpdate.get("date")?.setValue(this.transaction.date);
    this.formtransactionUpdate.get("description")?.setValue(this.transaction.description);
    this.formtransactionUpdate.get("id")?.setValue(this.transaction.id);
  }

  updateTransaction(id:number){
    this.router.navigate(["/updateTransaction", id]);
  }

  
  //ELIMINAR TRANSACCION
  deleteTransaction(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar la transacción",
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
        this.spinner.show();
        this.transactionService.deleteTransaction(id).subscribe({
          next:(res)=>{
          },
          error:(errorData)=>{
            Swal.fire({
              title: "Error",
              text: "Error, no se pudo eliminar la transacción",
              icon: "error",
              confirmButtonColor: '#007B3E'
            });
          },
          complete:()=>{
            this.spinner.hide();
            Swal.fire({
              title: "Hecho",
              text: "La transaccion ha sido eliminada",
              icon: "success",
              confirmButtonColor: '#007B3E'
            }).then((result)=>{
              if (result.isConfirmed){
                window.location.reload();
              }
            });
          }
        });
      }});
  }


  //CATEGORIAS

  categories:category[];

  loadCategories(){
    this.spinner.show();
    this.categoryService.listCategories().subscribe({
      next:(res)=>{
        this.categories=res;
      },
      error:(errorData)=>{
        Swal.fire({
          title: "Error",
          text: "Error al cargar las categorías",
          icon: "error",
          confirmButtonColor: '#007B3E'
        });
        this.spinner.hide();
      },
      complete:()=>{
        this.spinner.hide();
      }
    });
  }
}
