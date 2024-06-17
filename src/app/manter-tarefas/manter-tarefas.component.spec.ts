import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManterTarefasComponent } from './manter-tarefas.component';

describe('ManterTarefasComponent', () => {
  let component: ManterTarefasComponent;
  let fixture: ComponentFixture<ManterTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManterTarefasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManterTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
