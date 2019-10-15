import React from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";

const PersonalInfoDiv = ({ person, candId, handleUpdate }) => {
	const handleSubmit = personObj => {
		handleUpdate({ person: personObj });
	};

	return (
		<section className="tsd-card personal-info profile-section">
			<div className="pi-content">
				<PersonalInfoDisp
					formattedName={person.formattedName}
					candId={candId}
				/>
				<div id="pi-divider" className="tsd-vdiv" />
				<PersonalInfoForm handleSubmit={handleSubmit} person={person} />
			</div>
		</section>
	);
};

const PersonalInfo = ({ person, candId, handleUpdate }) => {
	const header = () => {
		return (
			<ProfileSectionHeader
				headerTitle="Personal Info"
				profilePercentage="20"
				profileSectionCompleted={true}
			/>
		);
	};

	const header2 = () => {
		return (
			<div>
				<p>my heading</p>
			</div>
		);
	};

	const ExpandProfileInfo = makeExpansion(PersonalInfoDiv, header);

	// 	<section className="tsd-card personal-info profile-section">

	return (
		<ExpandProfileInfo
			person={person}
			candId={candId}
			handleUpdate={handleUpdate}
		/>
	);
};

export default PersonalInfo;
