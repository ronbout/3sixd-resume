/* UploadProfileImageDialog.js */
import React, { useState, useRef } from "react";
import DialogContainer from "styledComponents/DialogContainer";
import Button from "styledComponents/Button";
import { FileUpload } from "styledComponents/FileUpload";
import dataFetch from "assets/js/dataFetch";
import Snackbar from "styledComponents/Snackbar";
import { isEmptyObject } from "assets/js/library";

const UploadProfileImageDialog = ({ dispUpload, hideUploadDialog, candId }) => {
	const [imageFile, setImageFile] = useState(null);
	const [uploadFile, setUploadFile] = useState(null);
	const [invalidFile, setInvalidFile] = useState(false);
	const [toast, setToast] = useState({});
	const uploadRef = useRef(null);

	const handleFileUpload = async () => {
		const body = new FormData();
		body.append("image", uploadFile, uploadFile.name);
		body.append("name", uploadFile.name);

		closeToast();
		const id = candId;
		const httpMethod = "POST";
		const endpoint = `candidates/${id}/image`;

		let result = await dataFetch(endpoint, "", httpMethod, body, true);
		if (result.error) {
			const errMsg = "An unknown error has occurred";
			addToast(errMsg, "Close", false);
		} else {
			// success.  display toast to userMsg
			const userMsg = `Image has been uploaded`;
			addToast(userMsg);
			hideUploadDialog(true);
		}
	};

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
			setImageFile(file);
			setUploadFile(uploadedFile);
		}
	};

	const handleProgress = (file, progress) => {
		// The progress event can sometimes happen once more after the abort
		// has been called. So this just a sanity check
		if (imageFile) {
			console.log("progress: ", progress);
		}
	};

	const testImageFile = file => {
		if (!file.type.match(/image/)) {
			console.log("invalid file type");
			setInvalidFile(true);
			setImageFile(null);
		} else {
			setInvalidFile(false);
		}
	};

	const addToast = (text, action = null, autoHide = true, timeout = null) => {
		const toast = { text, action, autoHide, timeout };
		setToast(toast);
	};

	const closeToast = () => {
		setToast({});
	};

	const actions = [];
	actions.push({
		secondary: true,
		children: "Cancel",
		onClick: hideUploadDialog
	});
	actions.push(
		<Button
			variant="flat"
			color="primary"
			onClick={handleFileUpload}
			disabled={!imageFile || invalidFile}
		>
			Upload Image
		</Button>
	);

	return (
		<React.Fragment>
			<DialogContainer
				id="upload-image-dialog"
				visible={dispUpload}
				onHide={hideUploadDialog}
				actions={actions}
				title="Upload Profile Image"
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
				{imageFile && (
					<img
						style={{ width: "116px" }}
						alt={imageFile.name}
						src={imageFile.data}
					/>
				)}
				{invalidFile && <h3>Invalid File Type</h3>}
			</DialogContainer>
			{isEmptyObject(toast) || (
				<Snackbar
					text={toast.text}
					action={toast.action}
					autohide={toast.autoHide}
					timeout={toast.timeout}
					onDismiss={closeToast}
				/>
			)}
		</React.Fragment>
	);
};

export default UploadProfileImageDialog;
