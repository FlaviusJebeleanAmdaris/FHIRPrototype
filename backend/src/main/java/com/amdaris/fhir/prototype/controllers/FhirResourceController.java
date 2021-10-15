package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
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

    private final PrototypeService prototypeService;

    @Autowired
    public PrototypeController(PrototypeService prototypeService) {
        this.prototypeService = prototypeService;
    }

    @GetMapping("/api/patients")
    public ResponseEntity<List<Patient>> getPatients() {
        List<Patient> patients = prototypeService.getPatients();
        LOGGER.debug("Found {} patients to return", patients.size());
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/api/patients/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable final String id) {
        Optional<Patient> optionalPatient = prototypeService.getPatient(id);

        return optionalPatient
                .map(patient -> {
                    LOGGER.debug("Patient data found: {}", patient);
                    return ResponseEntity.ok(patient);
                })
                .orElseGet(() -> {
                    LOGGER.debug("No patient found for the id {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/api/patients/{patientId}/observations")
    public ResponseEntity<List<Observation>> getObservations(@PathVariable final String patientId) {
        List<Observation> observations = prototypeService.getObservationsForPatient(patientId);
        LOGGER.debug("Found {} observations to return", observations.size());
        return ResponseEntity.ok(observations);
    }

    @GetMapping("/api/patients/{patientId}/conditions")
    public ResponseEntity<List<Condition>> getConditions(@PathVariable final String patientId) {
        List<Condition> conditions = prototypeService.getConditionsForPatient(patientId);
        LOGGER.debug("Found {} conditions to return", conditions.size());
        return ResponseEntity.ok(conditions);
    }

    @GetMapping("/api/patients/{patientId}/encounters")
    public ResponseEntity<List<Encounter>> getEncounters(@PathVariable final String patientId) {
        List<Encounter> encounters = prototypeService.getEncountersForPatient(patientId);
        LOGGER.debug("Found {} encounters to return", encounters.size());
        return ResponseEntity.ok(encounters);
    }
}
