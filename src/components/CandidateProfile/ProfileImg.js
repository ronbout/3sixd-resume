import React, { useRef, useState } from "react";

const ProfileImg = props => {
	const [imgHeight, setImgHeight] = useState(145);
	const imgElement = useRef(null);

	const handleOpenUploadDialog = ev => {
		ev.preventDefault();
		alert("open upload dialog");
	};

	const handleDefaultImg = ev => {
		ev.target.src = "http://13.90.143.153/3sixd/imgs/default.jpg";
	};

	return (
		<div className="personal-image">
			<div className="img-container">
				<img
					className="candidate-img"
					onError={handleDefaultImg}
					src={`http://13.90.143.153/3sixd/imgs/candidate${props.candId}.jpg`}
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
	);
};

export default ProfileImg;
