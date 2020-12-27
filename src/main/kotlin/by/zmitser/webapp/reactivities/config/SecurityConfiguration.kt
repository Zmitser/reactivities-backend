package by.zmitser.webapp.reactivities.config

import by.zmitser.webapp.reactivities.security.jwt.JWTFilter
import by.zmitser.webapp.reactivities.security.jwt.TokenProvider
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.security.authentication.ReactiveAuthenticationManager
import org.springframework.security.authentication.UserDetailsRepositoryReactiveAuthenticationManager
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.SecurityWebFiltersOrder
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.server.SecurityWebFilterChain
import org.zalando.problem.spring.webflux.advice.security.SecurityProblemSupport

@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
@Configuration
@Import(SecurityProblemSupport::class)
class SecurityConfiguration(
        val userDetailsService: ReactiveUserDetailsService,
        val tokenProvider: TokenProvider,
        val securityProblemSupport: SecurityProblemSupport

) {

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()


    @Bean
    fun reactiveAuthenticationManager(passwordEncoder: PasswordEncoder): ReactiveAuthenticationManager {
        val authenticationManager = UserDetailsRepositoryReactiveAuthenticationManager(userDetailsService)
        authenticationManager.setPasswordEncoder(passwordEncoder)
        return authenticationManager
    }

    @Bean
    fun springSecurityFilterChain(http: ServerHttpSecurity, authenticationManager: ReactiveAuthenticationManager): SecurityWebFilterChain {
        http.csrf()
                .disable()
                .addFilterAt(JWTFilter(tokenProvider), SecurityWebFiltersOrder.HTTP_BASIC)
                .authenticationManager(authenticationManager)
                .exceptionHandling()
                .accessDeniedHandler(securityProblemSupport)
                .authenticationEntryPoint(securityProblemSupport)
                .and()
                .authorizeExchange()
                .pathMatchers("/").permitAll()
                .pathMatchers("/api/v1/users/register").permitAll()
                .pathMatchers("/api/v1/users/authenticate").permitAll()
                .pathMatchers("/api/v1/**").authenticated()
        return http.build()

    }

}




