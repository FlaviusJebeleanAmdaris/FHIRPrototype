package com.amdaris.fhir.prototype.repositories;

import com.amdaris.fhir.prototype.models.Patient;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrototypeRepository extends CrudRepository<Patient, String> {

    Optional<Patient> findById(String id);

//    @Query("SELECT * FROM patient LIMIT 20;")
    List<Patient> findAll();
}
