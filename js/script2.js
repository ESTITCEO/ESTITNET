const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
CloseIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ["enero","febrero", "marzo","abril","mayo","junio","julio",
                "agosto", "septiembre", "Octubre", "Noviembre", "Diciembre"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
addBox.addEventListener("click", () =>  {
    popupBox.classList.add("show");
});

CloseIcon.addEventListener("click", () =>  {
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Añadir nota";
    popupTitle.innerText = "Añadir nueva nota";
    popupBox.classList.remove("show");
});

function showNotes(){
    document.querySelectorAll(".note").forEach(note => note.remove())
    notes.forEach((note, index) =>{
        let liTag = `   <li class="note">
                        <div class="details">
                            <p>${note.titulo}</p>
                            <span>${note.descripción}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.datos}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.titulo}', '${note.descripción}')"><i class="fa-solid fa-pen"></i>Editar</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Eliminar</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
                    addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes(); 

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}
    function deleteNote(noteId) {
        notes.splice(noteId, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes()
    }

    function updateNote(noteId, titulo, desc) { 
        addBox.click();
        addBox.click();
        titleTag.value = titulo;
        descTag.value = desc;
        addBtn.innerText = "Actualizar Nota";
        popupTitle.innerText = "Actualizar Nota";
        console.log(noteId, titulo, desc);
    }


addBtn.addEventListener("click", e =>  {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        mes = months[dateObj.getMonth()],
        dia = dateObj.getDate(),
        año = dateObj.getFullYear();
        
        let noteInfo = {
            titulo: noteTitle, descripción: noteDesc,
            datos: `${mes} ${dia} ${año}`

        }
        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        CloseIcon.click();
        showNotes();
    }
});