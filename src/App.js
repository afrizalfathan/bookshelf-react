import "./style/style.css"
import { useState, useRef } from "react"
import { Button, Form } from "react-bootstrap"
import Book from "./component/Book"

const App = () => {
    const [book, setBook] = useState([])
    const [judul, setJudul] = useState("")
    const [penulis, setPenulis] = useState("")
    const [tahun, setTahun] = useState("")
    const doneRead = useRef(false)

    // fungsi generate id untuk key
    function generateKey() {
        return Date.now()
    }

    // fungsi untuk tambah buku
    function addBook(e) {
        const checkRead = doneRead.current.checked
        e.preventDefault()

        setBook([
            ...book,
            {
                id: generateKey(),
                judul,
                penulis,
                tahun,
                done: checkRead,
            },
        ])
    }

    // fungsi untuk hapus buku
    function deleteButtonHandler(bookId) {
        const filteredBook = book.filter((buku) => buku.id !== bookId)
        setBook(filteredBook)
    }

    function changeBook(checkBook, boolean) {
        const currentBook = checkBook
        const updatedBook = {
            id: checkBook.id,
            judul: checkBook.judul,
            penulis: checkBook.penulis,
            tahun: checkBook.tahun,
            done: boolean,
        }

        const indexCurrentBook = book.findIndex(
            (buku) => buku.id === currentBook.id
        )

        const updatedBooks = [...book]
        updatedBooks[indexCurrentBook] = updatedBook

        setBook(updatedBooks)
    }

    // fungsi untuk tambahkan buku ke daftar yang sudah dibaca
    function doneButtonHandler(bookDone) {
        changeBook(bookDone, true)
    }

    // fungsi untuk tambahkan buku ke daftar yang belum dibaca

    function notDoneButtonHandler(bookDone) {
        changeBook(bookDone, false)
    }

    return (
        <div className="App">
            <div className="input-book">
                <h2>Bookshelf App</h2>
                <div className="input-container">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul :</Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(e) => setJudul(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Penulis :</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPenulis(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun :</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setTahun(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Check
                            label="Sudah Dibaca"
                            type="switch"
                            id="custom-switch"
                            ref={doneRead}
                        />
                        <Button
                            variant="primary"
                            type="submit"
                            className="tombol-input"
                            onClick={addBook}
                        >
                            Masukkan Buku
                        </Button>
                    </Form>
                </div>
            </div>

            <div className="not-read">
                <h2>Belum Dibaca</h2>
                {book
                    .filter((buku) => buku.done === false)
                    .map((bukuDone) => (
                        <Book
                            key={bukuDone.id}
                            buku={bukuDone}
                            deleteButtonHandler={deleteButtonHandler}
                            doneButtonHandler={doneButtonHandler}
                            notDoneButtonHandler={notDoneButtonHandler}
                        />
                    ))}
            </div>
            <div className="done-read">
                <h2>Sudah Dibaca</h2>
                {book
                    .filter((buku) => buku.done === true)
                    .map((bukuDone) => (
                        <Book
                            key={bukuDone.id}
                            buku={bukuDone}
                            deleteButtonHandler={deleteButtonHandler}
                            doneButtonHandler={doneButtonHandler}
                            notDoneButtonHandler={notDoneButtonHandler}
                        />
                    ))}
            </div>
        </div>
    )
}

export default App
