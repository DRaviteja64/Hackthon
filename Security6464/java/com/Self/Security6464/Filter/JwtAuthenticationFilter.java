package com.Self.Security6464.Filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.Self.Security6464.Config.CustomUserDetailsService;
import com.Self.Security6464.Service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService customUserDetailsService) {

        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // Check Authorization Header

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        try {

            // Extract Mobile Number From JWT

            String mobile = jwtService.extractMobile(token);

            if (mobile != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                // Validate JWT Token

                if (jwtService.validateToken(token, mobile)) {

                    // Load User Details From Database

                    UserDetails userDetails =
                            customUserDetailsService.loadUserByUsername(mobile);

                    // Create Authentication Object

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    // Create Security Context

                    SecurityContext context =
                            SecurityContextHolder.createEmptyContext();

                    context.setAuthentication(authentication);

                    SecurityContextHolder.setContext(context);

                    // JWT Debug Information

                    System.out.println("========== JWT DEBUG ==========");

                    System.out.println("Request URL: " +
                            request.getRequestURI());

                    System.out.println("HTTP Method: " +
                            request.getMethod());

                    System.out.println("Mobile: " + mobile);

                    System.out.println("Username: " +
                            authentication.getName());

                    System.out.println("Authorities: " +
                            authentication.getAuthorities());

                    System.out.println("Authenticated: " +
                            authentication.isAuthenticated());

                    System.out.println("===============================");

                } else {

                    System.out.println("JWT Token Validation Failed!");

                    SecurityContextHolder.clearContext();
                }
            }

        } catch (Exception e) {

            System.out.println("========== JWT ERROR ==========");

            System.out.println("Request URL: " +
                    request.getRequestURI());

            System.out.println("Error: " + e.getMessage());

            e.printStackTrace();

            System.out.println("===============================");

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
