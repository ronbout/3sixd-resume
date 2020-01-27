/* PersonalInfo.js */
import React, { useContext } from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisplay from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";

const PersonalInfoDiv = ({ person, candId }) => {
	const { dispatch } = useContext(CompObjContext);
	const handleSubmit = personObj => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { person: personObj }
		});
	};

	return (
		<section>
			<div className="pi-content">
				<PersonalInfoDisplay
					formattedName={person.formattedName}
					candId={candId}
				/>
				<div id="pi-divider" className="tsd-vdiv" />
				<PersonalInfoForm person={person} handleSubmit={handleSubmit} />
			</div>
		</section>
	);
};

const PersonalInfo = ({ person, candId, compObj }) => {
	// React.useEffect(() => {
	// 	console.log("***  PersonalInfo rendered ***");
	// });

	const header = () => {
		return <ProfileSectionHeader headerTitle="Personal Info" />;
	};

	const ExpandProfileInfo = makeExpansion(
		PersonalInfoDiv,
		header,
		null,
		true,
		0
	);

	return (
		<section className="personal-info profile-section">
			<ExpandProfileInfo person={person} candId={candId} compObj={compObj} />
		</section>
	);
};

export default React.memo(PersonalInfo, (prev, next) =>
	isEqual(prev.person, next.person)
);
