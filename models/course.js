class Course {

  constructor(id, studentIds, professor, title, imageUrl, description, schedule,videos) {
    this.id = id;
    this.studentIds = studentIds;
    this.professor = professor;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.schedule = schedule;
    this.videos=videos;
  }
}

export default Course;