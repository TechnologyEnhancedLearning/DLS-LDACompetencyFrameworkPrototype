INSERT INTO frameworks (title, slug, owner_id)
    VALUES ('Core Capabilities Framework for Supporting Autistic People', 'core-capabilities-supporting-autistic-people', 5);

INSERT INTO competency_groups (name, description)
    VALUES ('Understanding autism', 'An understanding of autism, relevant to scope of practice, is essential for all roles and settings and underpins all the capabilities in this framework. This includes the importance of not making assumptions about each individual''s personal experiences, but instead taking time to learn about the individual experiences of the autistic person. The capabilities detailed in this framework should be used in conjunction with a true understanding of each person''s experience of autism. With this understanding it will then be possible to move forward to the desired position of acceptance and appreciation of the autistic person''s uniqueness.
The human rights of autistic people (children, young people and adults) must always be maintained, including the right to satisfying and valued lives and to be treated with dignity and respect. They should have a home within their community, be able to develop and maintain relationships and lifestyles of their choosing, with the support they need to live healthy, safe and rewarding lives.
This domain includes understanding the numbers of autistic people in the population, the characteristics of autism and the impact which it often has. It also includes identification, assessment and diagnosis of autism, which is key to the wellbeing of autistic people and to ensure that effective support, referrals and adjustments can be made to enable them to live healthy, safe and rewarding lives.');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (51, 55, 1);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Understanding Autism: Tier 1', 'Understanding autism at Tier 1 is for people who require general awareness of autism and the support autistic people may need. This may provide the minimum learning outcomes for introductory autism training.', 51, 1);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Understanding Autism: Tier 2', 'Tier 2 provides for a more in-depth understanding of autism e.g. for those with specific responsibility for delivering and/or leading services which meet the needs of autistic people', 51, 2);

