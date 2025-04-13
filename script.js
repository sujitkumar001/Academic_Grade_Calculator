// Grade points mapping
const gradePoints = {
    'O': 10,
    'E': 9,
    'A': 8,
    'B': 7,
    'C': 6,
    'D': 4,
    'F': 0
};

// DOM Elements - SGPA Calculator
const subjectsContainer = document.getElementById('subjectsContainer');
const addSubjectBtn = document.getElementById('addSubject');
const calculateSgpaBtn = document.getElementById('calculateSgpa');
const sgpaErrorDiv = document.getElementById('sgpaError');
const sgpaResultDiv = document.getElementById('sgpaResult');
const sgpaValueSpan = document.getElementById('sgpaValue');
const subjectCountSpan = document.getElementById('subjectCount');
const toggleSgpaInfoBtn = document.getElementById('toggleSgpaInfo');
const sgpaInstructionsContent = document.getElementById('sgpaInstructionsContent');

// DOM Elements - CGPA Calculator
const semestersContainer = document.getElementById('semestersContainer');
const addSemesterBtn = document.getElementById('addSemester');
const calculateCgpaBtn = document.getElementById('calculateCgpa');
const cgpaErrorDiv = document.getElementById('cgpaError');
const cgpaResultDiv = document.getElementById('cgpaResult');
const cgpaValueSpan = document.getElementById('cgpaValue');
const percentageValueSpan = document.getElementById('percentageValue');
const semesterCountSpan = document.getElementById('semesterCount');
const toggleCgpaInfoBtn = document.getElementById('toggleCgpaInfo');
const cgpaInstructionsContent = document.getElementById('cgpaInstructionsContent');

// Tab Elements
const tabButtons = document.querySelectorAll('.tab-button');
const calculatorSections = document.querySelectorAll('.calculator-section');

// Initialize Lucide icons
lucide.createIcons();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add initial subject and semester
    addSubject();
    addSemester();
    
    // Create grade points reference
    createGradePointsReference();
});

