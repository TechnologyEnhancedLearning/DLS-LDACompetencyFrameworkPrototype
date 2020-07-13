INSERT INTO frameworks (title, slug, owner_id)
    VALUES ('Workforce Competency Framework for the delivery of Community Forensic Services', 'community-forensic-services', 1);

INSERT INTO competencies (name, description, ordering)
    VALUES ('Team skills', 'Team working skills - required in teams to provide a community forensic service to people with learning disabilities and/or autistic spectrum conditions', 1);

INSERT INTO frameworks_structure (competency_id, framework_id, ordering)
    VALUES (44, 52, 1);

INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('learning disability and/or autistic spectrum conditions forensic issues including:
- comorbidity
- the interface with offending
- the criminal justice system
- secure services
- prison offending behaviour
- probation
- treatment and interventions
- risk management including how to formulate a plan, carry out assessment and raise concerns.', 0, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('mental health in learning disability', 1, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('autistic spectrum conditions including pathological demand avoidance', 2, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('specific relevant legislation, national and local policy', 3, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the specific relevant legislation governing an individual''s mental health and capacity in the community', 4, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('commissioning arrangements and responsibilities', 5, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('services available nationally and in the locality, their culture and ethos', 6, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the different roles and responsibilities, eligibility and criteria assessment processes used by the organisations/services', 7, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the role of responsible clinician and social supervisor', 8, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('processes and procedures for inter-agency working, what “joined up” working means in practice including the role of a key worker and care coordination', 9, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('the range of diagnostic and risk assessment tools and processes available to the services', 10, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('evidence based practice', 11, 44, 'knowledge-understanding');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('how risk management may change or influence an individual''s care plan.', 12, 44, 'knowledge-understanding');

INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('apply knowledge to practice', 1, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('communicate and negotiate with a range of people in a variety of situations and to challenge assumptions', 2, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('work in partnership with a range of people in different services and organisations to ensure best outcome for the person', 3, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('organise and keep records', 4, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('act as a coordinator, providing a consistent point of contact and timely interventions', 5, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('deliver specific, specialised training in relation to the needs and risks of a person', 6, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('reflect on practice and develop own team skills', 7, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('build trust and resilience in the team and team members', 8, 44, 'ability');
INSERT INTO competency_criteria (description, ordering, competency_id, type)
    VALUES ('contribute to the development of your own service.', 9, 44, 'ability');


INSERT INTO competencies (name, description, ordering)
    VALUES ('Leadership skills', 'Leadership skills - required in teams working to provide a community forensic service to people with learning disabilities and/or autistic spectrum conditions', 1);

INSERT INTO frameworks_structure (competency_id, framework_id, ordering)
    VALUES (45, 52, 2);


INSERT INTO competency_groups (name, description)
    VALUES ('Access to services, care coordination and risk management', 'The “I story”:
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

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (40, 52, 3);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Promoting appropriate access to services: supporting individuals', '', 40, 1);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Promoting Appropriate Access To Services: Planning and Implementing Services', '', 40, 2);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Managing Referrals, Transfers, Transitions/Discharges', '', 40, 3);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Managing Care Plan Approach, Including Care Planning', '', 40, 4);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Positive Risk Management Including Risk To Self and Others, Safeguarding and Personal Safety', '', 40, 5);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Crisis and Emergency Planning', '', 40, 6);

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('crisis/emergency planning', 46, 1, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('the early signs of relapse and crisis and how to recognise and articulate this in relation to the individual and family', 46, 2, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('scenario planning, building on risk assessment tools that help predict potential violence', 46, 3, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('relapse prevention and management plans', 46, 4, 'knowledge-understanding');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('lead on/contribute to the formulation of crisis and emergency plans', 46, 1, 'ability');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('carry out of crisis and emergency planning.', 46, 2, 'ability');
INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('advocate restriction of movement based on patient need/public safety.', 46, 3, 'ability');


INSERT INTO competency_groups (name, description)
    VALUES ('Assessment, formulation and intervention/treatment planning', 'The “I story”:
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

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (41, 52, 4);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Undertaking Assessment Processes', '', 41, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Mental Capacity', '', 41, 2);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Processing information and formulation', '', 41, 3);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Intervention and treatment planning', '', 41, 4);


INSERT INTO competency_groups (name, description)
    VALUES ('Enabling health interventions', 'The “I story”:
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

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (42, 52, 5);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Signposting/supporting access to mainstream health services', '', 42, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Promoting healthy lifestyle choices', '', 42, 2);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Supporting the choices and self-determination of the service user', '', 42, 3);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Promoting effective communication about health needs', '', 42, 4);


INSERT INTO competency_groups (name, description)
    VALUES ('Therapeutic interventions', 'The “I story”:
“I understand how the care, support and treatment I am getting is responsive to my needs.”
“I can get specialist help and support at an early stage to avoid a crisis.”
“I am supported to understand and manage my own behaviour, and to understand the consequences of
my actions.”
“I am supported to understand and manage my own actions, and to understand the consequences of
them.”
“I understand how the care and support I am getting is responsive to my needs.”
“I am supported to be part of my community.”');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (43, 52, 6);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Physical health care (including dysphagia and seizures management)', '', 43, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Evidence-based psychotherapeutic interventions', '', 43, 2);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Medications management', '', 43, 3);


INSERT INTO competency_groups (name, description)
    VALUES ('Role support interventions', 'The “I story”:
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

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (44, 52, 7);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Supporting person centred activities and functioning', '', 44, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Maintaining and developing community links and opportunities to engage in mainstream activities', '', 44, 2);

INSERT INTO competency_groups (name, description)
    VALUES ('Family/carer interventions', 'The “I story”:
“My family and paid staff are supported and know how to support me.”
“I am supported to be safe and a part of my community.”');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (45, 52, 8);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Assessment of carer''s needs', '', 45, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Maintaining relationships', '', 45, 2);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Supporting families including siblings', '', 45, 3);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Supporting carers with their needs', '', 45, 4);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Supporting carers to undertake the caring role', '', 45, 5);

INSERT INTO competency_groups (name, description)
    VALUES ('Accommodation and welfare interventions', 'The “I story”:
“I have a choice about where I live and who I live with.”
“I am able to maintain relationships with family and friends.”
“I have help to make informed choices.”
“I am treated with dignity and respect and I feel that I am listened to.”
“I feel that my community is a safe place to live and local people look out for me.”');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (46, 52, 9);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Practical housing support', '', 46, 1);
INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Accessing benefits', '', 46, 2);
