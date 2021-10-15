package com.amdaris.fhir.prototype.services;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.repositories.FhirResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FhirResourceService {

    private final FhirResourceRepository fhirResourceRepository;

    @Autowired
    public FhirResourceService(FhirResourceRepository fhirResourceRepository) {
        this.fhirResourceRepository = fhirResourceRepository;
    }

    public List<Patient> getPatients() {
        return fhirResourceRepository.findAllPatients();
    }

    public Optional<Patient> getPatient(final String id) {
        return fhirResourceRepository.findPatientById(id);
    }

    public List<Observation> getObservationsForPatient(final String patientId) {
        return fhirResourceRepository.findAllObservationsForPatient(patientId);
    }

    public List<Condition> getConditionsForPatient(final String patientId) {
        return fhirResourceRepository.findAllConditionsForPatient(patientId);
    }

    public List<Encounter> getEncountersForPatient(final String patientId) {
        return fhirResourceRepository.findAllEncountersForPatient(patientId);
    }
}
