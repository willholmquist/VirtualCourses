import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Enroll, EnrollRelations, Certificate, Student, Course} from '../models';
import {CertificateRepository} from './certificate.repository';
import {StudentRepository} from './student.repository';
import {CourseRepository} from './course.repository';

export class EnrollRepository extends DefaultCrudRepository<
  Enroll,
  typeof Enroll.prototype.id,
  EnrollRelations
> {

  public readonly certificate: HasOneRepositoryFactory<Certificate, typeof Enroll.prototype.id>;

  public readonly student: BelongsToAccessor<Student, typeof Enroll.prototype.id>;

  public readonly course: BelongsToAccessor<Course, typeof Enroll.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CertificateRepository') protected certificateRepositoryGetter: Getter<CertificateRepository>, @repository.getter('StudentRepository') protected studentRepositoryGetter: Getter<StudentRepository>, @repository.getter('CourseRepository') protected courseRepositoryGetter: Getter<CourseRepository>,
  ) {
    super(Enroll, dataSource);
    this.course = this.createBelongsToAccessorFor('course', courseRepositoryGetter,);
    this.registerInclusionResolver('course', this.course.inclusionResolver);
    this.student = this.createBelongsToAccessorFor('student', studentRepositoryGetter,);
    this.registerInclusionResolver('student', this.student.inclusionResolver);
    this.certificate = this.createHasOneRepositoryFactoryFor('certificate', certificateRepositoryGetter);
    this.registerInclusionResolver('certificate', this.certificate.inclusionResolver);
  }
}
