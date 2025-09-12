package com.josephhieu.springbootlibrary.dao;

import com.josephhieu.springbootlibrary.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
