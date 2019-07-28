import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';

@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        public usuarioService: UsuarioService
    ) { }

    @Effect()
    cargarUsuario$: Observable<Action> = this.actions$
        .pipe(
            ofType(usuarioActions.CARGAR_USUARIO),
            switchMap((action: usuarioActions.CargarUsuario) => {
                console.log(action.id);
                const id = action.id;
                return this.usuarioService.getUserById(id)
                    .pipe(
                        map(user => new usuarioActions.CargarUsuarioSuccess(user)),
                        catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                    );
            })
            // tap(action => {
            //   console.log(action);
            //   return action;
            // })
        );
}
