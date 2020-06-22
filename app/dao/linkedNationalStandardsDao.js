const data = {
    9: [
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
    ]
}

module.exports = {
    getForCompetency: (id) => data[id]
}