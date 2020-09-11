package com.freighttrust.truenft.core.controller.model

import com.fasterxml.jackson.annotation.JsonProperty
import kotlin.String

data class ControllerDeployParameters(
  @JsonProperty(value = "bolApp")
  val bolApp: String,
  @JsonProperty(value = "bolAdmin")
  val bolAdmin: String
)
