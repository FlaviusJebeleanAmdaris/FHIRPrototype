package com.amdaris.fhir.prototype.controllers;

import com.amdaris.fhir.prototype.repositories.FhirResourceRepository;
import com.amdaris.fhir.prototype.services.FhirResourceService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class FhirResourceControllerTest {

    @Autowired
    private FhirResourceController controller;

    @Autowired
    private FhirResourceService service;

    @Autowired
    private FhirResourceRepository repository;

    @Autowired
    private MockMvc mvc;

    @Test
    public void testContextLoads() {
        assertThat(controller).isNotNull();
        assertThat(service).isNotNull();
        assertThat(repository).isNotNull();
    }

    @Test
    void testGetPatient() throws Exception {
        String patientId = "096724e0-4f46-4af9-8d25-2e5d6ec47526";
        ObjectMapper mapper = new ObjectMapper();

        RequestBuilder request = MockMvcRequestBuilders.get("/api/patients/" + patientId);
        MvcResult result = mvc.perform(request).andReturn();

        JsonNode responseJson = mapper.readTree(result.getResponse().getContentAsString());

        // Check given ID is equal to the returned one
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(responseJson.get("id").asText(), patientId);
    }

    @Test
    void testGetInvalidPatient() throws Exception {
        String patientId = "this-id-doesnt-exist";

        RequestBuilder request = MockMvcRequestBuilders.get("/api/patient/" + patientId);
        MvcResult result = mvc.perform(request).andReturn();

        // Check 404 Not Found status code returned with no payload
        assertEquals(result.getResponse().getStatus(), 404);
        assertEquals(result.getResponse().getContentAsString(), "");
    }

    @Test
    void testGetObservationsInvalidPatient() throws Exception {
        String patientId = "this-id-doesnt-exist";

        RequestBuilder request = MockMvcRequestBuilders.get("/api/patients/" + patientId + "/observations");
        MvcResult result = mvc.perform(request).andReturn();

        // Check response body returns empty list
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), "[]");
    }

    @Test
    void testGetConditionsInvalidPatient() throws Exception {
        String patientId = "this-id-doesnt-exist";

        RequestBuilder request = MockMvcRequestBuilders.get("/api/patients/" + patientId + "/conditions");
        MvcResult result = mvc.perform(request).andReturn();

        // Check response body returns empty list
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), "[]");
    }

    @Test
    void testGetEncountersInvalidPatient() throws Exception {
        String patientId = "this-id-doesnt-exist";

        RequestBuilder request = MockMvcRequestBuilders.get("/api/patients/" + patientId + "/encounters");
        MvcResult result = mvc.perform(request).andReturn();

        // Check response body returns empty list
        assertEquals(result.getResponse().getStatus(), 200);
        assertEquals(result.getResponse().getContentAsString(), "[]");
    }
}