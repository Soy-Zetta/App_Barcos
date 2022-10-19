package com.g8.jpa.repository;

import com.g8.jpa.entity.User;
import java.util.List;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author CALM
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    public List<User> findByGender(String gender);
    
    @Query(value = "SELECT u FROM User u WHERE u.gender =?1")
    public List<User> findByGenderJpql(String gender);
    
    @Query(value = "SELECT * FROM User u WHERE u.gender =?1",nativeQuery = true)
    public List<User> findByGenderNative(String gender);

    public SecurityProperties.User save(SecurityProperties.User user);
}