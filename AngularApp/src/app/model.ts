export interface Participant {
  readonly name: string;
  readonly drink: boolean;
}

export interface Employee extends Participant {
  readonly id: number;
  readonly guestId?: number;
}

export interface Guest extends Participant {
  readonly id: number;
  readonly employeeId: number;
}

export interface EmployeeNew extends Participant {
}

export interface GuestNew extends Participant {
  readonly employeeId: number;
}
