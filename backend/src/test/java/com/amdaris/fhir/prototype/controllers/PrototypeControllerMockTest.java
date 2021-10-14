package com.amdaris.fhir.prototype.controllers;

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
        Patient testPatient = new Patient("test_patient", 1, null, "type", "resource");
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
}