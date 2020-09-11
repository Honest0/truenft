package com.freighttrust.truenft.core.controller.model

import com.fasterxml.jackson.annotation.JsonProperty
import kotlin.String

data class ChangeControllerParameters(
  @JsonProperty(value = "newController")
  val newController: String
)
