// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract HomeToken is ERC20PresetMinterPauser {
  address admin;
  
  constructor(uint256 initialSupply) ERC20PresetMinterPauser("Home Token", "HOME") {
    admin = msg.sender;
    _mint(msg.sender, initialSupply);
  }

  function setupMinter(address minter) public virtual {
    require(admin == msg.sender);
    _setupRole(MINTER_ROLE, minter);
  }
}