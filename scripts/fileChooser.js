var input = $(":input");
input.addEventListener("change", handleFiles, false);

function handleFiles() {
  var fileList = this.files;

  console.log(fileList);
}