// Tab Navigation
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show corresponding section
        calculatorSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${tabId}Section`) {
                section.classList.add('active');
            }
        });
    });
});

// SGPA Calculator Event Listeners
addSubjectBtn.addEventListener('click', addSubject);
calculateSgpaBtn.addEventListener('click', calculateSGPA);
toggleSgpaInfoBtn.addEventListener('click', () => {
    sgpaInstructionsContent.classList.toggle('hidden');
});

// CGPA Calculator Event Listeners
addSemesterBtn.addEventListener('click', addSemester);
calculateCgpaBtn.addEventListener('click', calculateCGPA);
toggleCgpaInfoBtn.addEventListener('click', () => {
    cgpaInstructionsContent.classList.toggle('hidden');
});

// SGPA Calculator Functions
function createSubjectRow(id) {
    const row = document.createElement('div');
    row.className = 'subject-row';
    row.dataset.id = id;

    row.innerHTML = `
        <div class="input-group">
            <label>Subject ${document.querySelectorAll('.subject-row').length + 1}</label>
            <input type="number" class="credits" placeholder="Credits" min="1" step="0.5">
        </div>
        <div class="input-group">
            <label>Grade</label>
            <select class="grade">
                <option value="">Select Grade</option>
                ${Object.keys(gradePoints).map(grade => 
                    `<option value="${grade}">${grade}</option>`
                ).join('')}
            </select>
        </div>
        ${document.querySelectorAll('.subject-row').length > 0 ? `
            <button type="button" class="button danger remove-subject" onclick="removeSubject('${id}')">
                <i data-lucide="trash-2"></i>
            </button>
        ` : ''}
    `;

    // Initialize new icons
    lucide.createIcons({
        icons: ['trash-2'],
        element: row
    });

    return row;
}

function addSubject() {
    const id = Math.random().toString(36).substr(2, 9);
    const subjectRow = createSubjectRow(id);
    subjectsContainer.appendChild(subjectRow);
}

function removeSubject(id) {
    if (document.querySelectorAll('.subject-row').length > 1) {
        const row = document.querySelector(`[data-id="${id}"]`);
        row.remove();
        updateSubjectNumbers();
    }
}

function updateSubjectNumbers() {
    document.querySelectorAll('.subject-row').forEach((row, index) => {
        const label = row.querySelector('label');
        label.textContent = `Subject ${index + 1}`;
    });
}

// CGPA Calculator Functions
function createSemesterRow(id) {
    const row = document.createElement('div');
    row.className = 'semester-row';
    row.dataset.id = id;

    row.innerHTML = `
        <div class="input-group">
            <label>Semester ${document.querySelectorAll('.semester-row').length + 1}</label>
            <input type="number" class="sgpa" placeholder="SGPA" min="0" max="10" step="0.01">
        </div>
        <div class="input-group">
            <label>Total Credits</label>
            <input type="number" class="credits" placeholder="Credits" min="1">
        </div>
        ${document.querySelectorAll('.semester-row').length > 0 ? `
            <button type="button" class="button danger remove-semester" onclick="removeSemester('${id}')">
                <i data-lucide="trash-2"></i>
            </button>
        ` : ''}
    `;

    // Initialize new icons
    lucide.createIcons({
        icons: ['trash-2'],
        element: row
    });

    return row;
}

function addSemester() {
    const id = Math.random().toString(36).substr(2, 9);
    const semesterRow = createSemesterRow(id);
    semestersContainer.appendChild(semesterRow);
}

function removeSemester(id) {
    if (document.querySelectorAll('.semester-row').length > 1) {
        const row = document.querySelector(`[data-id="${id}"]`);
        row.remove();
        updateSemesterNumbers();
    }
}

function updateSemesterNumbers() {
    document.querySelectorAll('.semester-row').forEach((row, index) => {
        const label = row.querySelector('label');
        label.textContent = `Semester ${index + 1}`;
    });
}

function createGradePointsReference() {
    const gradeGrid = document.querySelector('.grade-grid');
    
    Object.entries(gradePoints).forEach(([grade, points]) => {
        const gradeItem = document.createElement('div');
        gradeItem.className = 'grade-item';
        gradeItem.innerHTML = `
            <div class="grade">${grade}</div>
            <div class="points">${points} points</div>
        `;
        gradeGrid.appendChild(gradeItem);
    });
}

function calculateSGPA() {
    const subjects = document.querySelectorAll('.subject-row');
    let totalCredits = 0;
    let totalPoints = 0;
    let isValid = true;

    subjects.forEach(subject => {
        const credits = parseFloat(subject.querySelector('.credits').value);
        const grade = subject.querySelector('.grade').value;

        if (isNaN(credits) || credits <= 0 || !grade) {
            isValid = false;
            return;
        }

        totalCredits += credits;
        totalPoints += credits * gradePoints[grade];
    });

    if (!isValid) {
        sgpaErrorDiv.textContent = 'Please fill in all fields correctly';
        sgpaErrorDiv.classList.remove('hidden');
        sgpaResultDiv.classList.add('hidden');
        return;
    }

    const sgpa = (totalPoints / totalCredits).toFixed(2);
    
    sgpaErrorDiv.classList.add('hidden');
    sgpaResultDiv.classList.remove('hidden');
    sgpaValueSpan.textContent = sgpa;
    subjectCountSpan.textContent = subjects.length;
}

function calculateCGPA() {
    const semesters = document.querySelectorAll('.semester-row');
    let totalWeightedSGPA = 0;
    let totalCredits = 0;
    let isValid = true;

    semesters.forEach(semester => {
        const sgpa = parseFloat(semester.querySelector('.sgpa').value);
        const credits = parseFloat(semester.querySelector('.credits').value);

        if (isNaN(sgpa) || isNaN(credits) || sgpa < 0 || sgpa > 10 || credits <= 0) {
            isValid = false;
            return;
        }

        totalWeightedSGPA += sgpa * credits;
        totalCredits += credits;
    });

    if (!isValid) {
        cgpaErrorDiv.textContent = 'Please fill in all fields correctly (SGPA should be between 0 and 10)';
        cgpaErrorDiv.classList.remove('hidden');
        cgpaResultDiv.classList.add('hidden');
        return;
    }

    const cgpa = (totalWeightedSGPA / totalCredits).toFixed(2);
    const percentage = (cgpa * 9.5).toFixed(2);
    
    cgpaErrorDiv.classList.add('hidden');
    cgpaResultDiv.classList.remove('hidden');
    cgpaValueSpan.textContent = cgpa;
    percentageValueSpan.textContent = percentage;
    semesterCountSpan.textContent = semesters.length;
}