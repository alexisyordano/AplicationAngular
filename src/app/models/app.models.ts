export class Team {
  data?: TeamData[];

  constructor(data?: any) {
    if (data) {
      this.data = data.data;
    }
  }
}

export class TeamData {
  id?: string;
  name?: string;
  adress?: string;
  description?: string;
  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.adress = data.adress;
      this.description = data.description;
    }
  }
}

export class User {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  constructor(data?: any) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.role = data.role;
    }
  }
}

export class Test {
  status?: string;
  descriptions?: string[];
  constructor(data?: any) {
    if (data) {
      this.status = data.status;
      this.descriptions = data.descriptions;
    }
  }
}

export class ResultLatencyTest {
  created_at: string;
  date: string;
  description: string;
  id: number;
  id_team: number;
  response: number;
  updated_at: string;

  constructor(data: any) {
    this.created_at = data.created_at;
    this.date = data.date;
    this.description = data.description;
    this.id = data.id;
    this.id_team = data.id_team;
    this.response = data.response;
    this.updated_at = data.updated_at;
  }
}
