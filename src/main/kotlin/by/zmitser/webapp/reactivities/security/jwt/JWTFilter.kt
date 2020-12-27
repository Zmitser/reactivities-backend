package by.zmitser.webapp.reactivities.security.jwt

import org.springframework.http.server.reactive.ServerHttpRequest
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.web.server.ServerWebExchange
import org.springframework.web.server.WebFilter
import org.springframework.web.server.WebFilterChain
import reactor.core.publisher.Mono

class JWTFilter(private val tokenProvider: TokenProvider) : WebFilter {

    override fun filter(exchange: ServerWebExchange, chain: WebFilterChain): Mono<Void> {
        val jwt = resolveToken(exchange.request)
        if (tokenProvider.validateToken(jwt)) {
            val authentication = tokenProvider.getAuthentication(jwt)
            return chain.filter(exchange).subscriberContext(ReactiveSecurityContextHolder.withAuthentication(authentication))
        }
        return chain.filter(exchange)
    }

    private fun resolveToken(request: ServerHttpRequest): String? {
        return request.headers.getFirst("Authorization").apply {
            if (!this.isNullOrBlank() && this.startsWith("Bearer ")) {
                return this.substring(7)
            }
        }
    }
}