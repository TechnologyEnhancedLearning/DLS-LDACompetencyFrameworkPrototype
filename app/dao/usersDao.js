const getAll = async () => {
    return [
        {
            id: "1",
            name: "Nicholas Washington",
            roles: ["Learner"]
          },
          {
            id: "2",
            name: "Jane Doe",
            roles: ["Learner"]
          },
          {
            id: "3",
            name: "Queen Elizabeth II",
            roles: ["Learner"]
          },
          {
            id: "4",
            name: "Sacha Sokolov",
            roles: ["Learner"]
          },
          {
            id: "5",
            name: "Wendy Meng",
            roles: ["Manager"]
          },
          {
            id: "6",
            name: "Adam Muleba",
            roles: ["Assessor"]
          }
    ]
}

const getLearners = async () => {
  const learners = await getAll();
  return learners.filter(user => user.roles.includes('Learner'));
}

const get = async (id) => {
    const learners = await getLearners();
    return learners.find(user => user.id == id);
}

module.exports = {
    getLearners: getLearners,
    get: get
}