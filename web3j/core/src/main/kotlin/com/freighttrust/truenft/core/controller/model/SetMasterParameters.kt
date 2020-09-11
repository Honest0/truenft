package com.freighttrust.truenft.core.controller.model

import com.fasterxml.jackson.annotation.JsonProperty
import kotlin.String

data class SetMasterParameters(
  @JsonProperty(value = "newMaster")
  val newMaster: String
)
