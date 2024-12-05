// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SalonServices {
    struct Service {
        uint256 id;       // Unique ID for the service
        string name;      // Name of the service
        uint256 price;    // Price of the service (in wei)
    }

    // Mapping to store services by their ID
    mapping(uint256 => Service) public services;

    // Array to keep track of service IDs
    uint256[] public serviceIds;

    uint256 public serviceCounter = 1;

    // Event to notify when a service is added
    event ServiceAdded(uint256 indexed id, string name, uint256 price);

    // Event to notify when a service is removed
    event ServiceRemoved(uint256 indexed id, string name);

    function addService(string memory name, uint256 price) external {
        require(bytes(name).length > 0, "nome do servico obrigatorio");
        require(price > 0, "Preco nao pode ser zero");

        // Add the new service
        services[serviceCounter] = Service(serviceCounter, name, price);
        serviceIds.push(serviceCounter);

        emit ServiceAdded(serviceCounter, name, price);
        serviceCounter++;
    }

    function removeService(uint256 id) external {
        require(services[id].id != 0, "Este servico nao existe");

        // Emit removal event before deletion
        emit ServiceRemoved(id, services[id].name);

        // Remove from mapping
        delete services[id];

        // Remove ID from serviceIds array
        for (uint256 i = 0; i < serviceIds.length; i++) {
            if (serviceIds[i] == id) {
                serviceIds[i] = serviceIds[serviceIds.length - 1]; // Replace with last ID
                serviceIds.pop(); // Remove the last ID
                break;
            }
        }
    }

    function getAllServices() external view returns (Service[] memory) {
        uint256 length = serviceIds.length;
        Service[] memory allServices = new Service[](length);

        for (uint256 i = 0; i < length; i++) {
            allServices[i] = services[serviceIds[i]];
        }

        return allServices;
    }
}