INSERT INTO competencies (name, description, competency_group_id, ordering)
    VALUES ('Understanding Autism: Tier 3', 'Tier 3 provides for a more in-depth understanding of autism e.g. for those with specific responsibility for delivering and/or leading services which meet the needs of autistic people', 51, 3);

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('basic facts about autism including:
i. how common it is
ii. that autism is neurodevelopmental and life long
iii. that every autistic person has a different combination of traits and sensitivities and is unique', 80, 1, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('use respectful terminology', 80, 1, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES (' what common autistic characteristics may look like in real life situations e.g. at home, in the classroom, in care settings, in the community.', 80, 2, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('Take responsibility for meeting an autistic person''s unique communication and information needs:
i. understand that communication includes both giving and receiving information and the importance of actively including autistic people, regardless of their ability to communicate verbally
ii. be aware how autistic people may become overwhelmed and need time and quiet space to process and understand information. For example, when overwhelmed some people may ''shutdown'' or simply acquiesce to anything said in order to bring the experience to a close; therefore, you will not get accurate information and they will not retain what you have said
iii. be aware of (e.g. through reading their communication passport) and respect the different methods of communication that an autistic person may use
iv. actively listen to what a person is ''saying'' and be prepared to use patience and perseverance in communication – including being silent to allow thinking time
v. be aware that processing and understanding spoken language is a challenge for many autistic people, especially when anxious or in difficult sensory environments
vi. be aware that autistic people often take language literally so it is important to use clear, unambiguous language, responding positively when autistic people use direct language and give direct feedback
vii. be aware of difficulties and differences in non-verbal communication e.g. facial expression; eye contact; and personal distance
', 80, 2, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('be aware that behaviour seen as challenging may be a form of communication or an indication of distress', 80, 3, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('recognise some key differences in social interaction e.g. processing time, difficulties with small talk, social rules, understanding and interpreting emotions.', 80, 3, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('be aware that autistic people may live with other physical or mental health conditions or impairments that will also impact on their lives.', 80, 4, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('understand the role of trauma in the lives of autistic people leading to a wide range of mental health problems in later life and the importance of building trust and making choices for recovery.', 80, 5, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('understand how sensory issues can impact on autistic people e.g. oversensitivity or under-sensitivity to lighting, sound, temperature, touch, smell and how anxiety and stress can contribute to sensory tolerance.', 80, 6, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('be able to make simple changes to ensure an environment is accessible to autistic people, including opportunities to avoid sensory overload (e.g. turning off unnecessary lights, TV / radio, offering quiet space, enabling the use of sensory protection such as noise-cancelling headphones), and consider the use of an alternative location.', 80, 4, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('plan changes in advance whenever possible. Provide preparation and information about upcoming events using a variety of communication methods.', 80, 5, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('recognise the importance of passionate interests and hobbies.', 80, 7, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('Be able to consistently put key adaptations into practice, for example:
i. Don''t spring surprises!
ii. Don''t touch without consent
iii. Slow down and pause
iv. Create or find a calm, quiet environment
v. Explain FIRST, THEN do.', 80, 6, 'ability');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('Be aware of the Equality Act 2010, Human Rights Act 1998 and Mental Capacity Act 2005.', 80, 8, 'knowledge-understanding');

INSERT INTO competency_criteria (description, competency_id, ordering, type)
    VALUES ('Know where to access resources and further information about autism', 80, 9, 'knowledge-understanding');



INSERT INTO competency_groups (name, description)
    VALUES ('Personalised support', 'Personalised support is centred on the needs, preferences and aspirations of autistic children, young people and adults - genuinely promoting the autonomy of the autistic person. This includes effective communication and interaction to meet the different needs, abilities and preferences of autistic people and recognising the sensory processing differences of individuals and the adaptations which may be required. It includes understanding the significance and value of families, carers and social networks, including when and how the autistic person would like them to be involved and the support autistic people may need at times of change and transitions throughout life.
Personalised support includes supporting autistic people where behaviour may challenge, avoiding assumptions that this is an inevitable part of autism and seeking
to identify underlying causes and meet needs.
Autistic people (children, young people and adults) have the right to the same opportunities as anyone to develop and maintain safe and age appropriate relationships and get the support they need to develop and continue their interests, social life and community involvement. This includes the recognition and encouragement of passionate interests and hobbies');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (52, 55, 2);

INSERT INTO competency_groups (name, description)
    VALUES ('Person-centred care and support', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (53, 55, 3);

INSERT INTO competency_groups (name, description)
    VALUES ('Communication and interaction', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (54, 55, 4);

INSERT INTO competency_groups (name, description)
    VALUES ('Sensory processing and the environment', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (55, 55, 5);

INSERT INTO competency_groups (name, description)
    VALUES ('Families and carers as partners in care and support', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (56, 55, 6);

INSERT INTO competency_groups (name, description)
    VALUES ('Supporting changes throughout life', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (57, 55, 7);

INSERT INTO competency_groups (name, description)
    VALUES ('Supporting autistic people where behaviour may challenge', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (58, 55, 8);

INSERT INTO competency_groups (name, description)
    VALUES ('Forensic support', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (59, 55, 9);

INSERT INTO competency_groups (name, description)
    VALUES ('Relationships, sexuality and sexual health', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (60, 55, 10);

INSERT INTO competency_groups (name, description)
    VALUES ('Meaningful activity and independence', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (61, 55, 11);

INSERT INTO competency_groups (name, description)
    VALUES ('Physical health', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (62, 55, 12);

INSERT INTO competency_groups (name, description)
    VALUES ('Mental health', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (63, 55, 13);

INSERT INTO competency_groups (name, description)
    VALUES ('Health equality and reasonable adjustments', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (64, 55, 14);

INSERT INTO competency_groups (name, description)
    VALUES ('Law, ethics and safeguarding', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (65, 55, 15);

INSERT INTO competency_groups (name, description)
    VALUES ('Equality, diversity and inclusion', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (66, 55, 16);

INSERT INTO competency_groups (name, description)
    VALUES ('Leadership and management', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (67, 55, 17);

INSERT INTO competency_groups (name, description)
    VALUES ('Education and personal development', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (68, 55, 18);

INSERT INTO competency_groups (name, description)
    VALUES ('Research and evidence-based practice', '');

INSERT INTO frameworks_structure (competency_group_id, framework_id, ordering)
    VALUES (69, 55, 19);
