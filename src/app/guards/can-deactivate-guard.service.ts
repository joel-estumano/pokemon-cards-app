import {
    ActivatedRouteSnapshot,
    CanDeactivateFn,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | boolean;
}

export const pendingChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
) => {
    alert('deactive: ' + component.canDeactivate())
    return component.canDeactivate();
};
