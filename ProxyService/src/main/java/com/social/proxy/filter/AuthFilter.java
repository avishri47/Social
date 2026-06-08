package com.social.proxy.filter;

import com.social.proxy.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter implements GlobalFilter, Ordered {
    private final JwtUtil jwtUtil=new JwtUtil("a8f3c2d91b7e4f6a9c1d2e3f4a5b6c7d8e9f00112233445566778899aabbccdd","social");
    ;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                             GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();

        // ✅ Allow public endpoints
        if (path.contains("/signup") || path.contains("/signin")) {
            return chain.filter(exchange);
        }
        String token = null;


        String authHeader =
                exchange.getRequest()
                        .getHeaders()
                        .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }


        if (token == null) {HttpCookie cookie = exchange.getRequest()
                    .getCookies()
                    .getFirst("token");

            if (cookie != null) {
                token = cookie.getValue();
            }
        }

        if (token == null) {
            return unauthorized(exchange);
        }
        if(path.contains("/auth/me")){

        }
        try {
            Claims claims = jwtUtil.validateToken(token);

            // ✅ Add user info to downstream request headers
            ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(r -> r.headers(headers -> {
                        headers.add("X-USER-ID", claims.getSubject());
                        headers.add("X-ROLES", String.valueOf(claims.get("roles")));
                    }))
                    .build();

            return chain.filter(mutatedExchange);

        } catch (Exception e) {
            return unauthorized(exchange);
        }
    }

    @Override
    public int getOrder() {
        return -100;
    }
    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}