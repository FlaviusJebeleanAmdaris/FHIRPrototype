package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.models.Condition;
import com.amdaris.fhir.prototype.models.Encounter;
import com.amdaris.fhir.prototype.models.Observation;
import com.amdaris.fhir.prototype.models.Patient;
import com.amdaris.fhir.prototype.services.PrototypeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class PrototypeControllerMockTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PrototypeService mockService;

    @Test
    void testGetPatientsMockServiceEmptyList() throws Exception {
        // Mock service
        when(mockService.getPatients()).thenReturn(new ArrayList<>());

        RequestBuilder request = MockMvcRequestBuilders.get("/patients");
        MvcResult result = mvc.perform(request).andReturn();

        // Check response body returns empty list
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), "[]");
    }

    @Test
    void testGetPatientsMockService() throws Exception {
        // Create hardcoded patient and the appropriate mock JSON response
        Patient testPatient = new Patient("test_patient", 1, null, "patient", "resource");
        List<Patient> mockServiceResponse = new ArrayList<>();
        mockServiceResponse.add(testPatient);

        ObjectMapper mapper = new ObjectMapper();
        String jsonMockServiceResponse = mapper.writeValueAsString(mockServiceResponse);

        // Mock service
        when(mockService.getPatients()).thenReturn(mockServiceResponse);

        RequestBuilder request = MockMvcRequestBuilders.get("/patients");
        MvcResult result = mvc.perform(request).andReturn();

        // Check returned JSON list is equal to the mocked one
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), jsonMockServiceResponse);
    }

    @Test
    void testGetObservationsMockService() throws Exception {
        // Create hardcoded observation and the appropriate mock JSON response
        String patientId = "patient_id";
        Observation testObservation = new Observation("test_observation", 1, null, "observation", "resource");
        List<Observation> mockServiceResponse = new ArrayList<>();
        mockServiceResponse.add(testObservation);

        ObjectMapper mapper = new ObjectMapper();
        String jsonMockServiceResponse = mapper.writeValueAsString(mockServiceResponse);

        // Mock service
        when(mockService.getObservationsForPatient(patientId)).thenReturn(mockServiceResponse);

        RequestBuilder request = MockMvcRequestBuilders.get("/observations/" + patientId);
        MvcResult result = mvc.perform(request).andReturn();

        // Check returned JSON list is equal to the mocked one
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), jsonMockServiceResponse);
    }

    @Test
    void testGetConditionsMockService() throws Exception {
        // Create hardcoded condition and the appropriate mock JSON response
        String patientId = "patient_id";
        Condition testCondition = new Condition("test_condition", 1, null, "condition", "resource");
        List<Condition> mockServiceResponse = new ArrayList<>();
        mockServiceResponse.add(testCondition);

        ObjectMapper mapper = new ObjectMapper();
        String jsonMockServiceResponse = mapper.writeValueAsString(mockServiceResponse);

        // Mock service
        when(mockService.getConditionsForPatient(patientId)).thenReturn(mockServiceResponse);

        RequestBuilder request = MockMvcRequestBuilders.get("/conditions/" + patientId);
        MvcResult result = mvc.perform(request).andReturn();

        // Check returned JSON list is equal to the mocked one
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), jsonMockServiceResponse);
    }

    @Test
    void testGetEncountersMockService() throws Exception {
        // Create hardcoded encounters and the appropriate mock JSON response
        String patientId = "patient_id";
        Encounter testEncounter = new Encounter("test_encounter", 1, null, "encounter", "resource");
        List<Encounter> mockServiceResponse = new ArrayList<>();
        mockServiceResponse.add(testEncounter);

        ObjectMapper mapper = new ObjectMapper();
        String jsonMockServiceResponse = mapper.writeValueAsString(mockServiceResponse);

        // Mock service
        when(mockService.getEncountersForPatient(patientId)).thenReturn(mockServiceResponse);

        RequestBuilder request = MockMvcRequestBuilders.get("/encounters/" + patientId);
        MvcResult result = mvc.perform(request).andReturn();

        // Check returned JSON list is equal to the mocked one
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), jsonMockServiceResponse);
    }
}