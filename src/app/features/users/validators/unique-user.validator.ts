import { Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UsersService } from "../services/users.service";

@Injectable({ providedIn: 'root' })
export class UniqueUserNameValidator implements AsyncValidator {
  constructor(private heroesService: UsersService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.heroesService.isUserNameTaken(control.value).pipe(
      map((isTaken) => (isTaken ? { uniqueUserName: true } : null)),
      catchError(() => of(null))
    );
  }
}
