import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { ListTeamComponent } from '../../components/list-team/list-team.component';
import { EditTeamComponent } from '../../components/edit-team/edit-team.component';
import { Team, TeamData } from '../../models/app.models';
import { MatButtonModule } from '@angular/material/button';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'team-management',
  standalone: true,
  imports: [
    ToolbarComponent,
    MenuComponent,
    EditTeamComponent,
    ListTeamComponent,
    MatButtonModule,
  ],
  templateUrl: './team-management.component.html',
  styleUrl: './team-management.component.scss',
})
export class TeamManagementComponent {
  editDataTeam?: Team;
  loaded: { refresh: boolean } = { refresh: false };
  team?: TeamData;
  constructor(public _teamServices: TeamService) {}
  detailTeam(event: any) {
    this.editDataTeam = event;
  }

  createTeam() {
    this.editDataTeam = new Team();
  }

  refreshList(refresh = false) {
    this.loaded = { refresh };
  }
}
