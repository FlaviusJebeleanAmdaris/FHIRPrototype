package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.services.PrototypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class PrototypeController {

    private final static Logger LOGGER = LoggerFactory.getLogger(PrototypeController.class);

    @Autowired
    private final PrototypeService prototypeService;

    public PrototypeController(PrototypeService prototypeService) {
        this.prototypeService = prototypeService;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients() {
        LOGGER.info("Route /patients called");
        List<Patient> patients = prototypeService.getPatients();
        LOGGER.info("Found {} patients to return", patients.size());
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable final String id) {
        LOGGER.info("Route /patient called with id {}", id);
        Optional<Patient> optionalPatient = prototypeService.getPatient(id);

        return optionalPatient
                .map(patient -> {
                    LOGGER.info("Patient data found: {}", patient);
                    return new ResponseEntity<>(patient, HttpStatus.OK);
                })
                .orElseGet(() -> {
                    LOGGER.info("No patient found for the id {}", id);
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                });
    }
}
