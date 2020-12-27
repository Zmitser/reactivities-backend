package by.zmitser.webapp.reactivities.security.jwt

import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.jackson.io.JacksonSerializer
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*
import javax.annotation.PostConstruct

@Component
class TokenProvider(
        @Value("\${security.authentication.jwt.base64-secret}")
        var secret: String,
        @Value("\${security.authentication.jwt.expiration}")
        var expiration: Int
) {

    lateinit var key: Key

    @PostConstruct
    fun init() {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret))
    }

    fun createToken(authentication: Authentication): String? {
        return Jwts.builder()
                .setSubject(authentication.name)
                .claim("authorities", authentication.authorities.joinToString(","))
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(Date(Date().time + this.expiration))
                .serializeToJsonWith(JacksonSerializer())
                .compact()
    }


    fun getAuthentication(token: String?): Authentication? {
        val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
        val authorities = claims["authorities"].toString().split(',').map { SimpleGrantedAuthority(it) }
        val principal = User(claims.subject, "", authorities)
        return UsernamePasswordAuthenticationToken(principal, token, authorities)
    }

    fun validateToken(authToken: String?): Boolean {
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken)
            true
        } catch (e: Exception) {
            false
        }
    }
}