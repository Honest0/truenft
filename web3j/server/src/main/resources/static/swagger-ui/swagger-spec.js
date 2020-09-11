window.swaggerSpec={
  "openapi" : "3.0.1",
  "info" : {
    "title" : "Web3j OpenApi",
    "contact" : {
      "name" : "Web3 Labs",
      "url" : "http://web3labs.com",
      "email" : "hi@web3labs.com"
    },
    "version" : "0.0.6"
  },
  "tags" : [ {
    "name" : "default",
    "description" : "Lists existing contracts and events"
  }, {
    "name" : "Controller Methods",
    "description" : "List Controller method&#39;s calls"
  }, {
    "name" : "Controller Events",
    "description" : "List Controller event&#39;s calls"
  } ],
  "paths" : {
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/SetTarget" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the SetTarget method",
        "operationId" : "setTarget",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/SetTargetParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/App" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the App method",
        "operationId" : "app",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResultModelString"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/ChangeController" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the ChangeController method",
        "operationId" : "changeController",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ChangeControllerParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/Pause" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the Pause method",
        "operationId" : "pause",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/SetMaster" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the SetMaster method",
        "operationId" : "setMaster",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/SetMasterParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/Admin" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the Admin method",
        "operationId" : "admin",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResultModelString"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/{contractAddress}/events" : {
      "get" : {
        "operationId" : "findAll",
        "parameters" : [ {
          "name" : "contractAddress",
          "in" : "path",
          "required" : true,
          "schema" : {
            "type" : "string"
          }
        } ],
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/SetTarget" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the SetTarget method",
        "operationId" : "setTarget_1",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/SetTargetParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/App" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the App method",
        "operationId" : "app_1",
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResultModelString"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/ChangeController" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the ChangeController method",
        "operationId" : "changeController_1",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ChangeControllerParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/Pause" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the Pause method",
        "operationId" : "pause_1",
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/SetMaster" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the SetMaster method",
        "operationId" : "setMaster_1",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/SetMasterParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceiptModel"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/Admin" : {
      "get" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Execute the Admin method",
        "operationId" : "admin_1",
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/ResultModelString"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller/events" : {
      "get" : {
        "operationId" : "findAll_1",
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts/controller" : {
      "post" : {
        "tags" : [ "Controller Methods" ],
        "summary" : "Deploys the Controller contract",
        "operationId" : "deploy",
        "requestBody" : {
          "content" : {
            "application/json" : {
              "schema" : {
                "$ref" : "#/components/schemas/ControllerDeployParameters"
              }
            }
          }
        },
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "$ref" : "#/components/schemas/TransactionReceipt"
                }
              }
            }
          }
        }
      }
    },
    "/Web3j-OpenAPI/contracts" : {
      "get" : {
        "operationId" : "findAll_3",
        "responses" : {
          "default" : {
            "description" : "default response",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items" : {
                    "type" : "string"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components" : {
    "schemas" : {
      "LogsModel" : {
        "type" : "object",
        "properties" : {
          "removed" : {
            "type" : "boolean"
          },
          "logIndex" : {
            "type" : "integer"
          },
          "transactionIndex" : {
            "type" : "integer"
          },
          "transactionHash" : {
            "type" : "string"
          },
          "blockHash" : {
            "type" : "string"
          },
          "blockNumber" : {
            "type" : "integer"
          },
          "address" : {
            "type" : "string"
          },
          "data" : {
            "type" : "string"
          },
          "type" : {
            "type" : "string"
          },
          "topics" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            }
          }
        }
      },
      "TransactionReceiptModel" : {
        "type" : "object",
        "properties" : {
          "transactionHash" : {
            "type" : "string"
          },
          "transactionIndex" : {
            "type" : "integer"
          },
          "blockHash" : {
            "type" : "string"
          },
          "blockNumber" : {
            "type" : "integer"
          },
          "cumulativeGasUsed" : {
            "type" : "integer"
          },
          "gasUsed" : {
            "type" : "integer"
          },
          "contractAddress" : {
            "type" : "string"
          },
          "root" : {
            "type" : "string"
          },
          "status" : {
            "type" : "string"
          },
          "from" : {
            "type" : "string"
          },
          "to" : {
            "type" : "string"
          },
          "logs" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/LogsModel"
            }
          },
          "logsBloom" : {
            "type" : "string"
          },
          "revertReason" : {
            "type" : "string"
          }
        }
      },
      "SetTargetParameters" : {
        "type" : "object",
        "properties" : {
          "functionSel" : {
            "type" : "array",
            "items" : {
              "type" : "string",
              "format" : "byte"
            }
          },
          "newTarget" : {
            "type" : "string"
          }
        }
      },
      "ResultModelString" : {
        "type" : "object",
        "properties" : {
          "result" : {
            "type" : "string"
          }
        }
      },
      "ChangeControllerParameters" : {
        "type" : "object",
        "properties" : {
          "newController" : {
            "type" : "string"
          }
        }
      },
      "SetMasterParameters" : {
        "type" : "object",
        "properties" : {
          "newMaster" : {
            "type" : "string"
          }
        }
      },
      "Log" : {
        "type" : "object",
        "properties" : {
          "removed" : {
            "type" : "boolean"
          },
          "logIndex" : {
            "type" : "integer"
          },
          "transactionIndex" : {
            "type" : "integer"
          },
          "transactionHash" : {
            "type" : "string"
          },
          "blockHash" : {
            "type" : "string"
          },
          "blockNumber" : {
            "type" : "integer"
          },
          "address" : {
            "type" : "string"
          },
          "data" : {
            "type" : "string"
          },
          "type" : {
            "type" : "string"
          },
          "topics" : {
            "type" : "array",
            "items" : {
              "type" : "string"
            }
          },
          "transactionIndexRaw" : {
            "type" : "string"
          },
          "blockNumberRaw" : {
            "type" : "string"
          },
          "logIndexRaw" : {
            "type" : "string"
          }
        }
      },
      "TransactionReceipt" : {
        "type" : "object",
        "properties" : {
          "transactionHash" : {
            "type" : "string"
          },
          "transactionIndex" : {
            "type" : "integer"
          },
          "blockHash" : {
            "type" : "string"
          },
          "blockNumber" : {
            "type" : "integer"
          },
          "cumulativeGasUsed" : {
            "type" : "integer"
          },
          "gasUsed" : {
            "type" : "integer"
          },
          "contractAddress" : {
            "type" : "string"
          },
          "root" : {
            "type" : "string"
          },
          "status" : {
            "type" : "string"
          },
          "from" : {
            "type" : "string"
          },
          "to" : {
            "type" : "string"
          },
          "logs" : {
            "type" : "array",
            "items" : {
              "$ref" : "#/components/schemas/Log"
            }
          },
          "logsBloom" : {
            "type" : "string"
          },
          "revertReason" : {
            "type" : "string"
          },
          "transactionIndexRaw" : {
            "type" : "string"
          },
          "blockNumberRaw" : {
            "type" : "string"
          },
          "cumulativeGasUsedRaw" : {
            "type" : "string"
          },
          "gasUsedRaw" : {
            "type" : "string"
          },
          "statusOK" : {
            "type" : "boolean"
          }
        }
      },
      "ControllerDeployParameters" : {
        "type" : "object",
        "properties" : {
          "bolApp" : {
            "type" : "string"
          },
          "bolAdmin" : {
            "type" : "string"
          }
        }
      }
    }
  }
}