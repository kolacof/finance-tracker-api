package com.FinanceTracker.api.controller;

import com.FinanceTracker.api.dto.TransactionDTO;
import com.FinanceTracker.api.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void createTransaction(@RequestBody TransactionDTO transactionDTO){
        service.createTransaction(transactionDTO);
    }

    /**
     * Recupera una lista de todas las transacciones.
     *
     * @return una lista de objetos TransactionDTO que representan todas las transacciones.
     */
    @GetMapping("")
    public List<TransactionDTO> listFinances(){
        return service.listTransaction();
    }


    /**
     * Recupera los detalles de una transacción específica por su ID.
     *
     * @param id el ID de la transacción a recuperar.
     * @return el objeto TransactionDTO que contiene los detalles de la transacción especificada.
     */
    @GetMapping("/{id}")
    public TransactionDTO showTransaction(@PathVariable Long id){
        return service.showTransaction(id);
    }



    /**
     * Actualiza una transacción existente con nuevos detalles.
     *
     * @param id el ID de la transacción a actualizar.
     * @param newFinanceDetails el objeto TransactionDTO que contiene los nuevos detalles para la transacción.
     */
    @PutMapping("/{id}")
    public void updateTransaction (@PathVariable Long id, @RequestBody TransactionDTO newFinanceDetails){
        service.updateTransaction(id,newFinanceDetails);
    }

    /**
     * Elimina una transacción por su ID.
     *
     * @param id el ID de la transacción a eliminar.
     */
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id){
        service.deleteTransaction(id);
    }
}
