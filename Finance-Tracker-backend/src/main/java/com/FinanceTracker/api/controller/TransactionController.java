package com.FinanceTracker.api.controller;

import com.FinanceTracker.api.dto.TransactionDTO;
import com.FinanceTracker.api.services.TransactionService;
import com.FinanceTracker.api.utils.ResponseMessage;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Controlador para manejar operaciones relacionadas con transacciones.
 * Proporciona endpoints para crear, listar, ver, actualizar y eliminar transacciones.
 */
@RequestMapping("/transactions")
@RestController
public class TransactionController {
    @Autowired
    TransactionService service;

    /**
     * Crea una nueva transacción.
     *
     * @param transactionDTO el objeto TransactionDTO que contiene los detalles de la transacción a crear.
     */
    @PostMapping("")
    public ResponseEntity<ResponseMessage> createTransaction(@RequestBody TransactionDTO transactionDTO){
        service.createTransaction(transactionDTO);
        return new ResponseEntity<>(new ResponseMessage("Se ha regitrado la transaccion correctamente"),HttpStatus.OK);
    }

    /**
     * Recupera una lista de todas las transacciones.
     *
     * @return una lista de objetos TransactionDTO que representan todas las transacciones.
     */
    @GetMapping("")
    public ResponseEntity<List<TransactionDTO>>  listFinances(){
        return new ResponseEntity<>(service.listTransaction(), HttpStatus.OK);
    }


    /**
     * Recupera los detalles de una transacción específica por su ID.
     *
     * @param id el ID de la transacción a recuperar.
     * @return el objeto TransactionDTO que contiene los detalles de la transacción especificada.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO>  showTransaction(@PathVariable Long id){
        return new ResponseEntity<>(service.showTransaction(id), HttpStatus.OK);
    }

    /**
     * Actualiza una transacción existente con nuevos detalles.
     *
     * @param id el ID de la transacción a actualizar.
     * @param newFinanceDetails el objeto TransactionDTO que contiene los nuevos detalles para la transacción.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateTransaction (@PathVariable Long id, @RequestBody TransactionDTO newFinanceDetails){
        service.updateTransaction(id,newFinanceDetails);
        return new ResponseEntity<>(new ResponseMessage("Se ha editado correctamente la transaccion"), HttpStatus.OK);
    }

    /**
     * Elimina una transacción por su ID.
     *
     * @param id el ID de la transacción a eliminar.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteTransaction(@PathVariable Long id){
        service.deleteTransaction(id);
        return new ResponseEntity<>(new ResponseMessage("Se ha eliminado la transaccion"), HttpStatus.OK);
    }
}
