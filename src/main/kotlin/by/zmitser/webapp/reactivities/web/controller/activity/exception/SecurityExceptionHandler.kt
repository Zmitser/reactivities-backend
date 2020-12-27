package by.zmitser.webapp.reactivities.web.controller.activity.exception

import org.springframework.web.bind.annotation.RestControllerAdvice
import org.zalando.problem.spring.webflux.advice.ProblemHandling
import org.zalando.problem.spring.webflux.advice.security.SecurityAdviceTrait


@RestControllerAdvice
class SecurityExceptionHandler : SecurityAdviceTrait, ProblemHandling