package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Enums.ListingStatus;
import com.fyp.auction_app.models.Item;
import org.springframework.data.jpa.domain.Specification;

public class ItemSpecification {

    public static Specification<Item> containsKeywordAndIsListed(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.and(
                criteriaBuilder.like(root.get("itemTitle"), "%" + keyword + "%"),
                criteriaBuilder.equal(root.get("status"), ListingStatus.LISTED)
        );
    }
}
