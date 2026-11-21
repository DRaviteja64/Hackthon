package com.Self.Security6464.Repository;

import com.Self.Security6464.Entity.RecentActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RecentActivityRepository extends JpaRepository<RecentActivity, Long> {
    List<RecentActivity> findTop5ByUserIdOrderByCreatedAtDesc(Long userId);
}