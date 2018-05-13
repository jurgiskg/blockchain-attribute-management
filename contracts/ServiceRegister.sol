pragma solidity ^0.4.23;

contract ServiceRegister {

    struct Service {
        string registrationCode;
        string name;
    }
    mapping (address => Service) private services;

    function register(string registrationCode, string name) public {
        services[msg.sender].registrationCode = registrationCode;
        services[msg.sender].name = name;
    }

    function getService(address serviceAddress) public view returns (string, string) {
        return (services[serviceAddress].registrationCode, services[serviceAddress].name);
    }
}