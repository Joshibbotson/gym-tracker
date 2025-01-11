import { Component, inject, input, output, signal } from '@angular/core';
import { Workout } from '../../../activities/types/Workout';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  format,
  parse,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';
import { WorkoutType } from '../../../activities/enums/WorkoutType.enum';
import { CaloriePhase } from '../../../activities/enums/CaloriePhase.enum';
import { WorkoutService } from '../../../activities/services/workout.service';
import { Subject, takeUntil } from 'rxjs';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'create-update-workout',
  imports: [ReactiveFormsModule, NgbTooltipModule],
  templateUrl: './create-update-workout.component.html',
  styleUrl: './create-update-workout.component.scss',
})
export class CreateUpdateWorkoutComponent {
  workoutToEdit = input<Workout>();
  reloadPage = output<void>();
  workoutService = inject(WorkoutService);

  weightType = signal<'Stone' | 'lbs'>('Stone');
  measurementType = signal<'cm' | 'inches'>('inches');
  loading = signal<boolean>(false);
  showOptionalMeasurements = signal<boolean>(false);
  destroy$ = new Subject<void>();

  stone: null | number = null;
  lbs: null | number = null;

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

  ngOnInit(): void {
    if (this.workoutToEdit()) {
      this.updateForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateForm(): void {
    this.workoutForm.patchValue({
      date: this.workoutToEdit()?.date,
      weight: this.workoutToEdit()?.workoutConfig?.weight,
      workoutType: this.workoutToEdit()?.workoutConfig?.workoutType,
      caloriePhase: this.workoutToEdit()?.workoutConfig?.caloriePhase,
      chestSize: this.workoutToEdit()?.workoutConfig?.chestSize,
      waistSize: this.workoutToEdit()?.workoutConfig?.waistSize,
      bicepSize: this.workoutToEdit()?.workoutConfig?.bicepSize,
      forearmSize: this.workoutToEdit()?.workoutConfig?.forearmSize,
      thighSize: this.workoutToEdit()?.workoutConfig?.thighSize,
      calfSize: this.workoutToEdit()?.workoutConfig?.calfSize,
    });
    const weight = this.workoutToEdit()?.workoutConfig?.weight;
    if (weight) {
      const { stone, lbs } = this.convertLbsToStoneAndLbs(weight);
      this.stone = stone;
      this.lbs = lbs;
    }
  }

  /** if  measurementType == 'inches' use convertInchesToCm()*/
  onCreateWorkout(): void {
    const isInches = this.measurementType() === 'inches';
    const workoutValues = this.workoutForm.value;
    const sizeKeys = [
      'chestSize',
      'waistSize',
      'bicepSize',
      'forearmSize',
      'thighSize',
      'calfSize',
    ];
    const convertedWorkoutValues = Object.entries(workoutValues).map((val) => {
      if (sizeKeys.includes(val[0]) && typeof val[1] === 'number') {
        val[1] = isInches ? this.convertInchesToCm(val[1]) : val[1];
      }
      return val;
    });

    const convertedWorkoutObject = {
      ...Object.fromEntries(convertedWorkoutValues),
      date: this.convertDateToDateTimeNow(this.workoutForm.get('date')?.value),
    };

    this.loading.set(true);
    this.workoutService
      .createWorkout(convertedWorkoutObject as Workout)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.reloadPage.emit(),
        error: (err) => {
          console.log('err:', err), this.loading.set(false);
        },
        complete: () => this.loading.set(false),
      });
  }

  onUpdateWorkout(): void {
    const isInches = this.measurementType() === 'inches';
    const workoutValues = this.workoutForm.value;
    const sizeKeys = [
      'chestSize',
      'waistSize',
      'bicepSize',
      'forearmSize',
      'thighSize',
      'calfSize',
    ];
    const convertedWorkoutValues = Object.entries(workoutValues).map((val) => {
      if (sizeKeys.includes(val[0]) && typeof val[1] === 'number') {
        val[1] = isInches ? this.convertInchesToCm(val[1]) : val[1];
      }
      return val;
    });

    const convertedWorkoutObject = {
      ...Object.fromEntries(convertedWorkoutValues),
      date: this.convertDateToDateTimeNow(this.workoutForm.get('date')?.value),
    };

    this.loading.set(true);
    this.workoutService
      .updateWorkout(
        this.workoutToEdit()!._id,
        convertedWorkoutObject as Workout
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.reloadPage.emit(),
        error: (err) => {
          console.log('err:', err), this.loading.set(false);
        },
        complete: () => this.loading.set(false),
      });
  }

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
  }

  convertLbsToStoneAndLbs(totalLbs: number): { stone: number; lbs: number } {
    const lbsPerStone = 14; // 1 stone = 14 lbs
    const stone = Math.floor(totalLbs / lbsPerStone);
    const lbs = totalLbs % lbsPerStone;

    return { stone, lbs };
  }

  handleMeasurementTypeChange(measurement: 'inches' | 'cm'): void {
    this.measurementType.set(measurement);
  }

  convertInchesToCm(value: number): number {
    return (value ?? 0) * 2.54;
  }

  convertDateToDateTimeNow(dateString: string): Date {
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    const now = new Date();
    const combinedDate = setMilliseconds(
      setSeconds(
        setMinutes(setHours(parsedDate, now.getHours()), now.getMinutes()),
        now.getSeconds()
      ),
      now.getMilliseconds()
    );

    return combinedDate;
  }
}
