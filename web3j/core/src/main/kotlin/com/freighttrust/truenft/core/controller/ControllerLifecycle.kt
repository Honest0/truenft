package com.freighttrust.truenft.core.controller

import com.freighttrust.truenft.core.controller.model.ControllerDeployParameters
import io.swagger.v3.oas.annotations.Operation
import javax.annotation.Generated
import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import org.web3j.openapi.core.CONTRACT_ADDRESS
import org.web3j.openapi.core.CONTRACT_ADDRESS_PATH
import org.web3j.protocol.core.methods.response.TransactionReceipt

@Generated
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
interface ControllerLifecycle {

    @POST
    @Operation(
        tags = ["Controller Methods"],
        summary = "Deploys the Controller contract"
    )
    fun deploy(parameters: ControllerDeployParameters): TransactionReceipt

    @Path(CONTRACT_ADDRESS_PATH)
    @Operation(
        tags = ["Controller Methods"],
        summary = "Loads the Controller contract"
    )
    fun load(
        @PathParam(CONTRACT_ADDRESS)
        contractAddress: String
    ): ControllerResource

    @Path("")
    @Operation(
        tags = ["Controller Methods"],
        summary = "Loads the Controller contract with predefined address"
    )
    fun load(): ControllerResource
}
