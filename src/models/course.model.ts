import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Area} from './area.model';
import {Enroll} from './enroll.model';
import {Faculty} from './faculty.model';
import {Section} from './section.model';

@model()
export class Course extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  desciption?: string;

  @property({
    type: 'string',
    required: true,
  })
  professor: string;

  @property({
    type: 'number',
    required: false,
    default: 0,
  })
  rate?: number;

  @property({
    type: 'number',
    required: false,
    default: 1,
  })
  duration?: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @belongsTo(() => Faculty)
  facultyId: string;

  @belongsTo(() => Area)
  areaId: string;

  @hasMany(() => Section)
  section: Section[];

  @hasMany(() => Enroll)
  enrolls: Enroll[];

  constructor(data?: Partial<Course>) {
    super(data);
  }
}

export interface CourseRelations {
  // describe navigational properties here
}

export type CourseWithRelations = Course & CourseRelations;
