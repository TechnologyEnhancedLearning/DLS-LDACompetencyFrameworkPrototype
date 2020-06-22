const data = {
    45: [
        {
            title: 'Develop and maintain your professional networks',
            link: 'https://tools.skillsforhealth.org.uk/external/CFAM&LAA3',
            ref: 'CFAM&LAA3'
        },
        {
            title: 'Provide leadership in your area of responsibility',
            link: 'https://tools.skillsforhealth.org.uk/external/CFAM&LBA2',
            ref: 'CFAM&LBA2'
        },
        {
            title: 'Identify and evaluate opportunities for innovation and improvement',
            link: 'https://tools.skillsforhealth.org.uk/external/CFAM&LCA1',
            ref: 'CFAM&LCA1'
        }
    ],
    46: [
        {
            title: 'Contribute to the assessment of needs and the planning, evaluation and review of individualised programmes of care for individuals',
            link: 'https://tools.skillsforhealth.org.uk/competence/show/html/id/3860/',
            ref: 'CHS233'
        },
        {
            title: 'Respond to potential crisis and relapse for an individual in the community',
            link: 'https://tools.skillsforhealth.org.uk/competence/show/html/id/2280/',
            ref: 'FMH18'
        },
        {
            title: 'Observe an individual who presents a significant imminent risk to themselves or others',
            link: 'https://tools.skillsforhealth.org.uk/competence/show/html/id/2267/',
            ref: 'FMH3'
        },
        {
            title: 'Agree a change in the level of security applying to an individual',
            link: 'https://tools.skillsforhealth.org.uk/competence/show/html/id/2269/',
            ref: 'FMH6'
        },
        {
            title: 'Act within the limits of your competence and authority',
            link: 'https://tools.skillsforhealth.org.uk/competence/show/html/id/85/',
            ref: 'GEN63'
        },
        {
            title: 'Make sure your actions contribute to a positive and safe working culture',
            link: 'https://tools.skillsforhealth.org.uk/external/PMWRV1.pdf',
            ref: 'PMWRV1'
        },
        {
            title: 'Promote effective communication',
            link: 'https://tools.skillsforhealth.org.uk/external/SCDHSC0031.pdf',
            ref: 'SCDHSC0031'
        },
        {
            title: 'Contribute to addressing situations where there is risk of danger, harm or abuse',
            link: 'https://tools.skillsforhealth.org.uk/external/SCDHSC0395.pdf',
            ref: 'SCDHSC0395'
        }
    ]
}

module.exports = {
    getForCompetency: (id) => data[id]
}