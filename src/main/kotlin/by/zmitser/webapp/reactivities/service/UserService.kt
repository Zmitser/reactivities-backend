package by.zmitser.webapp.reactivities.service

import by.zmitser.webapp.reactivities.domain.Authority
import by.zmitser.webapp.reactivities.domain.User
import by.zmitser.webapp.reactivities.repository.AuthorityRepository
import by.zmitser.webapp.reactivities.repository.UserRepository
import by.zmitser.webapp.reactivities.security.getCurrentUserLogin
import by.zmitser.webapp.reactivities.web.controller.activity.exception.EmailAlreadyUsedException
import by.zmitser.webapp.reactivities.web.controller.activity.exception.UsernameAlreadyUsedException
import by.zmitser.webapp.reactivities.web.controller.user.command.RegisterCommand
import org.springframework.security.core.context.ReactiveSecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import reactor.core.scheduler.Schedulers
import reactor.kotlin.core.publisher.toMono

@Service
class UserService(
        val userRepository: UserRepository,
        val passwordEncoder: PasswordEncoder,
        val authorityRepository: AuthorityRepository
) {

    fun register(registerCommand: RegisterCommand): Mono<User> {
        return userRepository.findOneByUsername(registerCommand.username?.toLowerCase())
                .flatMap { UsernameAlreadyUsedException().toMono<UsernameAlreadyUsedException>() }
                .then(userRepository.findOneByEmailIgnoreCase(registerCommand.email))
                .flatMap { EmailAlreadyUsedException().toMono<EmailAlreadyUsedException>() }
                .publishOn(Schedulers.boundedElastic())
                .then(Mono.fromCallable {
                    val (username, email) = registerCommand
                    val encodedPassword = passwordEncoder.encode(registerCommand.password)
                    User(username, encodedPassword, "", email)
                })
                .flatMap { user ->
                    authorityRepository.findById("ROLE_USER")
                            .doOnNext { user.authorities.add(it) }
                            .then(userRepository.save(user))
                }
    }

    fun getCurrentUser():Mono<User> = getCurrentUserLogin().flatMap { userRepository.findOneByUsername(it) }
}