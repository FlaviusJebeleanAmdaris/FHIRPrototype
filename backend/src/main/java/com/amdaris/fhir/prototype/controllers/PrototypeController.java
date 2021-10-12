package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.services.PrototypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PrototypeController {

    @Autowired
    private final PrototypeService prototypeService;

    public PrototypeController(PrototypeService prototypeService) {
        this.prototypeService = prototypeService;
    }

    @GetMapping("/patients")
    public ResponseEntity<List<Patient>> getPatients() {
        return new ResponseEntity<>(prototypeService.getPatients(), HttpStatus.OK);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable final String id) {
        Optional<Patient> optionalPatient = prototypeService.getPatient(id);

        return optionalPatient
                .map(patient -> new ResponseEntity<>(patient, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
