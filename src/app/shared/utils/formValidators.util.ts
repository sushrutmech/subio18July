import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(group:any) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
}