/* PersonalInfo.js */
import React, { useContext, useState } from "react";
import makeExpansion from "styledComponents/makeExpansion";
import PersonalInfoForm from "./PersonalInfoForm";
import PersonalInfoDisplay from "./PersonalInfoDisplay";
import ProfileSectionHeader from "../ProfileSectionHeader";
import { CompObjContext } from "components/CandidateProfile/CompObjContext";
import { isEqual } from "lodash";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const PersonalInfoDiv = ({ person, candId, handleUpdate }) => {
	const { dispatch } = useContext(CompObjContext);
	const handleSubmit = personObj => {
		dispatch({
			type: "UPDATE_CAND",
			payload: { person: personObj }
		});
		handleUpdate(personObj);
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

const header = () => {
	return <ProfileSectionHeader headerTitle="Personal Info" />;
};

// const onExpansionToggle = toggleState => {
// 	setExpanded(toggleState);
// };

const ExpandProfileInfo = makeExpansion(PersonalInfoDiv, header, null, true, 0);

const PersonalInfo = ({ person, candId, compObj }) => {
	// React.useEffect(() => {
	// 	console.log("***  PersonalInfo rendered ***");
	// });

	const [toast, setToast] = useState({});
	// const [expanded, setExpanded] = useState(true);
	// let expanded = true;
	const [formData, setFormData] = useState({
		person
	});

	const handleUpdate = person => {
		closeToast();
		// setExpanded(true);
		setFormData({ person });
		const userMsg = "Personal Info has been updated";
		addToast(userMsg);
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	return (
		<section className="personal-info profile-section">
			<ExpandProfileInfo
				person={formData.person}
				candId={candId}
				compObj={compObj}
				handleUpdate={handleUpdate}
			/>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					onDismiss={closeToast}
				/>
			)}
		</section>
	);
};

export default React.memo(PersonalInfo, (prev, next) =>
	isEqual(prev.person, next.person)
);
