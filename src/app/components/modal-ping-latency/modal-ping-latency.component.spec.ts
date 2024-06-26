import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPingLatencyComponent } from './modal-ping-latency.component';

describe('ModalPingLatencyComponent', () => {
  let component: ModalPingLatencyComponent;
  let fixture: ComponentFixture<ModalPingLatencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPingLatencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPingLatencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
