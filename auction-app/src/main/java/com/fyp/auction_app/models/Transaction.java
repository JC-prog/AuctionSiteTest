package com.fyp.auction_app.models;

import com.fyp.auction_app.models.Enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer itemId;

    private String itemTitle;

    private String buyerName;

    private String sellerName;

    private Double saleAmount;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    private Date transactionTimestamp;

    private Boolean is_active;
}
