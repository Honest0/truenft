package com.freighttrust.truenft.core

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Contact
import io.swagger.v3.oas.annotations.info.Info
import io.swagger.v3.oas.annotations.tags.Tag
import javax.annotation.Generated
import javax.ws.rs.Consumes
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType
import org.web3j.openapi.core.Web3jOpenApi

@Path("/Web3j-OpenAPI")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@OpenAPIDefinition(
    info = Info(
        title = "Web3j OpenApi",
        version = "0.0.6",
        contact = Contact(
            name = "Web3 Labs",
            email = "hi@web3labs.com",
            url = "http://web3labs.com"
        )
    ),
    tags = [
        Tag(name = "default", description = "Lists existing contracts and events"),
        Tag(name = "Controller Methods", description = "List Controller method&#39;s calls"),
        Tag(name = "Controller Events", description = "List Controller event&#39;s calls")
    ]
)
@Generated
interface Web3j_OpenAPIApi : Web3jOpenApi {

    @get:Path("contracts")
    override val contracts: Web3j_OpenAPIResource
}
