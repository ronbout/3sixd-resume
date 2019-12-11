import React, { useRef, useState } from "react";
import UploadProfileImageDialog from "./PersonalInfo/UploadProfileImageDialog";

const ProfileImg = props => {
	let [, setState] = useState();
	const [imgHeight, setImgHeight] = useState(145);
	const [imgHash, setImgHash] = useState(Date.now());
	const [openDialog, setOpenDialog] = useState(false);
	const imgElement = useRef(null);

	const handleOpenUploadDialog = ev => {
		ev.preventDefault();
		setOpenDialog(true);
	};

	const handleCloseUploadDialog = (redrawFlag = false) => {
		setImgHash(Date.now());
		setOpenDialog(false);
	};

	const handleDefaultImg = ev => {
		ev.target.src = `${window.imgLoc}default.jpg`;
	};

	return (
		<React.Fragment>
			<div className="personal-image">
				<div className="img-container">
					<img
						className="candidate-img"
						onError={handleDefaultImg}
						src={`${window.imgLoc}candidate${props.candId}.jpg?${imgHash}`}
						alt="Candidate"
						ref={imgElement}
						onLoad={() => setImgHeight(imgElement.current.height + 4)}
					/>
					<div style={{ height: imgHeight }} className="upload-overlay">
						<a href="# " onClick={handleOpenUploadDialog}>
							Upload Image
						</a>
					</div>
				</div>

				<h4>{props.formattedName}</h4>
			</div>
			<UploadProfileImageDialog
				dispUpload={openDialog}
				hideUploadDialog={handleCloseUploadDialog}
				candId={props.candId}
			/>
		</React.Fragment>
	);
};

export default ProfileImg;
