package com.FinanceTracker.api.dto;

import com.FinanceTracker.api.entity.CategoryEntity;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class TransactionDTO implements Serializable {
    private Long id;
    private String type;
    private double amount;
    private Long categoryId;
    private String categoryName;
    private String description;
    private Date date;

    public TransactionDTO() {
    }

    //INPUT DTO
    public TransactionDTO(Long id, String type, double amount, Long categoryId, Date date, String description) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.categoryId = categoryId;
        this.date = date;
        this.description = description;
    }

    //OUTPUT DTO
    public TransactionDTO(Long id, String type, double amount, String categoryName, String description, Date date) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.categoryName = categoryName;
        this.description = description;
        this.date = date;
    }
}
