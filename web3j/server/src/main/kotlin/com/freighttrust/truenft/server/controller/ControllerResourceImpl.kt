package com.freighttrust.truenft.server.controller

import com.freighttrust.truenft.core.controller.ControllerEvents
import com.freighttrust.truenft.core.controller.ControllerResource
import com.freighttrust.truenft.core.controller.model.ChangeControllerParameters
import com.freighttrust.truenft.core.controller.model.SetMasterParameters
import com.freighttrust.truenft.core.controller.model.SetTargetParameters
import com.freighttrust.truenft.wrappers.Controller
import kotlin.String
import org.glassfish.jersey.server.ExtendedUriInfo
import org.web3j.openapi.core.models.ResultModel
import org.web3j.openapi.core.models.TransactionReceiptModel

class ControllerResourceImpl(
    private val controller: Controller,
    private val uriInfo: ExtendedUriInfo
) : ControllerResource {
    override val events: ControllerEvents = ControllerEventsImpl(controller, uriInfo)

    override fun setTarget(setTargetParameters: SetTargetParameters): TransactionReceiptModel =
        TransactionReceiptModel(
            controller.setTarget(
                setTargetParameters.functionSel, setTargetParameters.newTarget
            ).send()
        )
    override fun setMaster(setMasterParameters: SetMasterParameters): TransactionReceiptModel =
        TransactionReceiptModel(
            controller.setMaster(
                setMasterParameters.newMaster
            ).send()
        )
    override fun changeController(changeControllerParameters: ChangeControllerParameters):
    TransactionReceiptModel = TransactionReceiptModel(
        controller.changeController(
            changeControllerParameters.newController
        ).send()
    )
    override fun pause(): TransactionReceiptModel = TransactionReceiptModel(controller.pause().send())
    override fun app(): ResultModel<String> =
        org.web3j.openapi.core.models.ResultModel(controller.app().send())
    override fun admin(): ResultModel<String> =
        org.web3j.openapi.core.models.ResultModel(controller.admin().send())
}
