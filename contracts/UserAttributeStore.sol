pragma solidity ^0.4.23;

contract UserAttributeStore {
    struct ServiceAttribute {
        bool accessGranted;
        string value;
    }
    mapping (address => mapping(uint => mapping(address => ServiceAttribute))) public attributes;

    event AccessRequested (
        address userAddress,
        address serviceAddress,
        uint attributeId
    );
    event AccessChanged (
        address userAddress,
        address serviceAddress,
        uint attributeId,
        bool status
    );

    function grantAccess(uint attributeId, address serviceAddress, string value) public {
        changeAccess(attributeId, serviceAddress, true, value);
    }

    function removeAccess(uint attributeId, address serviceAddress) public {
        changeAccess(attributeId, serviceAddress, false, "X");
    }

    function changeAccess(uint attributeId, address serviceAddress, bool granted, string value) private {
        attributes[msg.sender][attributeId][serviceAddress].accessGranted = granted;
        attributes[msg.sender][attributeId][serviceAddress].value = value;
        emit AccessChanged(msg.sender, serviceAddress, attributeId, granted);
    }

    function requestAccess(uint attributeId, address userAddress) public {
        emit AccessRequested(userAddress, msg.sender, attributeId);
    }

    function getAttribute(uint attributeId, address userAddress, address serviceAddress) 
        public
        view
        returns (string) 
    {
        if (msg.sender == userAddress) {
            return attributes[msg.sender][attributeId][serviceAddress].value;
        }
        //to avoid additional 'initialized' property, length check used
        if (bytes(attributes[userAddress][attributeId][serviceAddress].value).length == 0) {
            return "Please request access first";
        } else {
            if (attributes[userAddress][attributeId][serviceAddress].accessGranted) {
                return attributes[userAddress][attributeId][serviceAddress].value;
            } else {
                return "Access denied";
            }
        }
    }
}