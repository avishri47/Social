package com.social.proxy.filter;

import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class ErrorForwardingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {

        return chain.filter(exchange)
            .onErrorResume(WebClientResponseException.class, ex -> {

                exchange.getResponse().setStatusCode(ex.getStatusCode());

                byte[] bytes = ex.getResponseBodyAsByteArray();

                return exchange.getResponse()
                        .writeWith(Mono.just(exchange.getResponse()
                                .bufferFactory()
                                .wrap(bytes)));
            });
    }

    @Override
    public int getOrder() {
        return -2;
    }
}