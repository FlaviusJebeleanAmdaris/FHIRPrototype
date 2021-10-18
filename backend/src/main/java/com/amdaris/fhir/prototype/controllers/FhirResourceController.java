package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.services.FhirResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class FhirResourceController {

    private final FhirResourceService fhirResourceService;

    @Autowired
    public FhirResourceController(FhirResourceService fhirResourceService) {
        this.fhirResourceService = fhirResourceService;
    }

    @GetMapping("/api/patients")
    public ResponseEntity<List<Patient>> getPatients() {

        List<Patient> patients = fhirResourceService.getPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/api/patients/{id}")
    public ResponseEntity<Patient> getPatient(@PathVariable final String id) {

        Optional<Patient> optionalPatient = fhirResourceService.getPatient(id);

        return optionalPatient
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/api/patients/{patientId}/observations")
    public ResponseEntity<List<Observation>> getObservations(@PathVariable final String patientId) {

        List<Observation> observations = fhirResourceService.getObservationsForPatient(patientId);
        return ResponseEntity.ok(observations);
    }

    @GetMapping("/api/patients/{patientId}/conditions")
    public ResponseEntity<List<Condition>> getConditions(@PathVariable final String patientId) {

        List<Condition> conditions = fhirResourceService.getConditionsForPatient(patientId);
        return ResponseEntity.ok(conditions);
    }

    @GetMapping("/api/patients/{patientId}/encounters")
    public ResponseEntity<List<Encounter>> getEncounters(@PathVariable final String patientId) {

        List<Encounter> encounters = fhirResourceService.getEncountersForPatient(patientId);
        return ResponseEntity.ok(encounters);
    }
}
