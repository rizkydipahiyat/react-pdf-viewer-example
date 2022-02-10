import { useState } from "react";
import "./App.css";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

function App() {
	const [pdfFile, setPdfFile] = useState(null);
	const [pdfError, setPdfError] = useState("");

	// creating new plugin instance
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	// handle file onChange event
	const allowedFiles = ["application/pdf"];
	const handleFile = (e) => {
		let selectedFile = e.target.files[0];
		// console.log(selectedFile.type);
		if (selectedFile) {
			if (selectedFile && allowedFiles.includes(selectedFile.type)) {
				let reader = new FileReader();
				reader.readAsDataURL(selectedFile);
				reader.onloadend = (e) => {
					setPdfError("");
					setPdfFile(e.target.result);
					console.log(e.target.result);
				};
			} else {
				setPdfError("PDF Only");
			}
		} else {
			console.log("please select a PDF");
		}
	};
	return (
		<div className="container">
			<form>
				<label>
					<h5>Upload PDF</h5>
				</label>
				<br />
				{pdfError && <span className="text-danger">{pdfError}</span>}
				<br />
				<input type="file" className="form-control" onChange={handleFile} />
			</form>
			<br />
			<h5>View PDF</h5>
			<div className="viewer">
				{pdfFile && (
					<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
						<Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
					</Worker>
				)}
				{!pdfFile && <>No File Is Selected Yet</>}
			</div>
		</div>
	);
}

export default App;
