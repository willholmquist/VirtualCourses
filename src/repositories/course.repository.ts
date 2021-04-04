import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {
  Area,
  Certificate,
  Course,
  CourseRelations,
  Enroll,
  Faculty,
  Section,
} from '../models';
import {AreaRepository} from './area.repository';
import {CertificateRepository} from './certificate.repository';
import {EnrollRepository} from './enroll.repository';
import {FacultyRepository} from './faculty.repository';
import {SectionRepository} from './section.repository';

export class CourseRepository extends DefaultCrudRepository<
  Course,
  typeof Course.prototype.id,
  CourseRelations
> {
  public readonly faculty: BelongsToAccessor<
    Faculty,
    typeof Course.prototype.id
  >;

  public readonly area: BelongsToAccessor<Area, typeof Course.prototype.id>;

  public readonly section: HasManyRepositoryFactory<
    Section,
    typeof Course.prototype.id
  >;

  public readonly enrolls: HasManyRepositoryFactory<
    Enroll,
    typeof Course.prototype.id
  >;

  public readonly certificates: HasManyRepositoryFactory<
    Certificate,
    typeof Course.prototype.id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('FacultyRepository')
    protected facultyRepositoryGetter: Getter<FacultyRepository>,
    @repository.getter('AreaRepository')
    protected areaRepositoryGetter: Getter<AreaRepository>,
    @repository.getter('SectionRepository')
    protected sectionRepositoryGetter: Getter<SectionRepository>,
    @repository.getter('EnrollRepository')
    protected enrollRepositoryGetter: Getter<EnrollRepository>,
    @repository.getter('CertificateRepository')
    protected certificateRepositoryGetter: Getter<CertificateRepository>,
  ) {
    super(Course, dataSource);
    this.certificates = this.createHasManyRepositoryFactoryFor(
      'certificates',
      certificateRepositoryGetter,
    );
    this.registerInclusionResolver(
      'certificates',
      this.certificates.inclusionResolver,
    );
    this.enrolls = this.createHasManyRepositoryFactoryFor(
      'enrolls',
      enrollRepositoryGetter,
    );
    this.registerInclusionResolver('enrolls', this.enrolls.inclusionResolver);
    this.section = this.createHasManyRepositoryFactoryFor(
      'section',
      sectionRepositoryGetter,
    );
    this.registerInclusionResolver('section', this.section.inclusionResolver);
    this.area = this.createBelongsToAccessorFor('area', areaRepositoryGetter);
    this.registerInclusionResolver('area', this.area.inclusionResolver);
    this.faculty = this.createBelongsToAccessorFor(
      'faculty',
      facultyRepositoryGetter,
    );
    this.registerInclusionResolver('faculty', this.faculty.inclusionResolver);
  }
}
