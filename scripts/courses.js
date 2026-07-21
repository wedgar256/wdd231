const courses = [
  {
    code: 'WDD 130',
    name: 'Web Fundamentals',
    credits: 2,
    subject: 'WDD',
    completed: true,
  },
  {
    code: 'WDD 131',
    name: 'Dynamic Web Fundamentals',
    credits: 2,
    subject: 'WDD',
    completed: true,
  },
  {
    code: 'WDD 231',
    name: 'Web Frontend Development I',
    credits: 2,
    subject: 'WDD',
    completed: false,
  },
  {
    code: 'CSE 111',
    name: 'Programming with Functions',
    credits: 2,
    subject: 'CSE',
    completed: true,
  },
  {
    code: 'CSE 210',
    name: 'Programming with Classes',
    credits: 2,
    subject: 'CSE',
    completed: true,
  },
  {
    code: 'CSE 212',
    name: 'Programming with Data Structures',
    credits: 2,
    subject: 'CSE',
    completed: false,
  },
];

const courseContainer = document.querySelector('#courses');
const totalCredits = document.querySelector('#totalCredits');
const allBtn = document.querySelector('#all');
const wddBtn = document.querySelector('#wdd');
const cseBtn = document.querySelector('#cse');

function calculateCredits(courseList) {
  if (totalCredits) {
    const credits = courseList.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = credits;
  }
}

function displayCourses(courseList) {
  if (!courseContainer) {
    return;
  }

  courseContainer.innerHTML = '';
  courseList.forEach((course) => {
    const card = document.createElement('div');
    card.classList.add('course');
    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>${course.credits} Credits</p>
      <p>${course.completed ? '✅ Completed' : '📖 In Progress'}</p>
    `;

    courseContainer.appendChild(card);
  });

  calculateCredits(courseList);
}

if (allBtn) {
  allBtn.addEventListener('click', () => displayCourses(courses));
}

if (wddBtn) {
  wddBtn.addEventListener('click', () => {
    displayCourses(courses.filter((course) => course.subject === 'WDD'));
  });
}

if (cseBtn) {
  cseBtn.addEventListener('click', () => {
    displayCourses(courses.filter((course) => course.subject === 'CSE'));
  });
}

displayCourses(courses);
