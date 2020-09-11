package com.freighttrust.truenft.core.controller.model

import com.fasterxml.jackson.annotation.JsonProperty
import kotlin.ByteArray
import kotlin.String

data class SetTargetParameters(
  @JsonProperty(value = "functionSel")
  val functionSel: ByteArray,
  @JsonProperty(value = "newTarget")
  val newTarget: String
)
