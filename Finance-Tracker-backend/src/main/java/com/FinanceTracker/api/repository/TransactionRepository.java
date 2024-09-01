package com.FinanceTracker.api.repository;

import com.FinanceTracker.api.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity,Long> {

    @Query("SELECT f FROM TransactionEntity f INNER JOIN FETCH f.category c")
    List<TransactionEntity> ListAllTransactions();

}
