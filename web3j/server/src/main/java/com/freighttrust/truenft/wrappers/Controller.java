package com.freighttrust.truenft.wrappers;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.6.1.
 */
@SuppressWarnings("rawtypes")
public class Controller extends Contract {
    public static final String BINARY = "608060405234801561001057600080fd5b5060405160408061046783398101604052805160209091015160008054600160a060020a03938416600160a060020a03199182161790915560018054939092169216919091179055610400806100676000396000f3006080604052600436106100775763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166308af4b45811461007c57806326fae0d3146100c15780633cebb823146100e25780638456cb5914610103578063b76564bd14610118578063f851a44014610149575b600080fd5b34801561008857600080fd5b506100bf7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1960043516600160a060020a036024351661015e565b005b3480156100cd57600080fd5b506100bf600160a060020a036004351661021a565b3480156100ee57600080fd5b506100bf600160a060020a03600435166102b0565b34801561010f57600080fd5b506100bf61032b565b34801561012457600080fd5b5061012d6103b6565b60408051600160a060020a039092168252519081900360200190f35b34801561015557600080fd5b5061012d6103c5565b600154600160a060020a0316331461017557600080fd5b60008054604080517f08af4b450000000000000000000000000000000000000000000000000000000081527bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1986166004820152600160a060020a038581166024830152915191909216926308af4b45926044808201939182900301818387803b1580156101fe57600080fd5b505af1158015610212573d6000803e3d6000fd5b505050505050565b600154600160a060020a0316331461023157600080fd5b60008054604080517f26fae0d3000000000000000000000000000000000000000000000000000000008152600160a060020a038581166004830152915191909216926326fae0d3926024808201939182900301818387803b15801561029557600080fd5b505af11580156102a9573d6000803e3d6000fd5b5050505050565b600154600160a060020a031633146102c757600080fd5b60008054604080517f3cebb823000000000000000000000000000000000000000000000000000000008152600160a060020a03858116600483015291519190921692633cebb823926024808201939182900301818387803b15801561029557600080fd5b600154600160a060020a0316331461034257600080fd5b60008054604080517f8456cb590000000000000000000000000000000000000000000000000000000081529051600160a060020a0390921692638456cb599260048084019382900301818387803b15801561039c57600080fd5b505af11580156103b0573d6000803e3d6000fd5b50505050565b600054600160a060020a031681565b600154600160a060020a0316815600a165627a7a72305820b5360531064b8b7da432c8447d2e7bdc7a7c0c8e2bc4156c535152009f253c9c0029";

    public static final String FUNC_SETTARGET = "setTarget";

    public static final String FUNC_SETMASTER = "setMaster";

    public static final String FUNC_CHANGECONTROLLER = "changeController";

    public static final String FUNC_PAUSE = "pause";

    public static final String FUNC_APP = "app";

    public static final String FUNC_ADMIN = "admin";

    @Deprecated
    protected Controller(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected Controller(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected Controller(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected Controller(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<TransactionReceipt> setTarget(byte[] functionSel, String newTarget) {
        final Function function = new Function(
                FUNC_SETTARGET, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Bytes4(functionSel), 
                new org.web3j.abi.datatypes.Address(160, newTarget)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> setMaster(String newMaster) {
        final Function function = new Function(
                FUNC_SETMASTER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, newMaster)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> changeController(String newController) {
        final Function function = new Function(
                FUNC_CHANGECONTROLLER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, newController)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> pause() {
        final Function function = new Function(
                FUNC_PAUSE, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<String> app() {
        final Function function = new Function(FUNC_APP, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> admin() {
        final Function function = new Function(FUNC_ADMIN, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    @Deprecated
    public static Controller load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new Controller(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static Controller load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new Controller(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static Controller load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new Controller(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static Controller load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new Controller(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<Controller> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, String bolApp, String bolAdmin) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, bolApp), 
                new org.web3j.abi.datatypes.Address(160, bolAdmin)));
        return deployRemoteCall(Controller.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<Controller> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, String bolApp, String bolAdmin) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, bolApp), 
                new org.web3j.abi.datatypes.Address(160, bolAdmin)));
        return deployRemoteCall(Controller.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Controller> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, String bolApp, String bolAdmin) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, bolApp), 
                new org.web3j.abi.datatypes.Address(160, bolAdmin)));
        return deployRemoteCall(Controller.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<Controller> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, String bolApp, String bolAdmin) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(160, bolApp), 
                new org.web3j.abi.datatypes.Address(160, bolAdmin)));
        return deployRemoteCall(Controller.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }
}
