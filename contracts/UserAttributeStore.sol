pragma solidity ^0.4.23;

contract UserAttributeStore {
    //TODO: change to actual user, not contract creator
    address public userAddress = msg.sender;

    enum Attribute {NAME, SURNAME, TELEPHONE, NICKNAME}

    modifier onlyBy(address _account) {
        require(
            msg.sender == _account,
            "Sender not authorized."
        );
        _;
    }

    function addAttribute() public view onlyBy(userAddress) returns (int) {
        //TODO: add attribute logic
        return 5;
    }
}