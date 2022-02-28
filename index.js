const dropZone = document.querySelector(".drop-zone")
const browseBtn = document.querySelector(".browseBtn")
const fileInput = document.querySelector('#fileInput')
const host = "https://dropit-backend.herokuapp.com";
const uploadURL = `${host}/api/files`;
const fileURL = document.querySelector("#fileURL");
const copyURLBtn = document.querySelector("#copyURLBtn");

dropZone.addEventListener("dragover",(e)=>{
    //console.log("dragging");
    e.preventDefault()
    if(!dropZone.classList.contains("dragged"))
    {
        dropZone.classList.add("dragged");
    }
});

dropZone.addEventListener("dragleave",()=>{
    e.preventDefault()
    //console.log("drop leaved");
    dropZone.classList.remove("dragged");
})

dropZone.addEventListener("drop", (e)=>{
    e.preventDefault()
    //console.log("dropped", e.dataTransfer.files.length);
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    //console.log(files)
    if(files.length)
    {
        fileInput.files = files;
        uploadFile()
    }
    
})

fileInput.addEventListener("change",()=>{
    uploadFile();
})

browseBtn.addEventListener("click",()=>{
    fileInput.click()
})
// sharing container listenrs
copyURLBtn.addEventListener("click", () => {
    fileURL.select();
    document.execCommand("copy");
    showToast("Copied to clipboard");
  });


const uploadFile = ()=>{
    const file = fileInput.files[0];
    const formData = new FormData()

    formData.append("myfile",file)

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState ===XMLHttpRequest.DONE){
            console.log(xhr.response)
            const { file: url } = JSON.parse(xhr.response);
            console.log(url);
            document.getElementById("sharing-container").innerHTML = url;
        }
    }
    xhr.open("POST",uploadURL)
    xhr.send(formData);
}