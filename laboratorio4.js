/*************  LABORATORIO IV   
 * 
 * Vamos a intentar juntar todos los elementos que hemos preparado anteriormente.
 * Creamos una clase Tutoring que tendrá dos listas de usuarios: alumnos y profesores
 * por separado
 * 
 * Define los métpdps en la clase:
 * 
 * + getStudentByName(name, surname)- que devolverá un studentobjeto con el nombre y 
 *                                    apellido indicados (o undefinedsi el estudiante no ha 
 *                                    sido agregado antes)
 * + getTeacherByName(name, surname)- que devolverá el teacherobjeto con el nombre y apellido 
 *                                    indicados (o undefinedsi el profesor no ha sido agregado
 *                                    antes)
 * + getStudentsForTeacher(teacher)- que devolverá una matriz de estudiantes a los que el 
 *                                   profesor puede dar tutoría;
 * + getTeacherForStudent(student)- que devolverá un conjunto de profesores capaces de dar 
 *                                  tutoría al estudiante;
 * + addStudent(name, surname, email)- que agregará un nuevo studentobjeto a la lista;
 * + addTeacher(name, surname, email)- que agregará un nuevo teacherobjeto a la lista.
 * 
 * Utilice clases previamente preparadas y sus métodos (por ejemplo match).
 * 
 * Pruebe su solución utilizando el siguiente código:
 */
/*
let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);
let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);
let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...
*/

// Clase User base para Student y Teacher
class User {
    constructor({ name, surname, email }) {
      this.name = name;
      this.surname = surname;
      this.email = email;
      this.courses = []; // Inicializamos una lista de cursos
    }
  
    // Método para agregar cursos
    addCourse(course, level) {
      this.courses.push({ course, level });
    }
  
    // Método para obtener los cursos del usuario
    getCourses() {
      return this.courses;
    }
  }
  
  // Clase Student que extiende User
  class Student extends User {
    constructor(details) {
      super(details);
    }
  }
  
  // Clase Teacher que extiende User y tiene un método para editar cursos
  class Teacher extends User {
    constructor(details) {
      super(details);
    }
  
    // Método para editar el nivel de un curso
    editCourse(courseName, newLevel) {
      const course = this.courses.find(c => c.course === courseName);
      if (course) {
        course.level = newLevel;
      }
    }
  }
  
  // Clase ExtendedUser con el método estático match
  class ExtendedUser {
    static match(teacher, student, courseName = null) {
      // Obtenemos los cursos del estudiante y del profesor
      const studentCourses = student.getCourses();
      const teacherCourses = teacher.getCourses();
      
      // Si se especifica un curso específico
      if (courseName) {
        const studentCourse = studentCourses.find(c => c.course === courseName);
        const teacherCourse = teacherCourses.find(c => c.course === courseName);
  
        if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
          return { course: courseName, level: studentCourse.level };
        }
        return undefined;
      }
  
      // Si no se especifica un curso, buscamos todas las coincidencias
      const matches = studentCourses
        .filter(sc => {
          const teacherCourse = teacherCourses.find(tc => tc.course === sc.course);
          return teacherCourse && teacherCourse.level >= sc.level;
        })
        .map(sc => ({ course: sc.course, level: sc.level }));
  
      return matches;
    }
  }
  
// Clase Tutoring que contiene listas de estudiantes y profesores
class Tutoring {
    constructor() {
      this.students = []; // Lista de estudiantes
      this.teachers = []; // Lista de profesores
    }
  
    // Agrega un estudiante a la lista
    addStudent(name, surname, email) {
      const student = new Student({ name, surname, email });
      this.students.push(student);
    }
  
    // Agrega un profesor a la lista
    addTeacher(name, surname, email) {
      const teacher = new Teacher({ name, surname, email });
      this.teachers.push(teacher);
    }
  
    // Devuelve un estudiante por nombre y apellido
    getStudentByName(name, surname) {
      return this.students.find(
        (student) => student.name === name && student.surname === surname
      );
    }
  
    // Devuelve un profesor por nombre y apellido
    getTeacherByName(name, surname) {
      return this.teachers.find(
        (teacher) => teacher.name === name && teacher.surname === surname
      );
    }
  
    // Devuelve una lista de estudiantes que el profesor puede tutorar
    getStudentsForTeacher(teacher) {
      return this.students.filter((student) => {
        const match = ExtendedUser.match(teacher, student);
        return match.length > 0; // Si hay coincidencias, el profesor puede tutorar al estudiante
      });
    }
  
    // Devuelve una lista de profesores que pueden dar tutoría al estudiante
    getTeacherForStudent(student) {
      return this.teachers.filter((teacher) => {
        const match = ExtendedUser.match(teacher, student);
        return match.length > 0; // Si hay coincidencias, el profesor puede tutorar al estudiante
      });
    }
  }
  
  // Pruebas del código
  let tutoring = new Tutoring();
  tutoring.addStudent('Rafael', 'Fife', 'rfife@rhyta.com');
  tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
  tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
  
  // Agregar cursos a estudiante y profesor
  let student = tutoring.getStudentByName('Rafael', 'Fife');
  student.addCourse('maths', 2);
  student.addCourse('physics', 4);
  let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
  teacher.addCourse('maths', 4);
  
  // Buscar profesores y estudiantes para tutorías
  let students = tutoring.getTeacherForStudent(student);
  let teachers = tutoring.getStudentsForTeacher(teacher);
  
  console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...}
  console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}
  
  // Pruebas adicionales
  student = tutoring.getStudentByName('Kelly', 'Estes');
  students = tutoring.getTeacherForStudent(student);
  teachers = tutoring.getStudentsForTeacher(teacher);
  
  console.log(students[0]); // -> undefined, ya que Kelly no tiene cursos compatibles con Paula
  console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...}
  