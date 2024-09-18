package com.ecoton.main.repository;

import com.ecoton.main.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<AppUser> findByPhoneNumber(String phone);
    Boolean existsByPhoneNumber(String phone);
    Optional<AppUser> findByEmailAndPhoneNumber(String email, String phone);
}
