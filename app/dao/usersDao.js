const getLearners = async () => {
    return [
        {
            id: "1",
            name: "Nicholas Washington"
          },
          {
            id: "2",
            name: "Jane Doe"
          },
          {
            id: "3",
            name: "Queen Elizabeth II"
          }
    ]
}

const get = async (id) => {
    const learners = await getLearners();
    return learners.find(user => user.id == id);
}

module.exports = {
    getLearners: getLearners,
    get: get
}