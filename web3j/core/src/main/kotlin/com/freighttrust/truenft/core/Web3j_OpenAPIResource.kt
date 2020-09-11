package com.freighttrust.truenft.core

import com.freighttrust.truenft.core.controller.ControllerLifecycle
import javax.annotation.Generated
import javax.ws.rs.Consumes
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import org.web3j.openapi.core.SubResource

@Generated
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
interface Web3j_OpenAPIResource : SubResource {

    @get:Path("controller")
    val controller: ControllerLifecycle
}
