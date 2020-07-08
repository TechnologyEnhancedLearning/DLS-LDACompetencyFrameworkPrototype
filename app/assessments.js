const assessmentsDao = require('./dao/assessmentsDao');
const jobRolesDao = require('./dao/jobRolesDao');
const usersDao = require('./dao/usersDao');
const competenciesDao = require('./dao/competenciesDao');
const criteriaDao = require('./dao/criteriaDao');
const evidenceDao = require('./dao/evidenceDao');
const selfAppraisalsDao = require('./dao/selfAppraisalsDao');

const setupRoutes = (router) => {
    router.get('/assessments/new', async (req, res) => {
        const users = await usersDao.getLearners();
        res.render('assessments/new/user.html', {
            users: users.map(user => {
                return {
                    value: user.id,
                    text: user.name
                }
            })
        });
    });

    router.get('/users/:id/assessments/new', async (req, res, next) => {
        const user = await usersDao.get(req.params.id);
        if (!user) {
            next();
        } else {
            const jobRoles = await jobRolesDao.getAll();
            const jobs = jobRoles.map((job) => {
                return {
                    value: job.id,
                    text: job.name
                }
            });
            res.render('assessments/new/jobRole', { user: user, jobs: jobs });
        }
    });

    router.get('/job-roles/:id/assessments/new', async (req, res, next) => {
        const jobRole = await jobRolesDao.getJobRole(req.params.id);
        if (!jobRole) {
            next();
            return;
        }

        const users = await usersDao.getLearners();
        res.render('assessments/new/user.html', {
            users: users.map(user => {
                return {
                    value: user.id,
                    text: user.name
                }
            }),
            jobRole: jobRole
        });
    });

    router.post('/assessments/new/job-role', async (req, res, next) => {
        const user = req.body.userId && await usersDao.get(req.body.userId);
        if (!user) {
            next();
        } else {
            const jobRoles = await jobRolesDao.getAll();
            const jobs = jobRoles.map((job) => {
                return {
                    value: job.id,
                    text: job.name
                }
            });
            res.render('assessments/new/jobRole', { user: user, jobs: jobs });
        }
    });

    router.post('/assessments/new', async (req, res) => {
        const assessmentId = await assessmentsDao.create(req.body.userId, req.body.jobRoleId);
        res.redirect('/assessments/' + assessmentId + '/previous');
    });

    router.get('/assessments/:id/previous', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const user = await usersDao.get(assessment.user_id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        const previousAssessments = await assessmentsDao.getForUser(assessment.user_id);

        res.render('assessments/manager/previous', {
            assessment: assessment,
            user: user,
            jobRole: jobRole,
            previousAssessments: previousAssessments.filter(a => a.id != assessment.id)
        });
    });

    router.get('/assessments/:id', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const user = await usersDao.get(assessment.user_id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        // const mostRecentAssessment = await assessmentsDao.getMostRecentAssessmentForUser(assessment.user_id, assessment.id);
        assessment.components = await assessmentsDao.getComponentsFor(assessment.id);
        assessment.complete = !assessment.components.some(component => !component.existing_assessment);
        assessment.selfAppraisal = await selfAppraisalsDao.getResultsForAssessment(assessment.id);

        const data = {
            assessment: assessment,
            user: user,
            jobRole: jobRole,
            mostRecentAssessment: {}
        };

        if (user.id == req.cookies.heeUserId) {
            if (assessment.selfAppraisal.length) {
                res.render('assessments/learner/show', data);
            } else {
                // Yes, when it gets there you'll need to make all those DB round trips again... qq streamline this!
                res.redirect('/assessments/' + assessment.id + '/self-appraisal');
            }
        } else if (assessment.result) {
            res.render('assessments/complete', data);
        } else {
            res.render('assessments/manager/selfAppraisal', data);
        }
    });

    router.get('/assessments/:id/competencies/:competency_id', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        const user = await usersDao.get(assessment.user_id);
        const jobRole = await jobRolesDao.getJobRole(assessment.job_role_id);
        const competency = await competenciesDao.getCompetency(req.params.competency_id);
        const { knowledgeAndUnderstanding, abilities } = await criteriaDao.getForCompetency(competency.id);
        competency.knowledgeAndUnderstanding = knowledgeAndUnderstanding;
        competency.abilities = abilities;

        res.render('assessments/competency', {
            assessment: assessment,
            user: user,
            jobRole: jobRole,
            competency: competency
        });
    });

    router.post('/assessments/:id/components', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        await assessmentsDao.assessCompetency(assessment.id, req.body.competencyId, req.body.level);
        res.redirect('/assessments/' + assessment.id);
    });

    router.post('/assessments/:id/complete', async (req, res, next) => {
        const assessment = await assessmentsDao.get(req.params.id);
        if (!assessment) {
            next();
            return;
        }

        let result;
        let resultExplanation;
        assessment.components = await assessmentsDao.getComponentsFor(assessment.id);
        const anyMissingCompetencies = assessment.components.some(component => component.score < 100);
        if (anyMissingCompetencies) {
            const avgScore = assessment.components.reduce((a, b) => a + b) / assessment.components.length;
            if (avgScore < 20) {
                result = 'Starting out';
                resultExplanation = 'This Learner hasn\'t yet reached the competency level required for this role.';
            } else {
                result = 'Partially qualified';
                resultExplanation = 'This Learner hasn\'t yet gained all the competency levels required for this role, but is getting there.'
            }
        } else {
            result = 'Fully qualified';
            resultExplanation = 'This Learner meets or exceeds all the requirements for this role.';
        }
        await assessmentsDao.markComplete(assessment.id, result, resultExplanation);
        res.redirect('/assessments/' + assessment.id);
    });

    router.get('/assessments', async (req, res) => {
        const userId = req.cookies.heeUserId;

        if (userId && await usersDao.getPrimaryRole(userId) === 'Learner') {
            const assessments = await assessmentsDao.getForUser(userId);
            for (let i = 0; i < assessments.length; i++) {
                assessments[i].selfAppraisal = await selfAppraisalsDao.getResultsForAssessment(assessments[i].id);
            }
            res.render('assessments/learner/my',
            {
                upcomingAssessments: assessments.filter(assessment => !assessment.result),
                pastAssessments: assessments.filter(assessment => assessment.result)
            });

        } else {

            const assessments = await assessmentsDao.getAll();
            res.render('assessments/manager/dashboard',
            {
                upcomingAssessments: assessments.filter(assessment => !assessment.result),
                pastAssessments: assessments.filter(assessment => assessment.result)
            });

        }
    });

}

module.exports = {
    setupRoutes: setupRoutes
}