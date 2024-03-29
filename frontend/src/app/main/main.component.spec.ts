import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { RequestService } from '../services/request.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let de: DebugElement;
  let service: RequestService;
  let spy: jasmine.Spy;
  let testPatient = [{
    id: 1,
    txid: 0,
    timestamp: 1,
    resourceType: 'patient',
    resource: "{\"id\": \"096724e0-4f46-4af9-8d25-2e5d6ec47526\", \"meta\": {\"profile\": [\"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Patient\"]}, \"name\": [{\"use\": \"official\", \"given\": [\"Aaron697\"], \"family\": \"Bins636\", \"prefix\": [\"Mr.\"]}], \"text\": {\"div\": \"<div xmlns=\\\"http://www.w3.org/1999/xhtml\\\">Generated by <a href=\\\"https://github.com/synthetichealth/synthea\\\">Synthea</a>.Version identifier: v2.0.0-33-g3ab9839e\\n .   Person seed: -2882657631503938079  Population seed: 1534165146158</div>\", \"status\": \"generated\"}, \"gender\": \"male\", \"address\": [{\"city\": \"Tewksbury\", \"line\": [\"501 Kling Center\"], \"state\": \"Massachusetts\", \"country\": \"US\", \"extension\": [{\"url\": \"http://hl7.org/fhir/StructureDefinition/geolocation\", \"extension\": [{\"url\": \"latitude\", \"valueDecimal\": -71.227845}, {\"url\": \"longitude\", \"valueDecimal\": 42.612088}]}]}], \"telecom\": [{\"use\": \"home\", \"value\": \"555-683-7707\", \"system\": \"phone\"}], \"deceased\": {\"dateTime\": \"2002-12-25T17:36:01+03:00\"}, \"birthDate\": \"1913-01-22\", \"extension\": [{\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-race\", \"extension\": [{\"url\": \"ombCategory\", \"valueCoding\": {\"code\": \"2106-3\", \"system\": \"urn:oid:2.16.840.1.113883.6.238\", \"display\": \"White\"}}, {\"url\": \"text\", \"valueString\": \"White\"}]}, {\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-ethnicity\", \"extension\": [{\"url\": \"ombCategory\", \"valueCoding\": {\"code\": \"2186-5\", \"system\": \"urn:oid:2.16.840.1.113883.6.238\", \"display\": \"Not Hispanic or Latino\"}}, {\"url\": \"text\", \"valueString\": \"Not Hispanic or Latino\"}]}, {\"url\": \"http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName\", \"valueString\": \"Jena102 Ferry570\"}, {\"url\": \"http://hl7.org/fhir/us/core/StructureDefinition/us-core-birthsex\", \"valueCode\": \"M\"}, {\"url\": \"http://hl7.org/fhir/StructureDefinition/birthPlace\", \"valueAddress\": {\"city\": \"Springfield\", \"state\": \"Massachusetts\", \"country\": \"US\"}}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-actor-FictionalPerson-extension\", \"valueBoolean\": true}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-FathersName-extension\", \"valueHumanName\": {\"text\": \"Jack927 Bins636\"}}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-demographics-SocialSecurityNumber-extension\", \"valueString\": \"999-74-6911\"}, {\"url\": \"http://standardhealthrecord.org/fhir/StructureDefinition/shr-entity-Person-extension\", \"valueReference\": {\"reference\": \"Basic/391418f2-865f-489c-9cc3-b76e10566366\"}}, {\"url\": \"http://synthetichealth.github.io/synthea/disability-adjusted-life-years\", \"valueDecimal\": 1.1040099568705857}, {\"url\": \"http://synthetichealth.github.io/synthea/quality-adjusted-life-years\", \"valueDecimal\": 86.89599004312942}], \"identifier\": [{\"value\": \"7c4d042a-c9b2-4d5a-b0b7-a6b602c5825a\", \"system\": \"https://github.com/synthetichealth/synthea\"}, {\"type\": {\"text\": \"Medical Record Number\", \"coding\": [{\"code\": \"MR\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Medical Record Number\"}]}, \"value\": \"7c4d042a-c9b2-4d5a-b0b7-a6b602c5825a\", \"system\": \"http://hospital.smarthealthit.org\"}, {\"type\": {\"text\": \"Social Security Number\", \"coding\": [{\"code\": \"SB\", \"system\": \"http://hl7.org/fhir/identifier-type\", \"display\": \"Social Security Number\"}]}, \"value\": \"999-74-6911\", \"system\": \"http://hl7.org/fhir/sid/us-ssn\"}, {\"type\": {\"text\": \"Driver's License\", \"coding\": [{\"code\": \"DL\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Driver's License\"}]}, \"value\": \"S99982194\", \"system\": \"urn:oid:2.16.840.1.113883.4.3.25\"}, {\"type\": {\"text\": \"Passport Number\", \"coding\": [{\"code\": \"PPN\", \"system\": \"http://hl7.org/fhir/v2/0203\", \"display\": \"Passport Number\"}]}, \"value\": \"X79250170X\", \"system\": \"http://standardhealthrecord.org/fhir/StructureDefinition/passportNumber\"}], \"resourceType\": \"Patient\", \"communication\": [{\"language\": {\"text\": \"English\", \"coding\": [{\"code\": \"en-US\", \"system\": \"urn:ietf:bcp:47\", \"display\": \"English\"}]}}], \"maritalStatus\": {\"text\": \"M\", \"coding\": [{\"code\": \"M\", \"system\": \"http://hl7.org/fhir/v3/MaritalStatus\", \"display\": \"M\"}]}, \"multipleBirth\": {\"boolean\": false}}"
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      imports: [ AppRoutingModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(RequestService);
    spy = spyOn(service, 'getPatients').and.returnValue(Promise.resolve(testPatient));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call RequestService in the constructor', () => {
    TestBed.createComponent(MainComponent);
    
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
  });

  it('should contain a properly defined table', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.dataSource.data.length).toEqual(component.patients.length);
      expect(component.paginator).toBeTruthy();
      expect(component.sort).toBeTruthy();
    });
  });

  it('should be loading until data is retreived', () => {
    expect(component.loading).toBeTrue();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(component.loading).toBeFalse();
      expect(component.dataSource).toBeTruthy();
    });
  });
});
