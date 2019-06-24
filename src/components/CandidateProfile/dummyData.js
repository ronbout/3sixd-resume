// dummy data
export const candidateInfo = {
  formFields: {
    id: 17,
    person: {
      formattedName: "Fred Flintstone",
      givenName: "Fred",
      middleName: "",
      familyName: "Flintstone",
      affix: "",
      email1: "fred@stone.com",
      email2: "",
      primaryPhone: "",
      workPhone: "",
      addressLine1: "",
      addressLine2: "",
      municipality: "Bedrock",
      region: "",
      postalCode: "",
      countryCode: "",
      website: ""
    },
    objective:
      "Looking for great job working with dinosaurs with opportunities for advancement",
    executiveSummary: "I am a big, cartoon guy",
    highlights: [
      {
        id: 1,
        highlight: "This is a highlight",
        skills: [{ id: 1, name: "Powerbuilder" }],
        sequence: 2
      },
      {
        id: 2,
        highlight: "And, here is another one",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
        sequence: 1
      },
      {
        id: 3,
        highlight: "Well, jeez, I guess I could list a third",
        skills: [{ id: 103, name: "Cisco" }],
        sequence: 4
      },
      {
        id: 4,
        highlight: "now this is just getting boring",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ],
        sequence: 7
      },
      {
        id: 5,
        highlight: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
        skills: [{ id: 1, name: "Powerbuilder" }],
        sequence: 8
      },
      {
        id: 6,
        highlight: "Lorem ipsum dolor sit amet.",
        skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
        sequence: 9
      },
      {
        id: 7,
        highlight: "There was an old maid from Peru, who swore that she.....",
        skills: [{ id: 103, name: "Cisco" }],
        sequence: 11
      },
      {
        id: 8,
        highlight: "Last one",
        skills: [
          { id: 1, name: "Powerbuilder" },
          { id: 2, name: "Javascript" },
          { id: 22, name: "PHP" },
          { id: 44, name: "WordPress" }
        ],
        sequence: 14
      }
    ],
    experience: [
      {
        id: 2,
        candidateId: 17,
        company: {
          id: 18,
          name: "WordPress Specialists",
          description: "WordPress and Theme Specialists"
        },
        startDate: "2015-05-22",
        endDate: "2017-02-05",
        contactPerson: {
          id: 7,
          formattedName: "Billy Moyer",
          givenName: "Billy",
          familyName: "Moyer",
          workPhone: "931-333-1234"
        },
        payType: "Salary",
        startPay: 47000,
        endpay: 52000,
        jobTitle: {
          id: 2,
          candidateId: 17,
          titleDescription: "Junior Developer"
        },
        summary: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
        skills: [
          {
            id: 140,
            name: "ES6"
          },
          {
            id: 120,
            name: "JQuery"
          }
        ],
        highlights: [
          {
            id: 2,
            highlight: "Job highlight 1",
            skills: [{ id: 2, name: "Javascript" }, { id: 22, name: "PHP" }],
            sequence: 1,
            includeInSummary: true
          },
          {
            id: 3,
            highlight: "Job Highlight 2",
            skills: [{ id: 103, name: "Cisco" }],
            sequence: 4,
            includeInSummary: false
          }
        ]
      },
      {
        id: 7,
        candidateId: 17,
        company: {
          id: 4,
          name: "3sixD",
          description: "World famous Pick/React stack developent"
        },
        startDate: "2017-05-22",
        endDate: "2018-02-05",
        contactPerson: {
          id: 27,
          formattedName: "Bob Skalinsky",
          givenName: "Bob",
          familyName: "Skalinsky",
          workPhone: "615-333-8888"
        },
        payType: "Salary",
        startPay: 65000,
        endpay: 68000,
        jobTitle: {
          id: 1,
          candidateId: 17,
          titleDescription: "Web Developer"
        },
        summary:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sed corporis, maxime sint inventore facere veniam numquam error quisquam debitis blanditiis dolorem enim nam velit at, reiciendis veritatis, animi tempore.",
        skills: [
          {
            id: 117,
            name: "Web API"
          },
          {
            id: 120,
            name: "JQuery"
          }
        ]
      },
      {
        id: 12,
        candidateId: 17,
        company: {
          id: 7,
          name: "Web Tech"
        },
        startDate: "2018-02-10",
        contactPerson: {
          id: 20,
          formattedName: "Sue Jenkins",
          givenName: "Sue",
          familyName: "Jenkins",
          workPhone: "615-444-9999"
        },
        payType: "Salary",
        startPay: 70000,
        endPay: "",
        jobTitle: {
          id: 1,
          candidateId: 17,
          titleDescription: "Web Developer"
        },
        summary:
          "More Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto sed corporis, maxime sint inventore facere veniam numquam error quisquam debitis blanditiis dolorem enim nam velit at, reiciendis veritatis, animi tempore.",
        skills: [
          {
            id: 114,
            name: "C#"
          },
          {
            id: 115,
            name: ".Net Framework 4.0/4.5"
          }
        ]
      }
    ],
    education: [
      {
        id: 2,
        candidateId: 17,
        schoolName: "Vanderbilt",
        schoolMunicipality: "",
        schoolRegion: "",
        schoolCountry: "",
        degreeName: "BS Computer Science",
        degreeType: "Bachelors",
        degreeMajor: "Computer Science",
        degreeMinor: "",
        startDate: "2012-08-01",
        endDate: "2016-05-01",
        skills: [
          {
            id: 114,
            name: "C#"
          },
          {
            id: 115,
            name: ".Net Framework 4.0/4.5"
          }
        ]
      }
    ]
  }
};
