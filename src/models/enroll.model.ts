import {belongsTo, Entity, hasOne, model, property} from '@loopback/repository';
import {Certificate} from './certificate.model';
import {Student} from './student.model';
import {Course} from './course.model';

@model()
export class Enroll extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    default: 0,
  })
  approbedSections?: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  finishDate?: string;

  @hasOne(() => Certificate)
  certificate: Certificate;

  @belongsTo(() => Student)
  studentId: string;

  @belongsTo(() => Course)
  courseId: string;

  constructor(data?: Partial<Enroll>) {
    super(data);
  }
}

export interface EnrollRelations {
  // describe navigational properties here
}

export type EnrollWithRelations = Enroll & EnrollRelations;
