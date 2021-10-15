package com.amdaris.fhir.prototype.repositories;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
import com.amdaris.fhir.prototype.models.Patient;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FhirResourceRepository extends CrudRepository<Patient, String> {

    // Since the resource column is defined as a JSONB type in the database, we can use "#>> '{}'" to convert it to text

    @Query("SELECT p.id, p.txid, p.ts, p.resource_type, p.resource #>> '{}' as resource FROM patient p WHERE p.id = :id")
    Optional<Patient> findPatientById(@Param("id") String id);

    @Query("SELECT p.id, p.txid, p.ts, p.resource_type, p.resource #>> '{}' as resource FROM patient p")
    List<Patient> findAllPatients();


    // Operator -> is used to access JSON element from the JSONB column resource

    @Query("SELECT o.id, o.txid, o.ts, o.resource_type, o.resource #>> '{}' as resource FROM observation o " +
            "WHERE o.resource->'subject'->'id' #>> '{}' = :id")
    List<Observation> findAllObservationsForPatient(@Param("id") String patientId);

    @Query("SELECT c.id, c.txid, c.ts, c.resource_type, c.resource #>> '{}' as resource FROM condition c " +
            "WHERE c.resource->'subject'->'id' #>> '{}' = :id")
    List<Condition> findAllConditionsForPatient(@Param("id") String patientId);

    @Query("SELECT e.id, e.txid, e.ts, e.resource_type, e.resource #>> '{}' as resource FROM encounter e " +
            "WHERE e.resource->'subject'->'id' #>> '{}' = :id")
    List<Encounter> findAllEncountersForPatient(@Param("id") String patientId);
}
