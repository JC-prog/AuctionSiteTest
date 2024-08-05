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
@Table(name = "user_image")
public class UserImage {

    @Id
    @GeneratedValue
    private Integer id;

    private String username;

    @Lob
    @Column(name = "profile_photo", columnDefinition = "LONGBLOB")
    private byte[] profilePhoto;

    @Lob
    @Column(name = "banner_photo", columnDefinition = "LONGBLOB")
    private byte[] bannerImage;
}
