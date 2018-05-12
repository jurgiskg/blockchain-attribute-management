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

    mapping (uint => mapping(address => ServiceAttribute)) public attributes;

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
        attributes[attributeId][serviceAddress].value = "X";
    }

    function getAttributeAsUser(uint attributeId, address serviceAddress) 
        public 
        view
        onlyBy(userAddress) 
        returns (string)
    {
        return attributes[attributeId][serviceAddress].value;
    }

    function getAttribute(uint attributeId) public view returns (string) {
        if (bytes(attributes[attributeId][msg.sender].value).length == 0) {
            return ("Please request access first");
        } else {
            if (attributes[attributeId][msg.sender].accessGranted) {
                return attributes[attributeId][msg.sender].value;
            } else {
                return ("Access denied");
            }
        }
    }

    function requestAttributeAccess(uint attributeId) public {
        emit AccessRequest(msg.sender, attributeId);
    }
}