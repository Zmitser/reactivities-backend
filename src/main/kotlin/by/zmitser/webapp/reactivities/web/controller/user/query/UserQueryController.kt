package by.zmitser.webapp.reactivities.web.controller.user.query

import by.zmitser.webapp.reactivities.security.jwt.TokenProvider
import by.zmitser.webapp.reactivities.web.controller.user.query.LoginQuery
import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Mono
import javax.validation.Valid

@RestController
@RequestMapping("/api/v1/users")
class UserQueryController(
    private val authenticationManager: ReactiveAuthenticationManager,
    private val tokenProvider: TokenProvider
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
}