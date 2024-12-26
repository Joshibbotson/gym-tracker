import { Component, input, signal } from '@angular/core';
import { Workout } from '../../../activities/types/Workout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { WorkoutType } from '../../../activities/enums/WorkoutType.enum';
import { CaloriePhase } from '../../../activities/enums/CaloriePhase.enum';

@Component({
  selector: 'create-update-workout',
  imports: [ReactiveFormsModule],
  templateUrl: './create-update-workout.component.html',
  styleUrl: './create-update-workout.component.scss',
})
export class CreateUpdateWorkoutComponent {
  workoutToEdit = input<Workout>();
  weightType = signal<'Stone' | 'lbs'>('Stone');
  measurementType = signal<'cm' | 'inches'>('inches');
  loading = signal<boolean>(false);
  showOptionalMeasurements = signal<boolean>(false);

  stone: null | number = null;
  lbs: null | number = null;
  inches: null | number = null;

  WorkoutType = WorkoutType;
  workoutTypeValues = Object.values(WorkoutType);

  CaloriePhase = CaloriePhase;
  caloriePhaseValues = Object.values(CaloriePhase);

  workoutForm: FormGroup = new FormGroup({
    date: new FormControl(
      format(new Date(), 'yyyy-MM-dd'),
      Validators.required
    ),
    weight: new FormControl(undefined),
    workoutType: new FormControl(undefined),
    caloriePhase: new FormControl(undefined),
    chestSize: new FormControl(undefined),
    waistSize: new FormControl(undefined),
    bicepSize: new FormControl(undefined),
    forearmSize: new FormControl(undefined),
    thighSize: new FormControl(undefined),
    calfSize: new FormControl(undefined),
  });

  onWorkoutSave(): void {}

  handleWeightTypeChange(type: 'Stone' | 'lbs'): void {
    this.weightType.set(type);
  }

  handleWeightChange(weightType: 'stone' | 'lbs', weight: Event): void {
    this[weightType] = parseInt((weight.target as HTMLInputElement).value);
    this.convertWeightToLbs();
  }

  convertWeightToLbs(): void {
    // 1 stone = 14 lbs
    const stoneToLbs = (this.stone ?? 0) * 14;
    const additionalLbs = this.lbs ?? 0;
    const totalLbs = stoneToLbs + additionalLbs;

    this.workoutForm.get('weight')?.setValue(totalLbs);
    console.log(totalLbs);
  }

  handleMeasurementTypeChange(measurement: 'inches' | 'cm'): void {
    this.measurementType.set(measurement);
  }

  convertInchesToCm(formControl: string): void {
    const inchesToCm = (this.inches ?? 0) * 2.54;
    this.workoutForm.get(formControl)?.setValue(inchesToCm);
  }
}
