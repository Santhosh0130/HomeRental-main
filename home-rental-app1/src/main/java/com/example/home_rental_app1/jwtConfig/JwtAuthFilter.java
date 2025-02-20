package com.example.home_rental_app1.jwtConfig;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtill jwtUtill;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException,ServletException {


        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    String username = jwtUtill.extractUsername(token);
                    if (jwtUtill.validateToken(token, username)) {
                        // System.out.println("Checking Token from Cookie. Token: "+token+" Username: "+username);
                        SecurityContextHolder.getContext().setAuthentication(jwtUtill.getAuthentication(token));
                        // System.out.println("Token is valid "+jwtUtill.validateToken(token, username)+" "+SecurityContextHolder.getContext().toString());
                        break; // Token is valid, no need to process further
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }
    
}
