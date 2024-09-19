function autoResizeEditor(editorId) {
    var editor = ace.edit(editorId);
    editor.setOptions({
        maxLines: Infinity
    });
    editor.on('input', function () {
        var session = editor.getSession();
        var newHeight = session.getScreenLength() * editor.renderer.lineHeight + editor.renderer.scrollBar.getWidth();
        document.getElementById(editorId).style.height = newHeight + "px";
        editor.resize();
    });
}

function loadLesson(language, lessonNumber) {
    const lessonPath = `lessons/${language}_lessons/${language}.${lessonNumber}.title.txt`;
    fetch(lessonPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('lessonContent').innerHTML = data;
        })
        .catch(err => {
            console.log("Error loading lesson:", err);
        });
}

function runPythonCode() {
    var code = ace.edit('editor1').getValue();
    const output = document.getElementById('output');
    try {
        let result = eval(Brython.run_python(code)); 
        output.innerText = "Output: " + result;
    } catch (error) {
        output.innerText = "Error: " + error.message;
    }
}
