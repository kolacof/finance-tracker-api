package com.FinanceTracker.api.entity;

import jakarta.persistence.*;
import jakarta.transaction.Transaction;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(name = "categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name= "CATE_ID")
    private Long id;
    @Column(name= "CATE_NAME")
    private String name;
    @Column(name= "CATE_DESCRIPTION")
    private String description;

    public CategoryEntity() {
    }

    public CategoryEntity(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
