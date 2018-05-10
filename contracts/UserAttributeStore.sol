pragma solidity ^0.4.23;

contract UserAttributeStore {
    //TODO: change to actual user, not contract creator
    address public userAddress = msg.sender;
    struct ServiceAttribute {
        bool initialized;
        bool accessGranted;
        string value;
    }
    //ENUMs cannot be keys. To be passed as uint(Enum.ONE)
    mapping (uint => mapping(address => ServiceAttribute)) public attributes;
    event AccessRequest (
        address serviceAddress,
        uint attributeId
    );
    enum Attribute {NAME, SURNAME, TELEPHONE, NICKNAME}

    modifier onlyBy(address _account) {
        require(
            msg.sender == _account,
            "Sender not authorized."
        );
        _;
    }

    //TODO: add onlyBy(userAddress)
    function addAttribute(uint attributeId, address serviceAddress, string value) public {
        attributes[attributeId][serviceAddress].value = value;
        attributes[attributeId][serviceAddress].accessGranted = true;
    }

    //currently only for services
    function getAttribute(uint attributeId) public returns (string) {
        if (attributes[attributeId][msg.sender].initialized == false) {
            attributes[attributeId][msg.sender].initialized = true;
            emit AccessRequest(msg.sender, attributeId);
        }
        return attributes[attributeId][msg.sender].value;
    }
}