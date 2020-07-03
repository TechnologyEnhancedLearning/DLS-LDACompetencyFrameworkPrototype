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
  const users = await getAll();
  return users.filter(user => user.roles.includes('Learner'));
}

const get = async (id) => {
    const users = await getAll();
    return users.find(user => user.id == id);
}

const getPrimaryRole = async (id) => {
  const user = await get(id);
  return user.roles[0];
}

module.exports = {
    getLearners: getLearners,
    get: get,
    getPrimaryRole: getPrimaryRole
}