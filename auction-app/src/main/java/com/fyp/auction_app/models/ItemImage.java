package com.fyp.auction_app.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "item_image")
public class ItemImage {

    @Id
    @GeneratedValue
    private Integer id;

    private Integer itemId;

    @Lob
    @Column(name = "profile_photo", columnDefinition = "BLOB")
    private byte[] profilePhoto;
}
