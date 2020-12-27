package by.zmitser.webapp.reactivities.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.ReactiveSecurityContextHolder.getContext
import org.springframework.security.core.userdetails.UserDetails
import reactor.core.publisher.Mono

/**
 * Get the login of the current user.
 *
 * @return the login of the current user.
 */

fun getCurrentUserLogin(): Mono<String> = getContext().map { extractPrincipal(it.authentication) }

private fun extractPrincipal(authentication: Authentication): String? {
    return when (authentication.principal) {
        is UserDetails -> (authentication.principal as UserDetails).username
        is String -> authentication.principal as String
        else -> null
    }
}

/**
 * Get the JWT of the current user.
 *
 * @return the JWT of the current user.
 */
fun getCurrentUserToken(): Mono<String?> {
    return getContext()
            .map { it.authentication }
            .filter { it.credentials is String }
            .map { it.credentials as String }
}