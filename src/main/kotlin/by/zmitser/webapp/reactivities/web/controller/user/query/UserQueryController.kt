package by.zmitser.webapp.reactivities.web.controller.user.query

import by.zmitser.webapp.reactivities.domain.User
import by.zmitser.webapp.reactivities.security.getCurrentUserLogin
import by.zmitser.webapp.reactivities.security.jwt.TokenProvider
import by.zmitser.webapp.reactivities.service.UserService
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Mono
import javax.validation.Valid

@RestController
@RequestMapping("/api/v1/users")
class UserQueryController(
    private val authenticationManager: ReactiveAuthenticationManager,
    private val tokenProvider: TokenProvider,
    private val userService: UserService
) {

    @PostMapping("/authenticate")
    fun authorize(@RequestBody @Valid loginQuery: Mono<LoginQuery>): Mono<ResponseEntity<LoginResult>> {
        return loginQuery.flatMap {
            authenticationManager.authenticate(UsernamePasswordAuthenticationToken(it.email, it.password))
                .map {
                    val token = tokenProvider.createToken(it)
                    val httpHeaders = HttpHeaders()
                    httpHeaders.add("Authorization", "Bearer $token")
                    ResponseEntity.ok(LoginResult(it.name, token))
                }
        }
    }

    @GetMapping("/current")
    fun current(): Mono<User> = userService.getCurrentUser()

}