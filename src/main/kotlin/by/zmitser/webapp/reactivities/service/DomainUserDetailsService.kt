package by.zmitser.webapp.reactivities.service

import by.zmitser.webapp.reactivities.domain.User
import by.zmitser.webapp.reactivities.repository.UserRepository
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.kotlin.core.publisher.toMono
import java.util.*

@Service("reactiveUserDetailsService")
class DomainUserDetailsService(private val userRepository: UserRepository) : ReactiveUserDetailsService {

    override fun findByUsername(username: String?): Mono<UserDetails> {
        return userRepository.findOneByEmailIgnoreCase(username)
            .switchIfEmpty(UsernameNotFoundException("User with email $username was not found in the database").toMono())
            .map { createSpringSecurityUser(it) }
    }

    private fun createSpringSecurityUser(user: User): org.springframework.security.core.userdetails.User? {
        val grantedAuthorities: List<GrantedAuthority> = user.authorities.map { SimpleGrantedAuthority(it.name) }
        return org.springframework.security.core.userdetails.User(user.username, user.password, grantedAuthorities)
    }
}