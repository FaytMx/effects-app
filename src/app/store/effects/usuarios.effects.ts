import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    public usuarioService: UsuarioService
  ) { }

  @Effect()
  cargarUsuarios$: Observable<Action> = this.actions$
    .pipe(
      ofType(usuariosActions.CARGAR_USUARIOS),
      switchMap(() => {
        return this.usuarioService.getUsers()
        .pipe(
          map(users => new usuariosActions.CargarUsuariosSuccess(users)),
          catchError(error => of(new usuariosActions.CargarUsuariosFail(error)))
        );
      })
      // tap(action => {
      //   console.log(action);
      //   return action;
      // })
    );
}
