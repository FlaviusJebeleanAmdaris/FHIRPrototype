package com.amdaris.fhir.prototype.services;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.repositories.PrototypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrototypeService {

    @Autowired
    private final PrototypeRepository prototypeRepository;

    public PrototypeService(PrototypeRepository prototypeRepository) {
        this.prototypeRepository = prototypeRepository;
    }

    public List<Patient> getPatients() {
        return prototypeRepository.findAllPatients();
    }

    public Optional<Patient> getPatient(final String id) {
        return prototypeRepository.findPatientById(id);
    }

    public List<Observation> getObservationsForPatient(final String patientId) {
        return prototypeRepository.findAllObservationsForPatient(patientId);
    }

    public List<Condition> getConditionsForPatient(final String patientId) {
        return prototypeRepository.findAllConditionsForPatient(patientId);
    }

    public List<Encounter> getEncountersForPatient(final String patientId) {
        return prototypeRepository.findAllEncountersForPatient(patientId);
    }
}
