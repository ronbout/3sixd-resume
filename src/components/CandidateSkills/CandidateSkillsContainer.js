import React, { Component } from "react";

import CandidateSkillsHeader from "./CandidateSkillsHeader";
import CandidateSkillsSkillTab from "./CandidateSkillsSkillTab";
import CandidateSkillsTechtagTab from "./CandidateSkillsTechtagTab";
//import { candidateSkillsInfo } from "./dummyData";
import { objCopy } from "../../assets/js/library";
import dataFetch from "../../assets/js/dataFetch";
import {
  TabbedUI,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "../TabbedUI/TabbedUI";

import "./css/candidateSkills.css";

class CandidateSkillsContainer extends Component {
  constructor(props) {
    super(props);

    // check for candidate id being passed in as url parm
    // if no such parm, then must be add mode
    const candId = props.match.params.candId;
    const candidateSkillsObj = {
      id: "",
      person: {
        id: "",
        formattedName: ""
      },
      skills: [
        {
          id: "",
          skillId: "",
          skillName: "",
          skillDescription: "",
          resumeTechtagId: "",
          resumeTechtagName: "",
          resumeTechtagDescription: "",
          experienceLevel: "",
          tested: "",
          testResults: "",
          totalMonths: ""
        }
      ]
    };
    this.state = {
      candidateSkills: candidateSkillsObj,
      candId
    };
    this.state.origData = objCopy(this.state.candidateSkills);
  }

  componentDidMount() {
    // if candId exists, then pull from the api
    this.loadCandidateSkillsInfo(this.state.candId);
  }

  loadCandidateSkillsInfo = async candId => {
    const endpoint = `candidate_skills/candidate_id/${candId}`;
    const candidateSkillsInfo = await dataFetch(endpoint);
    if (candidateSkillsInfo.error) {
      console.log(candidateSkillsInfo);
    } else {
      const techtagList = this.buildTagList(candidateSkillsInfo.skills);
      const candidateSkills = {
        ...candidateSkillsInfo,
        id: candId,
        techtags: techtagList
      };
      this.setState({
        candidateSkills
      });
    }
  };

  buildTagList = skills => {
    return skills.reduce((list, skill) => {
      if (!skill.resumeTechtagId) return list;
      let fndNdx = list.findIndex(tag => tag.id === skill.resumeTechtagId);
      if (fndNdx !== -1) {
        list[fndNdx].skills.push({
          skillId: skill.skillId,
          skillName: skill.skillName
        });
      } else {
        list.push({
          id: skill.resumeTechtagId,
          name: skill.resumeTechtagName,
          description: skill.resumeTechtagDescription,
          skills: [{ skillId: skill.skillId, skillName: skill.skillName }]
        });
      }
      return list;
    }, []);
  };

  handleUpdate = async skillList => {
    console.log("handle update api here: ", skillList);
    const body = {
      skills: skillList
    };
    const endpoint = `candidates/${this.state.candId}/candidate_skills`;
    const result = await dataFetch(endpoint, "", "PUT", body);
    if (result.error) {
      console.log(result);
    } else {
      // need user msg here
      const techtagList = this.buildTagList(skillList);
      const candidateSkills = {
        ...this.state.candidateSkills,
        skills: skillList,
        techtags: techtagList
      };
      this.setState({
        candidateSkills
      });
      console.log("skills updated");
    }
  };

  render() {
    return (
      <div className="tsd-container candidate-skills-container">
        <CandidateSkillsHeader candidateSkills={this.state.candidateSkills} />
        <div className="tsd-card candidate-skills-tab">
          <TabbedUI>
            <TabList>
              <Tab>Skills</Tab>
              <Tab>Resume Techtags</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CandidateSkillsSkillTab
                  candidateSkills={this.state.candidateSkills}
                  handleUpdate={this.handleUpdate}
                />
              </TabPanel>
              <TabPanel>
                <CandidateSkillsTechtagTab
                  candidateSkills={this.state.candidateSkills}
                />
              </TabPanel>
            </TabPanels>
          </TabbedUI>
        </div>
      </div>
    );
  }
}

export default CandidateSkillsContainer;
