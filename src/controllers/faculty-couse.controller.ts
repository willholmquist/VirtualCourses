import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Course, Faculty} from '../models';
import {FacultyRepository} from '../repositories';

export class FacultyCourseController {
  constructor(
    @repository(FacultyRepository)
    protected facultyRepository: FacultyRepository,
  ) {}

  @get('/faculties/{id}/Courses', {
    responses: {
      '200': {
        description: 'Array of Faculty has many Course',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Course)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Course>,
  ): Promise<Course[]> {
    return this.facultyRepository.Courses(id).find(filter);
  }

  @post('/faculties/{id}/Courses', {
    responses: {
      '200': {
        description: 'Faculty model instance',
        content: {'application/json': {schema: getModelSchemaRef(Course)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Faculty.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {
            title: 'NewCourseInFaculty',
            exclude: ['id'],
            optional: ['facultyId'],
          }),
        },
      },
    })
    Course: Omit<Course, 'id'>,
  ): Promise<Course> {
    return this.facultyRepository.Courses(id).create(Course);
  }

  @patch('/faculties/{id}/Courses', {
    responses: {
      '200': {
        description: 'Faculty.Course PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Course, {partial: true}),
        },
      },
    })
    Course: Partial<Course>,
    @param.query.object('where', getWhereSchemaFor(Course))
    where?: Where<Course>,
  ): Promise<Count> {
    return this.facultyRepository.Courses(id).patch(Course, where);
  }

  @del('/faculties/{id}/Courses', {
    responses: {
      '200': {
        description: 'Faculty.Course DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Course))
    where?: Where<Course>,
  ): Promise<Count> {
    return this.facultyRepository.Courses(id).delete(where);
  }
}
