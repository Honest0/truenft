package com.freighttrust.truenft.core.controller

import com.freighttrust.truenft.core.controller.model.ChangeControllerParameters
import com.freighttrust.truenft.core.controller.model.SetMasterParameters
import com.freighttrust.truenft.core.controller.model.SetTargetParameters
import io.swagger.v3.oas.annotations.Operation
import javax.annotation.Generated
import javax.ws.rs.Consumes
import javax.ws.rs.GET
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@Generated
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
interface ControllerResource {

    @get:Path("events")
    val events: ControllerEvents

    @POST
    @Path("SetTarget")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the SetTarget method")
    fun setTarget(setTargetParameters: SetTargetParameters): org.web3j.openapi.core.models.TransactionReceiptModel

    @POST
    @Path("SetMaster")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the SetMaster method")
    fun setMaster(setMasterParameters: SetMasterParameters): org.web3j.openapi.core.models.TransactionReceiptModel

    @POST
    @Path("ChangeController")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the ChangeController method")
    fun changeController(changeControllerParameters: ChangeControllerParameters): org.web3j.openapi.core.models.TransactionReceiptModel

    @GET
    @Path("Pause")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the Pause method")
    fun pause(): org.web3j.openapi.core.models.TransactionReceiptModel

    @GET
    @Path("App")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the App method")
    fun app(): org.web3j.openapi.core.models.ResultModel<kotlin.String>

    @GET
    @Path("Admin")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(tags = ["Controller Methods"], summary = "Execute the Admin method")
    fun admin(): org.web3j.openapi.core.models.ResultModel<kotlin.String>
}
