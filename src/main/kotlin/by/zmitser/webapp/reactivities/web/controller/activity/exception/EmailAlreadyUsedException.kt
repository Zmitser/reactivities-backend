package by.zmitser.webapp.reactivities.web.controller.activity.exception

import org.zalando.problem.AbstractThrowableProblem
import org.zalando.problem.Exceptional
import org.zalando.problem.Status
import java.net.URI

class EmailAlreadyUsedException : AbstractThrowableProblem(URI.create("http://localhost:8081/problem/email-already-used"), "Email Exists", Status.BAD_REQUEST, "Email is already in use!") {
    override fun getCause(): Exceptional? = null
}
