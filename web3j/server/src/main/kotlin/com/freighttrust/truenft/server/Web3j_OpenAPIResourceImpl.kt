package com.freighttrust.truenft.server

import com.freighttrust.truenft.core.Web3j_OpenAPIResource
import com.freighttrust.truenft.server.controller.ControllerLifecycleImpl
import javax.annotation.Generated
import org.glassfish.jersey.server.ExtendedUriInfo
import org.web3j.openapi.server.SubResourceImpl
import org.web3j.openapi.server.config.ContractAddresses
import org.web3j.protocol.Web3j
import org.web3j.tx.TransactionManager
import org.web3j.tx.gas.ContractGasProvider

@Generated
class Web3j_OpenAPIResourceImpl(
    web3j: Web3j,
    transactionManager: TransactionManager,
    defaultGasProvider: ContractGasProvider,
    contractAddresses: ContractAddresses,
    uriInfo: ExtendedUriInfo
) : Web3j_OpenAPIResource, SubResourceImpl(uriInfo) {

    override val controller = ControllerLifecycleImpl(
        web3j,
        transactionManager,
        defaultGasProvider,
        contractAddresses["Controller"],
        uriInfo
    )
}
