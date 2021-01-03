package by.zmitser.webapp.reactivities.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.zalando.problem.ProblemModule
import org.zalando.problem.spring.webflux.advice.security.SecurityProblemSupport

@Configuration
class JacksonConfiguration {

    @Bean
    fun problemModule() = ProblemModule()
}