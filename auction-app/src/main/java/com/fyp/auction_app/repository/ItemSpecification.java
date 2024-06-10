package com.fyp.auction_app.repository;

import com.fyp.auction_app.models.Item;
import org.springframework.data.jpa.domain.Specification;

public class ItemSpecification {

    public static Specification<Item> containsKeyword(String keyword) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.or(
                criteriaBuilder.like(root.get("title"), "%" + keyword + "%")
        );
    }
}
