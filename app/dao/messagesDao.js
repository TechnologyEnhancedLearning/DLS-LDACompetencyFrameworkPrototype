const getAll = async () => {
    return [
        {
            subject: "Your Learner Sacha Sokolov has completed their self-appraisal for Learning Disability Nurse",
            text: `
            <p>Sacha Sokolov has completed the Self-Appraisal you sent them for Learning Disability Nurse.</p>
            <p><a href="/assessments">View result</a></p>`,
            date: new Date(),
            sender: {
                id: 0,
                name: undefined
            },
            recipient: {
                id: 6,
                name: "Adam Muleba"
            }
        },
        {
            subject: "Wendy Meng has shared a Job Role with you",
            text: `
            <p>Hi Adam, I found this job role and think it might be relevant to your learner Sacha. Thought you might like a look!</p>
            <h3>Learning Disability Nurse</h3>
            <p>Being a learning disability nurse includes teaching people the skills to look after themselves, keep themselves healthy (both physically and mentally) or to find work, and helping with daily activities such as attending college, going on holiday or out with friends.

            You'll need to draw up care plans and monitor the implementation...</p>
            <p><a href="/job-roles/1">More</a></p>`,
            date: new Date(),
            sender: {
                id: 5,
                name: "Wendy Meng"
            },
            recipient: {
                id: 6,
                name: "Adam Muleba"
            }
        },
        {
            subject: "Adam Muleba has shared a Job Role with you",
            text: `
            <p>Hi Wendy, thanks for this share. There's a typo in this job role in the third sentence, thought you'd like to know.</p>
            <h3>Learning Disability Nurse</h3>
            <p>Being a learning disability nurse includes teaching people the skills to look after themselves, keep themselves healthy (both physically and mentally) or to find work, and helping with daily activities such as attending college, going on holiday or out with friends.

            You'll need to draw up care plans and monitor the implementation...</p>
            <p><a href="/job-roles/1">More</a></p>`,
            date: new Date(),
            sender: {
                id: 6,
                name: "Adam Muleba"
            },
            recipient: {
                id: 5,
                name: "Wendy Meng"
            }
        },
        {
            subject: "Adam Muleba has shared a Job Role with you",
            text: `
            <p>Hi Sacha! We spoke in your last appraisal about taking on more Crisis and Emergency Planning responsibilities in your role. Here's an example of what that might look like. Let's discuss at our next mentoring meeting.</p>
            <h3>Learning Disability Nurse</h3>
            <p>Being a learning disability nurse includes teaching people the skills to look after themselves, keep themselves healthy (both physically and mentally) or to find work, and helping with daily activities such as attending college, going on holiday or out with friends.

            You'll need to draw up care plans and monitor the implementation...</p>
            <p><a href="/job-roles/1">More</a></p>`,
            date: new Date(),
            sender: {
                id: 6,
                name: "Adam Muleba"
            },
            recipient: {
                id: 4,
                name: "Sacha Sokolov"
            }
        },
    ];
}

const getInboxFor = async (userId) => {
    const all = await getAll();
    return all.filter(message => message.recipient.id == userId)
}

const getOutboxFor = async (userId) => {
    const all = await getAll();
    return all.filter(message => message.sender.id == userId)
}

module.exports = {
    getAll: getAll,
    getInboxFor: getInboxFor,
    getOutboxFor: getOutboxFor
}