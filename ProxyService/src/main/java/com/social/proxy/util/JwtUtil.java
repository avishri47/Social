package com.social.proxy.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
public class JwtUtil {

    private final Key key;
    private final String issuer;

    public JwtUtil(String secret, String issuer) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.issuer = issuer;
    }

    public Claims validateToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // 🔍 Expiry check (extra safety, jjwt already checks this)
            if (claims.getExpiration().before(new Date())) {
                throw new JwtException("Token expired");
            }

            // 🔍 Issuer validation (recommended)
            if (issuer != null && !issuer.equals(claims.getIssuer())) {
                throw new JwtException("Invalid issuer");
            }

            return claims;

        } catch (ExpiredJwtException e) {
            throw new JwtException("Token expired", e);
        } catch (UnsupportedJwtException e) {
            throw new JwtException("Unsupported JWT", e);
        } catch (MalformedJwtException e) {
            throw new JwtException("Malformed JWT", e);
        } catch (SecurityException | IllegalArgumentException e) {
            throw new JwtException("Invalid token", e);
        }
    }
}