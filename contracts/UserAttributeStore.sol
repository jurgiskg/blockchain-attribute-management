pragma solidity ^0.4.23;

contract UserAttributeStore {
    address public userAddress = msg.sender;

    struct ServiceAttribute {
        bool accessGranted;
        string value;
    }

    event AccessRequest (
        address serviceAddress,
        uint attributeId
    );

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

    function grantAccess(uint attributeId, address serviceAddress, string value)
        public
        onlyBy(userAddress)
    {
        attributes[attributeId][serviceAddress].accessGranted = true;
        attributes[attributeId][serviceAddress].value = value;
    }

    function removeAccess(uint attributeId, address serviceAddress)
        public
        onlyBy(userAddress)
    {
        attributes[attributeId][serviceAddress].accessGranted = false;
        //needed to separate from uninitialized values
        attributes[attributeId][serviceAddress].value = "ACCESS DENIED";
    }

    function getAttribute(uint attributeId) public returns (string) {
        if (bytes(attributes[attributeId][msg.sender].value).length == 0) {
            emit AccessRequest(msg.sender, attributeId);
            return ("Access request issued");
        } else {
            if (msg.sender == userAddress || attributes[attributeId][msg.sender].accessGranted) {
                return attributes[attributeId][msg.sender].value;
            } else {
                return ("Access denied");
            }
        }
        return attributes[attributeId][msg.sender].value;
    }
}