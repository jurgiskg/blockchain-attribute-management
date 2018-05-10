pragma solidity ^0.4.23;

contract UserAttributeStore {
    //TODO: change to actual user, not contract creator
    address public userAddress = msg.sender;

    struct ServiceAttribute {
        bool accessGranted;
        string value;
    }

    //ENUMs cannot be keys. To be passed as uint(Enum.ONE)
    mapping (uint => mapping(address => ServiceAttribute)) public attributes;

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
    }

    function getAttribute(uint attributeId, address serviceAddress) public view returns (string) {
        return attributes[attributeId][serviceAddress].value;
    }
}