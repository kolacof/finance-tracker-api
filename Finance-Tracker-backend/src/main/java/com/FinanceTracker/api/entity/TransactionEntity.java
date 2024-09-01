package com.FinanceTracker.api.entity;

import jakarta.persistence.*;

import lombok.Data;
import java.util.Date;

@Data
@Entity
@Table(name= "transaction")
public class TransactionEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "TRAN_ID")
    private Long id;

    @Column(name= "TRAN_TYPE")
    private String type;

    @Column(name= "TRAN_AMOUNT")
    private double amount;

    @ManyToOne
    @JoinColumn(name = "CATE_ID")
    private CategoryEntity category;

    //private String categoryName;

    @Column(name= "TRAN_DESCRIPTION")
    private String description;


    @Temporal(TemporalType.DATE)
    @Column(name= "TRAN_DATE")
    private Date date;

    public TransactionEntity() {
    }

    //DTO A ENTIDAD
    public TransactionEntity(String type, double amount, Date date, CategoryEntity category, String description) {
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.category = category;
        this.description = description;
    }
}
