package com.freighttrust.truenft.server

import com.freighttrust.truenft.core.Web3j_OpenAPIApi
import javax.annotation.Generated
import javax.inject.Inject
import javax.ws.rs.core.Context
import org.glassfish.jersey.server.ExtendedUriInfo
import org.web3j.crypto.Credentials
import org.web3j.openapi.server.config.ContractAddresses
import org.web3j.protocol.Web3j
import org.web3j.tx.RawTransactionManager
import org.web3j.tx.gas.ContractGasProvider

@Generated
class Web3j_OpenAPIApiImpl @Inject constructor(
    web3j: Web3j,
    credentials: Credentials,
    gasProvider: ContractGasProvider,
    contractAddresses: ContractAddresses,
    @Context uriInfo: ExtendedUriInfo
) : Web3j_OpenAPIApi {

    override val contracts = Web3j_OpenAPIResourceImpl(
        web3j, RawTransactionManager(web3j, credentials), gasProvider, contractAddresses, uriInfo
    )
}
