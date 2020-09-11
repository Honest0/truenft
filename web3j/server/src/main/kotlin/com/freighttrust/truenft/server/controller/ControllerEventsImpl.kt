package com.freighttrust.truenft.server.controller

import com.freighttrust.truenft.core.controller.ControllerEvents
import com.freighttrust.truenft.wrappers.Controller
import javax.annotation.Generated
import org.glassfish.jersey.server.ExtendedUriInfo
import org.web3j.openapi.server.SubResourceImpl

@Generated
class ControllerEventsImpl(
    private val controller: Controller,
    uriInfo: ExtendedUriInfo
) : ControllerEvents, SubResourceImpl(uriInfo)
