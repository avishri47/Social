package com.social.usermgmt.repository;

import com.social.usermgmt.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    boolean existsByMobileNumber(String mobile);
    List<User> findByNameContainingIgnoreCase(
            String username);
}