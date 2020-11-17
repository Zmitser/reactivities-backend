package by.zmitser.webapp.reactivities.web.controller.activity.exception



import org.axonframework.common.AxonException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.zalando.problem.spring.webflux.advice.ProblemHandling

@RestControllerAdvice
class GlobalExceptionHandler : ProblemHandling