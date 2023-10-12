INSERT INTO public.users(
	id, name)
	VALUES (1, 'Wendy Meng');
	
INSERT INTO frameworks (id, title, slug, owner_id)
    VALUES (1, 'Workforce Competency Framework for the delivery of Community Forensic Services', 'community-forensic-services', 1);

INSERT INTO competency_groups (id, name, description)
    VALUES (1, 'Access to services, care coordination and risk management', 'The “I story”:
“I understand how the care, support and treatment I am getting is responsive to my needs.”
“I can get specialist help and support at an early stage to avoid a crisis.”
“I am supported to understand and manage my own behaviour, and to understand the consequences of
my actions.”
“I have information about my care and support that is accessible and up to date.”
“I have help to make informed choices.”
“I am treated with dignity and respect and I feel that I am listened to.”
“I am supported to manage any risks.”
“I am supported to be safe and a part of my community.”
“I feel that my community is a safe place to live and local people look out for me.”
“I am getting expert support from people with the right skills and expertise.”
“I am recognised and respected as the person I am.”
“I understand how the care and support I am getting is responsive to my needs.”
“I understand what I must do and what I must not do to stay out of trouble”
“I know what to do if I am in a situation I know is risky.”
“I am getting expert support from people with the right skills and expertise.”
“I am supported to understand and manage my own actions, and to understand the consequences of
them.”
“My needs are understood and met in ordinary community settings.”
“My health and social care needs are met/managed in a way that reduces inequality and reflects my
choices and wishes.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (2, 'Assessment, formulation and intervention/treatment planning', 'The “I story”:
“I have my needs recognised in mainstream services and get the support I need.”
“I am offered early support to maximise my life chances.”
“I am supported to understand and manage my own actions, and to understand the consequences of
them.”
“I understand how the care and support I am getting is responsive to my needs.”
“I am supported to be part of my community.”
“I am supported to understand my legal rights and to access the criminal justice system/ youth justice
system.”
“I have access to service that are reasonably adjusted.”
“I am respected and listened to.”
“I am treated fairly in the justice system.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (3, 'Enabling health interventions', 'The “I story”:
“My health needs are met by services making the reasonable adjustments I need.”
“I am supported to access mainstream health care provision, ensuring parity of esteem, in relation to my
health needs.”
“I''m supported in a way that works for me and I get support to communicate what I need and how I am
feeling.”
“I have access to a range of support that helps me to remain well and healthy.”
“I have a choice about where I live and who I live with.”
“I have a good and meaningful life.”
“I am supported to manage any risks.”
“I am supported to be safe and a part of my community.”
“I feel that my community is a safe place to live and local people look out for me.”
“My needs are understood and met in ordinary community settings.”
“My health and social care needs are met/managed in a way that reduces inequality and reflects my
choices and wishes.
“I have access to service that are reasonably adjusted.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (4, 'Therapeutic interventions', 'The “I story”:
“I understand how the care, support and treatment I am getting is responsive to my needs.”
“I can get specialist help and support at an early stage to avoid a crisis.”
“I am supported to understand and manage my own behaviour, and to understand the consequences of
my actions.”
“I am supported to understand and manage my own actions, and to understand the consequences of
them.”
“I understand how the care and support I am getting is responsive to my needs.”
“I am supported to be part of my community.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (5, 'Role support interventions', 'The “I story”:
“I am treated with dignity and respect and I feel that I am valued.”
“I am in control of planning my care and support.”
“I am supported to maintain my independence and to have family relationships and friendships.”
“The people who are supporting me have the specialist skills and expertise I need.”
“I am supported by people who help me to make links in my local community.”
“I am able to maintain relationships with family and friends.”
“I have help to make informed choices.”
“I am treated with dignity and respect and I feel that I am listened to.”
“I am supported to manage any risks.”
“I am supported to be safe and a part of my community.”
“I feel that my community is a safe place to live and local people look out for me.”
“My needs are understood and met in ordinary community settings.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (6, 'Family/carer interventions', 'The “I story”:
“My family and paid staff are supported and know how to support me.”
“I am supported to be safe and a part of my community.”');
INSERT INTO competency_groups (id, name, description)
    VALUES (7, 'Accommodation and welfare interventions', 'The “I story”:
“I have a choice about where I live and who I live with.”
“I am able to maintain relationships with family and friends.”
“I have help to make informed choices.”
“I am treated with dignity and respect and I feel that I am listened to.”
“I feel that my community is a safe place to live and local people look out for me.”');

INSERT INTO competencies (id, name, description, ordering)
    VALUES (1, 'Team skills', 'Team working skills - required in teams to provide a community forensic service to people with learning disabilities and/or autistic spectrum conditions', 1);
INSERT INTO competencies (id, name, description, ordering)
    VALUES (2, 'Leadership skills', 'Leadership skills - required in teams working to provide a community forensic service to people with learning disabilities and/or autistic spectrum conditions', 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (3, 'Promoting appropriate access to services: supporting individuals', '', 1, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (4, 'Promoting Appropriate Access To Services: Planning and Implementing Services', '', 1, 2);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (5, 'Managing Referrals, Transfers, Transitions/Discharges', '', 1, 3);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (6, 'Managing Care Plan Approach, Including Care Planning', '', 1, 4);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (7, 'Positive Risk Management Including Risk To Self and Others, Safeguarding and Personal Safety', '', 1, 5);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (8, 'Crisis and Emergency Planning', '', 1, 6);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (9, 'Undertaking Assessment Processes', '', 2, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (10, 'Mental Capacity', '', 2, 2);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (11, 'Processing information and formulation', '', 2, 3);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (12, 'Intervention and treatment planning', '', 2, 4);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (13, 'Physical health care (including dysphagia and seizures management)', '', 4, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (14, 'Evidence-based psychotherapeutic interventions', '', 4, 2);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (15, 'Medications management', '', 4, 3);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (16, 'Signposting/supporting access to mainstream health services', '', 3, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (17, 'Promoting healthy lifestyle choices', '', 3, 2);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (18, 'Supporting the choices and self-determination of the service user', '', 3, 3);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (19, 'Promoting effective communication about health needs', '', 3, 4);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (20, 'Supporting person centred activities and functioning', '', 5, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (21, 'Maintaining and developing community links and opportunities to engage in mainstream activities', '', 5, 2);	
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (22, 'Assessment of carer''s needs', '', 6, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (23, 'Maintaining relationships', '', 6, 2);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (24, 'Supporting families including siblings', '', 6, 3);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (25, 'Supporting carers with their needs', '', 6, 4);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (26, 'Supporting carers to undertake the caring role', '', 6, 5);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (27, 'Practical housing support', '', 7, 1);
INSERT INTO competencies (id, name, description, competency_group_id, ordering)
    VALUES (28, 'Accessing benefits', '', 7, 2);

INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('learning disability and/or autistic spectrum conditions forensic issues including:
- comorbidity
- the interface with offending
- the criminal justice system
- secure services
- prison offending behaviour
- probation
- treatment and interventions
- risk management including how to formulate a plan, carry out assessment and raise concerns.', 0, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('mental health in learning disability', 1, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('autistic spectrum conditions including pathological demand avoidance', 2, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('specific relevant legislation, national and local policy', 3, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the specific relevant legislation governing an individual''s mental health and capacity in the community', 4, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('commissioning arrangements and responsibilities', 5, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('services available nationally and in the locality, their culture and ethos', 6, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the different roles and responsibilities, eligibility and criteria assessment processes used by the organisations/services', 7, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the role of responsible clinician and social supervisor', 8, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('processes and procedures for inter-agency working, what “joined up” working means in practice including the role of a key worker and care coordination', 9, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the range of diagnostic and risk assessment tools and processes available to the services', 10, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('evidence based practice', 11, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('how risk management may change or influence an individual''s care plan.', 12, 1, 'knowledge-understanding');

INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('apply knowledge to practice', 1, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('communicate and negotiate with a range of people in a variety of situations and to challenge assumptions', 2, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('work in partnership with a range of people in different services and organisations to ensure best outcome for the person', 3, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('organise and keep records', 4, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('act as a coordinator, providing a consistent point of contact and timely interventions', 5, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('deliver specific, specialised training in relation to the needs and risks of a person', 6, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('reflect on practice and develop own team skills', 7, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('build trust and resilience in the team and team members', 8, 1, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('contribute to the development of your own service.', 9, 1, 'ability');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('crisis/emergency planning', 3, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('the early signs of relapse and crisis and how to recognise and articulate this in relation to the individual and family', 3, 2, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('scenario planning, building on risk assessment tools that help predict potential violence', 3, 3, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('relapse prevention and management plans', 3, 4, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('lead on/contribute to the formulation of crisis and emergency plans', 3, 1, 'ability');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('carry out of crisis and emergency planning.', 3, 2, 'ability');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('advocate restriction of movement based on patient need/public safety.', 3, 3, 'ability');

INSERT INTO frameworks_structure (competency_id, framework_id, ordering)
    VALUES (1, 1, 1);
INSERT INTO frameworks_structure (competency_id, framework_id, ordering)
    VALUES (2, 1, 2);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (1, 1, 3);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (2, 1, 4);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (3, 1, 5);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (4, 1, 6);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (5, 1, 7);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (6, 1, 8);
INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (7, 1, 9);


