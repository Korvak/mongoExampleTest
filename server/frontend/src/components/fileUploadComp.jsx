import { useRef, useState } from "react";


function FileUploader() {
    const [fname, setFname] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    let url = "http://127.0.0.1:3030/files/saveFile";

    async function onSubmit(e) {
        e.preventDefault();

        if (inputRef.current == null) {return;}

        setIsLoading(true);

        let data = new FormData();
        let file = inputRef.current.files[0];
        data.append("file", file );

        const response = await fetch(url, {
            method: "POST",
            body : data
        });

        setIsLoading(false);

        setFname( await response.text() );

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="file" name="file" ref={inputRef} className="w-full" required multiple />
                <button disabled={isLoading} className="border-2 border-blue-500 w-half"> {isLoading ? "loading..." : "upload"}</button>
            </form>
            <div className="w-full">
                {fname}
            </div>
        </>
        
    );
}

export default FileUploader;