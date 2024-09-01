package com.FinanceTracker.api.services;

import com.FinanceTracker.api.Exceptions.ResourceNotFoundException;
import com.FinanceTracker.api.dto.TransactionDTO;
import com.FinanceTracker.api.entity.CategoryEntity;
import com.FinanceTracker.api.entity.TransactionEntity;
import com.FinanceTracker.api.repository.CategoryRepository;
import com.FinanceTracker.api.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para manejar operaciones relacionadas con transacciones financieras.
 * Proporciona métodos para crear, listar, ver, actualizar y eliminar transacciones.
 */
@Service
public class TransactionService {

    @Autowired
    TransactionRepository repository;
    @Autowired
    CategoryRepository categoryRepository;

    /**
     * Crea una nueva transacción y la guarda en la base de datos.
     *
     * @param transactionDTO el objeto TransactionDTO que contiene los detalles de la transacción a crear.
     */
    public void createTransaction(TransactionDTO transactionDTO){
        TransactionEntity entity= this.dtoToEntity(transactionDTO);
        System.out.println(entity);
        repository.save(entity);
    }


    /**
     * Recupera una lista de todas las transacciones.
     *
     * @return una lista de objetos TransactionDTO que representan todas las transacciones.
     */
    public List<TransactionDTO> listTransaction(){
        List<TransactionEntity> entity = repository.ListAllTransactions();
        return entity.stream().map(this::entityToDTO).collect(Collectors.toList());
    }


    /**
     * Recupera los detalles de una transacción específica por su ID.
     *
     * @param id el ID de la transacción a recuperar.
     * @return el objeto TransactionDTO que contiene los detalles de la transacción especificada.
     * @throws ResourceNotFoundException si no se encuentra la transacción con el ID proporcionado.
     */
    public TransactionDTO showTransaction(Long id){
        TransactionEntity entity = repository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Registro no encontrado"));
        return this.entityToDTO(entity);
    }

    /**
     * Actualiza una transacción existente con nuevos detalles.
     *
     * @param id el ID de la transacción a actualizar.
     * @param dto el objeto TransactionDTO que contiene los nuevos detalles para la transacción.
     * @throws ResourceNotFoundException si no se encuentra la transacción con el ID proporcionado.
     */
    public void updateTransaction(Long id, TransactionDTO dto){
        System.out.println("ID NUMERO:"+ id);
        TransactionEntity newFinanceDetails = this.dtoToEntity(dto);
        System.out.println("REGISTRO A GUARDAR EN LA BD ANTES DE EDITAR"+newFinanceDetails);
        TransactionEntity oldFinanceDetails = repository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Registro no encontrado"));

        oldFinanceDetails.setType(newFinanceDetails.getType());
        oldFinanceDetails.setAmount(newFinanceDetails.getAmount());
        oldFinanceDetails.setCategory(newFinanceDetails.getCategory());
        oldFinanceDetails.setDescription(newFinanceDetails.getDescription());
        oldFinanceDetails.setDate(newFinanceDetails.getDate());

        repository.save(oldFinanceDetails);
    }

    /**
     * Elimina una transacción existente por su ID.
     *
     * @param id el ID de la transacción a eliminar.
     * @throws ResourceNotFoundException si no se encuentra la transacción con el ID proporcionado.
     */
    public void deleteTransaction(Long id){
        TransactionEntity finance = repository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Registro no encontrado"));
        repository.delete(finance);
    }


    /**
     * Convierte un objeto TransactionDTO en una entidad TransactionEntity.
     *
     * @param dto el objeto TransactionDTO que se va a convertir.
     * @return una instancia de TransactionEntity.
     * @throws RuntimeException si no se encuentra la categoría con el ID proporcionado en el DTO.
     */
    public TransactionEntity dtoToEntity(TransactionDTO dto){
        CategoryEntity category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(()-> new RuntimeException("Categoria no encontrada"));
        return new TransactionEntity(dto.getType(),dto.getAmount(),dto.getDate(), category, dto.getDescription());
    }

    /**
     * Convierte una entidad TransactionEntity en un objeto TransactionDTO.
     *
     * @param entity la entidad TransactionEntity que se va a convertir.
     * @return una instancia de TransactionDTO.
     */
    public TransactionDTO entityToDTO(TransactionEntity entity){
        return new TransactionDTO(entity.getId(), entity.getType(), entity.getAmount(), entity.getCategory().getName(), entity.getDescription(), entity.getDate());
    }
}
