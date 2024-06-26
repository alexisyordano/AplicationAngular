import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRemoveTeamComponent } from './modal-remove-team.component';

describe('ModalRemoveTeamComponent', () => {
  let component: ModalRemoveTeamComponent;
  let fixture: ComponentFixture<ModalRemoveTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRemoveTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRemoveTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
