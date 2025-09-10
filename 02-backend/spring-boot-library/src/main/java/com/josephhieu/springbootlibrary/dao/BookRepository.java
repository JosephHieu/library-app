package com.josephhieu.springbootlibrary.dao;

import com.josephhieu.springbootlibrary.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}
