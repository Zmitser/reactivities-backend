package by.zmitser.webapp.reactivities

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.cloudyrock.spring.v5.EnableMongock
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.annotation.Order
import org.springframework.web.server.WebExceptionHandler
import org.zalando.problem.spring.webflux.advice.ProblemExceptionHandler
import org.zalando.problem.spring.webflux.advice.ProblemHandling


@SpringBootApplication
@EnableMongock
class ReactivitiesApplication {

    @Bean
    @Order(-2) // The handler must have precedence over WebFluxResponseStatusExceptionHandler and Spring Boot's ErrorWebExceptionHandler
    fun problemExceptionHandler(mapper: ObjectMapper, problemHandling: ProblemHandling): WebExceptionHandler? {
        return ProblemExceptionHandler(mapper, problemHandling)
    }
}

fun main(args: Array<String>) {
    runApplication<ReactivitiesApplication>(*args)
}
