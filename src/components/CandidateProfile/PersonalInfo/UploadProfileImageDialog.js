/* UploadProfileImageDialog.js */
import React, { useState, useRef } from "react";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import { FileUpload } from "styledComponents/FileUpload";

const UploadProfileImageDialog = ({ dispUpload, hideUploadDialog, candId }) => {
	const [uploadFile, setUploadFile] = useState(null);
	const [invalidFile, setInvalidFile] = useState(false);
	const uploadRef = useRef(null);

	const handleFileUpload = () => {
		alert("file upload");
	};

	// const handleOnChange = file => {
	// 	setUploadFile(file);
	// };

	const handleLoad = (uploadedFile, uploadedData) => {
		const { name, size, type, lastModified } = uploadedFile;
		if (type.match(/image/)) {
			const file = {
				name,
				size,
				type,
				data: uploadedData,
				lastModified: new Date(lastModified)
			};
			console.log("handleLoad: ", uploadedFile);
			console.log("handleLoad file: ", file);
			setUploadFile(file);
		}
	};

	const handleProgress = (file, progress) => {
		// The progress event can sometimes happen once more after the abort
		// has been called. So this just a sanity check
		if (uploadFile) {
			console.log("progress: ", progress);
		}
	};

	const testImageFile = file => {
		if (!file.type.match(/image/)) {
			console.log("invalid file type");
			setInvalidFile(true);
			setUploadFile(null);
		} else {
			setInvalidFile(false);
		}
	};

	const actions = [];
	actions.push({
		secondary: true,
		children: "Cancel",
		onClick: hideUploadDialog
	});
	actions.push(
		<Button variant="flat" color="primary" onClick={handleFileUpload}>
			Upload Image
		</Button>
	);

	return (
		<DialogContainer
			id="upload-image-dialog"
			visible={dispUpload}
			onHide={hideUploadDialog}
			actions={actions}
			title="Upload Profile Image"
			height={400}
			width={600}
		>
			<div style={{ marginBottom: "16px" }}>
				<FileUpload
					id="image-upload-file"
					ref={uploadRef}
					label="Choose file"
					required
					accept="image/*"
					onLoadStart={testImageFile}
					onLoad={handleLoad}
					onProgress={handleProgress}
					name="file"
					className="file-inputs__upload-form__file-upload"
					primary
					iconBefore
				/>
			</div>
			{uploadFile && (
				<img
					style={{ width: "116px" }}
					alt={uploadFile.name}
					src={uploadFile.data}
				/>
			)}
			{invalidFile && <h3>Invalid File Type</h3>}
		</DialogContainer>
	);
};

export default UploadProfileImageDialog;
