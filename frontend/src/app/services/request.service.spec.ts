import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { RequestService } from './request.service';

describe('RequestService', () => {
  let service: RequestService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new RequestService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected data', (done: DoneFn) => {
    let testPatient = [{
      id: 1,
      txid: 0,
      timestamp: 1,
      resourceType: 'patient',
      resource: "{\"id\": \"096724e0-4f46-4af9-8d25-2e5d6ec47526\", \"meta\": {\"profile\": [\"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Patient\"]}, \"name\": [{\"use\": \"official\", \"given\": [\"Aaron697\"], \"family\": \"Bins636\", \"prefix\": [\"Mr.\"]}], \"text\": {\"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Generated by <a href=\\\"https://github.com/synthetichealth/synthea\\\">Synthea</a>.Version identifier: v2.0.0-33-g3ab9839e\\n .   Person seed: -2882657631503938079  Population seed: 1534165146158</div>\", \"status\": \"generated\"}, \"gender\": \"male\", \"address\": [{\"city\": \"Tewksbury\", \"line\": [\"501 Kling Center\"], \"state\": \"Massachusetts\", \"country\": \"US\", \"extension\": [{\"url\": \"http://hl7.org/fhir/StructureDefinition/geolocation\", \"extension\": [{\"url\": \"latitude\", \"valueDecimal\": -71.227845}, {\"url\": \"longitude\", \"valueDecimal\": 42.612088}]}]}], \"telecom\": [{\"use\": \"home\", \"value\": \"555-683-7707\", \"system\": \"phone\"}], \"deceased\": {\"dateTime\": \"2002-12-25T17:36:01+03:00\"}, \"birthDate\": \"1913-01-22\", \"extension\": [{\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\", \"extension\": [{\"url\": \"ombCategory\", \"valueCoding\": {\"code\": \"2106-3\", \"system\": \"urn:oid:2.16.840.1.113883.6.238\", \"display\": \"White\"}}, {\"url\": \"text\", \"valueString\": \"White\"}]}, {\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\", \"extension\": [{\"url\": \"ombCategory\", \"valueCoding\": {\"code\": \"2186-5\", \"system\": \"urn:oid:2.16.840.1.113883.6.238\", \"display\": \"Not Hispanic or Latino\"}}, {\"url\": \"text\", \"valueString\": \"Not Hispanic or Latino\"}]}, {\"url\": \"http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName\", \"valueString\": \"Jena102 Ferry570\"}, {\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex\", \"valueCode\": \"M\"}, {\"url\": \"http://hl7.org/fhir/StructureDefinition/birthPlace\", \"valueAddress\": {\"city\": \"Springfield\", \"state\": \"Massachusetts\", \"country\": \"US\"}}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-actor-FictionalPerson-extension\", \"valueBoolean\": true}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-FathersName-extension\", \"valueHumanName\": {\"text\": \"Jack927 Bins636\"}}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-demographics-SocialSecurityNumber-extension\", \"valueString\": \"999-74-6911\"}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Person-extension\", \"valueReference\": {\"reference\": \"Basic/391418f2-865f-489c-9cc3-b76e10566366\"}}, {\"url\": \"http://synthetichealth.github.io/synthea/disability-adjusted-life-years\", \"valueDecimal\": 1.1040099568705857}, {\"url\": \"http://synthetichealth.github.io/synthea/quality-adjusted-life-years\", \"valueDecimal\": 86.89599004312942}], \"identifier\": [{\"value\": \"7c4d042a-c9b2-4d5a-b0b7-a6b602c5825a\", \"system\": \"https://github.com/synthetichealth/synthea\"}, {\"type\": {\"text\": \"Medical Record Number\", \"coding\": [{\"code\": \"MR\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Medical Record Number\"}]}, \"value\": \"7c4d042a-c9b2-4d5a-b0b7-a6b602c5825a\", \"system\": \"http://hospital.smarthealthit.org\"}, {\"type\": {\"text\": \"Social Security Number\", \"coding\": [{\"code\": \"SB\", \"system\": \"http://hl7.org/fhir/identifier-type\", \"display\": \"Social Security Number\"}]}, \"value\": \"999-74-6911\", \"system\": \"http://hl7.org/fhir/sid/us-ssn\"}, {\"type\": {\"text\": \"Driver's License\", \"coding\": [{\"code\": \"DL\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Driver's License\"}]}, \"value\": \"S99982194\", \"system\": \"urn:oid:2.16.840.1.113883.4.3.25\"}, {\"type\": {\"text\": \"Passport Number\", \"coding\": [{\"code\": \"PPN\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Passport Number\"}]}, \"value\": \"X79250170X\", \"system\": \"http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber\"}], \"resourceType\": \"Patient\", \"communication\": [{\"language\": {\"text\": \"English\", \"coding\": [{\"code\": \"en-US\", \"system\": \"urn:ietf:bcp:47\", \"display\": \"English\"}]}}], \"maritalStatus\": {\"text\": \"M\", \"coding\": [{\"code\": \"M\", \"system\": \"http://hl7.org/fhir/v3/MaritalStatus\", \"display\": \"M\"}]}, \"multipleBirth\": {\"boolean\": false}}"
    }];
  
    httpClientSpy.get.and.returnValue(of(testPatient));
  
    service.getPatients().then(response => {
      expect(response).toEqual(testPatient);
      done();
    }).catch(_ => done.fail);

    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });
  
  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
  
    httpClientSpy.get.and.returnValue(throwError(errorResponse));
  
    service.getPatients().then(_ => done.fail('expected an error')).catch(error => {
      expect(error.error).toEqual('test 404 error');
      expect(error.status).toEqual(404);
      expect(error.statusText).toEqual('Not Found');
      done();
    })
  });
});

