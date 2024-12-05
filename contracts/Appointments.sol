// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SalonAppointments {
    struct Appointment {
        string client;
        string service;
        uint256 price;
        uint256 timestamp; // Time of the appointment (Unix timestamp)
    }

    // Mapping of appointment IDs to their data
    mapping(uint256 => Appointment) public appointments;

    // Track active appointment IDs
    uint256[] public activeAppointmentIds;

    uint256 public appointmentCounter = 1;

    // Event for new appointments
    event AppointmentCreated(
        uint256 indexed serviceId,
        string client,
        string service,
        uint256 indexed timestamp,
        uint256 price
    );
    
    // Function to create an appointment
    function createAppointment(
        string memory client,  
        string memory service,
        uint256 price,
        uint256 timestamp       
    ) external {
        // Create the appointment
        appointments[appointmentCounter] = Appointment(client, service, price, timestamp);
        activeAppointmentIds.push(appointmentCounter);

        // Emit event
        emit AppointmentCreated(appointmentCounter, client, service, timestamp, price);
        appointmentCounter++;

        // remove expired appointments
        removeExpiredAppointments();
    }

    // Function to remove expired appointments
    function removeExpiredAppointments() internal {
        uint256 activeLength = activeAppointmentIds.length;
        uint256 currentTime = block.timestamp;

        for (uint256 i = 0; i < activeLength; ) {
            uint256 appointmentId = activeAppointmentIds[i];

            // If the appointment has expired
            if (appointments[appointmentId].timestamp <= currentTime) {
                // Remove from mapping
                delete appointments[appointmentId];

                // Remove from activeAppointmentIds array
                activeAppointmentIds[i] = activeAppointmentIds[activeLength - 1];
                activeAppointmentIds.pop();

                // Reduce activeLength since we've removed one
                activeLength--;
            } else {
                i++;
            }
        }
    }

    // Get all active appointments
    function getActiveAppointments() external view returns (Appointment[] memory) {
        uint256 length = activeAppointmentIds.length;
        Appointment[] memory activeAppointments = new Appointment[](length);

        for (uint256 i = 0; i < length; i++) {
            activeAppointments[i] = appointments[activeAppointmentIds[i]];
        }

        return activeAppointments;
    }
}
