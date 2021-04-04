import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Course, Faculty, FacultyRelations} from '../models';
import {CourseRepository} from './course.repository';

export class FacultyRepository extends DefaultCrudRepository<
  Faculty,
  typeof Faculty.prototype.id,
  FacultyRelations
> {
  public readonly Courses: HasManyRepositoryFactory<
    Course,
    typeof Faculty.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('CourseRepository')
    protected CourseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(Faculty, dataSource);
    this.Courses = this.createHasManyRepositoryFactoryFor(
      'Courses',
      CourseRepositoryGetter,
    );
    this.registerInclusionResolver('Courses', this.Courses.inclusionResolver);
  }
}
