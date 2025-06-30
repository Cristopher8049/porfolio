const editorEl = document.getElementById('editor');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

const history = [], future = [];

class WriteCmd {
    constructor(el, text) { this.el = el; this.text = text; }
    execute() {
        this.el.innerText += this.text;
    }
    undo() {
        this.el.innerText = this.el.innerText.slice(0, -this.text.length);
    }
}

// Cada vez que el usuario escribe algo concreto (por simplicidad, con un botón):
document.getElementById('writeA').addEventListener('click', () => {
    const cmd = new WriteCmd(editorEl, 'A');
    cmd.execute();
    history.push(cmd);
    future.length = 0; // limpiar pila redo
});

undoBtn.addEventListener('click', () => {
    const cmd = history.pop();
    if (!cmd) return;
    cmd.undo();
    future.push(cmd);
});

redoBtn.addEventListener('click', () => {
    const cmd = future.pop();
    if (!cmd) return;
    cmd.execute();
    history.push(cmd);
});