export interface CreateUserDTO {
  name: string;
  nickname?: string;
  course: string;
  college: string;
  semester: number;
  country: string;
}

export interface UpdateUserDTO {
  name?: string;
  nickname?: string;
  course?: string;
  college?: string;
  semester?: number;
  country?: string;
}
