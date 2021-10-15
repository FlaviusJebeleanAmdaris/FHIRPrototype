import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { RequestService } from '../services/request.service';
import { PatientComponent } from './patient.component';


describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let de: DebugElement;
  let service: RequestService;
  let patientSpy: jasmine.Spy;
  let observationsSpy: jasmine.Spy;
  let conditionsSpy: jasmine.Spy;
  let encountersSpy: jasmine.Spy;
  let testResponse = {
    resource: "{}"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '096724e0-4f46-4af9-8d25-2e5d6ec47526', // represents the patientId
              },
            },
          },
        }
      ],
      imports: [ AppRoutingModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    service = de.injector.get(RequestService);
    patientSpy = spyOn(service, 'getPatient').and.returnValue(Promise.resolve(testResponse));
    observationsSpy = spyOn(service, 'getObservations').and.returnValue(Promise.resolve(testResponse));
    conditionsSpy = spyOn(service, 'getConditions').and.returnValue(Promise.resolve(testResponse));
    encountersSpy = spyOn(service, 'getEncounters').and.returnValue(Promise.resolve(testResponse));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call appropriate RequestService methods in the constructor', () => {
    TestBed.createComponent(PatientComponent);
    
    expect(patientSpy).toHaveBeenCalled();
    expect(patientSpy.calls.all().length).toEqual(1);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(observationsSpy).toHaveBeenCalled();
      expect(observationsSpy.calls.all().length).toEqual(1);

      expect(conditionsSpy).toHaveBeenCalled();
      expect(conditionsSpy.calls.all().length).toEqual(1);

      expect(encountersSpy).toHaveBeenCalled();
      expect(encountersSpy.calls.all().length).toEqual(1);
    });
  });

  it('should contain 4 expansion panels with data', () => {
    TestBed.createComponent(PatientComponent);

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let expansionPanels = fixture.nativeElement.querySelectorAll('mat-expansion-panel');
      expect(expansionPanels.length).toEqual(4);
    });
  });
});
