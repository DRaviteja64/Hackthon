package com.Self.Security6464.Repository;

import com.Self.Security6464.Entity.UpcomingActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UpcomingActivityRepository extends JpaRepository<UpcomingActivity, Long> {
    List<UpcomingActivity> findTop5ByUserIdOrderByIdDesc(Long userId);
}