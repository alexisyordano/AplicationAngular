import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Team } from '../models/app.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private _httpClient: HttpClient) {}

  create(team: Team) {
    return this._httpClient.post(
      `${environment.serverUrl}api/team/store`,
      team
    );
  }

  update(team: Team) {
    return this._httpClient.put(
      `${environment.serverUrl}api/team/update`,
      team
    );
  }

  getTeam() {
    return this._httpClient.get(`${environment.serverUrl}api/team/index`);
  }

  getTeamId(id: string) {
    return this._httpClient.get(`${environment.serverUrl}api/team/${id}`, {});
  }

  searchTeams(query: string): Observable<any> {
    return this._httpClient.get(
      `${environment.serverUrl}api/team/search?search=${query}`
    );
  }

  delete(id: string) {
    return this._httpClient.delete(`${environment.serverUrl}api/team/destroy`, {
      params: { id },
    });
  }

  getTestLactation(test: string, id: string) {
    return this._httpClient.get(`${environment.serverUrl}api/team/test`, {
      params: { test, id },
    });
  }

  getGraphDate(startDate: string, endDate: string) {
    return this._httpClient.get(`${environment.serverUrl}api/team/datechart`, {
      params: { startDate, endDate },
    });
  }
}
