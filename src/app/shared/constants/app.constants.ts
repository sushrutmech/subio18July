import { HttpHeaders } from "@angular/common/http";

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

export const app_session_name = '_session.subio.CU';