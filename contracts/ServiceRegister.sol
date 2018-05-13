pragma solidity ^0.4.23;

contract ServiceRegister {

    mapping (address => string) private services;

    function register(string encodedName) public {
        services[msg.sender] = encodedName;
    }

    function getServiceCode(address serviceAddress) public view returns (string) {
        return services[serviceAddress];
    }
}