
function FileUploadPage(props) {
    return (
        <div className="page bg-slate-200">
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default FileUploadPage;