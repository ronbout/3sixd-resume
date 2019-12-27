import React from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisp from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";

const PersonalInfoDiv = ({ person, candId, handleUpdate }) => {
	const handleSubmit = personObj => {
		//handleUpdate({ person: personObj });
	};

	return (
		<section>
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

	const ExpandProfileInfo = makeExpansion(PersonalInfoDiv, header, null, true);

	return (
		<section className="tsd-card personal-info profile-section">
			<ExpandProfileInfo
				person={person}
				candId={candId}
				handleUpdate={handleUpdate}
			/>
		</section>
	);
};

export default PersonalInfo;
