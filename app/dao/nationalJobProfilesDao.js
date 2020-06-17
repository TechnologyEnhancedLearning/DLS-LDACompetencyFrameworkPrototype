
const factors = [
    {
        "name": "Communication & Relationship Skills",
        "ordering": 1
    },
    {
        "name": "Knowledge, Training & Experience",
        "ordering": 2
    },
    {
        "name": "Analytical & Judgement Skills",
        "ordering": 3
    },
    {
        "name": "Planning & Organisational Skills",
        "ordering": 4
    },
    {
        "name": "Physical Skills",
        "ordering": 5
    },
    {
        "name": "Responsibility for Patient/Client",
        "ordering": 6
    },
    {
        "name": "Responsibility for Policy/Service Development",
        "ordering": 7
    },
    {
        "name": "Responsibility for Financial & Physical Resources",
        "ordering": 8
    },
    {
        "name": "Responsibliity for Human Resources",
        "ordering": 9
    },
    {
        "name": "Responsiblity for Information Resources",
        "ordering": 10
    },
    {
        "name": "Responsibility for Research & Development",
        "ordering": 11
    },
    {
        "name": "Freedom to Act",
        "ordering": 12
    },
    {
        "name": "Physical Effort",
        "ordering": 13
    },
    {
        "name": "Mental Effort",
        "ordering": 14
    },
    {
        "name": "Emotional Effort",
        "ordering": 15
    },
    {
        "name": "Working Conditions",
        "ordering": 16
    },
];

const getFromId = (id) => {
    // Everything is a nurse for now
    return {
        "id": 1,
        "field": "Nursing",
        "name": "Nurse",
        "jobStatement": `<ol>
            <li>Assesses patients/clients/children; plans, develops or implements programmes of care; provides advice; in a variety of settings; maintains associated records</li>
            <li>Carries out nursing procedures</li>
            <li>May provide clinical supervision to other staff, students</li>
            <li>May provide health promotion information, advice</li>
        </ol>`,
        "responsibilities": [
            {
                "factorId": 1,
                "factorName": "Communication & Relationship Skills",
                "description": `<span class="bold">Provide and receive complex, sensitive information; barriers to understanding; persuasive, motivational, negotiating, training skills are required</span>
                Communicates sensitive, confidential information concerning patients/clients requiring empathy, persuasion and reassurance. Some may have special needs`,
                "jeLevel": "4a",
                "jeLevelNumber": 4,
                "score": 32
            },
            {
                "factorId": 2,
                "factorName": "Knowledge, Training & Experience",
                "description": `<span class="bold">Expertise within specialism, underpinned by theory</span>
                Professional, clinical knowledge acquired through training to degree/diploma level`,
                "jeLevel": "5",
                "jeLevelNumber": 5,
                "score": 120
            },
            {
                "factorId": 3,
                "factorName": "Analytical & Judgement Skills",
                "description": `<span class="bold">Range of facts or situations requiring comparison of a range of options</span>
                Judgements on problems requiring investigation, analysis, e.g. assessment of condition`,
                "jeLevel": "3",
                "jeLevelNumber": 3,
                "score": 27
            },
            {
                "factorId": 4,
                "factorName": "Planning & Organisational Skills",
                "description": `<span class="bold">Plan and organise straightforward activities, some ongoing</span>
                Plans provision of care for patients/clients/children, e.g. clinics, health education. May organise staff`,
                "jeLevel": "2",
                "jeLevelNumber": 2,
                "score": 15
            }
        ]
    }
}

module.exports = {
    getFromId: getFromId
}