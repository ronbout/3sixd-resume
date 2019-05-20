import React from "react";
import TechtagSelect from "../../TechtagSelect/";
import SkillDescSection from "./SkillDescSection";
import RelatedItemsList from "./RelatedItemsList";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabbedUI from "../../TabbedUI/";

const TECHTAGS_NDX = 0;
const PSKILLS_NDX = 1;
const CSKILLS_NDX = 2;

const SkillCrud = props => {
  const tabSection = () => {
    switch (props.state.tabIndex) {
      case TECHTAGS_NDX:
        return techTagSection();
      case PSKILLS_NDX:
        return parentSkillSection();
      case CSKILLS_NDX:
        return childSkillSection();
      default:
        return null;
    }
  };
  const tagsAndRelatedSkillsSection = () => {
    const tabList = [
      { label: "Techtags" },
      { label: "Parent Skills" },
      { label: "Child Skills" }
    ];
    return (
      <div className="related-skill-section">
        <TabbedUI
          tabs={tabList}
          tabIndex={props.state.tabIndex}
          handleTabClick={props.handleTabClick}
        />
        <div className="tab-section">{tabSection()}</div>
      </div>
    );
  };

  const parentChildSkillsSection = (skillFieldName, dispName) => {
    return (
      <section className="skill-related-section">
        <div
          className="related-list"
          onDragOver={props.handleDragOver}
          onDrop={event => props.handleSkillDrop(skillFieldName, event)}
        >
          <RelatedItemsList
            heading={dispName}
            items={props.state.formFields[skillFieldName]}
            skillFieldName={skillFieldName}
            handleDelItem={props.handleDelRelatedSkill}
          />
          {props.state.formFields.name !== "" && (
            <p>Drag and Drop from Skill Search List</p>
          )}
        </div>
      </section>
    );
  };

  const parentSkillSection = () => {
    return parentChildSkillsSection("parentSkills", "Parent Skills");
  };

  const childSkillSection = () => {
    return parentChildSkillsSection("childSkills", "Child Skills");
  };

  const techTagSection = () => {
    return (
      <section className="skill-related-section">
        <div
          className="related-list"
          onDragOver={props.handleDragOver}
          onDrop={props.handleTagDrop}
        >
          <RelatedItemsList
            heading="Techtag"
            items={props.state.formFields.techtags}
            skillFieldName="techtags"
            handleDelItem={props.handleDelRelatedSkill}
          />
          {props.state.formFields.name !== "" && (
            <p>Drag and Drop from Tag List</p>
          )}
        </div>
        {props.state.formFields.name && (
          <TechtagSelect
            skillTagsList={props.state.formFields.techtags}
            handleAddTag={props.handleAddTag}
            handleTagStartDrag={props.handleTagStartDrag}
          />
        )}
      </section>
    );
  };

  const buttonSection = () => {
    return (
      <div className="fs-btn-container" style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary"
          disabled={props.state.formFields.name === ""}
        >
          {props.state.formFields.id === "" ? "Add skill" : "Update skill"}
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={props.handleClear}
        >
          Clear Skill
        </button>
      </div>
    );
  };

  return (
    <div className="skill-container">
      <form className="basic-skill-form" onSubmit={props.handleSubmit}>
        <input type="hidden" name="id" value={props.state.formFields.id} />
        <div className="basic-skill-container container-fluid d-flex flex-column justify-content-center">
          <SkillDescSection
            formFields={props.state.formFields}
            handleInputChange={props.handleInputChange}
          />
          {tagsAndRelatedSkillsSection()}
          {buttonSection()}
        </div>
        {props.state.userMsg && (
          <div className="skill-basic-confirm">{props.state.userMsg}</div>
        )}
        {props.state.errMsg && (
          <div className="skill-basic-error">{props.state.errMsg}</div>
        )}
      </form>
    </div>
  );
};

export default SkillCrud;
