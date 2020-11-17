package by.zmitser.webapp.reactivities.web.controller.activity.exception

import org.zalando.problem.AbstractThrowableProblem
import org.zalando.problem.Exceptional
import org.zalando.problem.Status
import java.net.URI

class RestException(val code: Status, title:String,  detail: String) : AbstractThrowableProblem(
        TYPE,
        title,
        code,
        detail
) {

    companion object {
        private val TYPE: URI = URI.create("about:blank")
    }

    override fun getCause(): Exceptional? {
        return null
    }
}