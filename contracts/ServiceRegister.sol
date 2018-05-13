pragma solidity ^0.4.23;

contract ServiceRegister {

    mapping (address => string) private services;

    function addService(string encodedName) public {
        services[msg.sender] = encodedName;
    }

    function getServiceName(address serviceAddress) public view returns (string) {
        return services[serviceAddress];
    }
}