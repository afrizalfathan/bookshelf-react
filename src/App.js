import "./style/style.css"
import { useState, useRef, useEffect } from "react"
import { Button, Form } from "react-bootstrap"
import Book from "./component/Book"

const App = () => {
    useEffect(() => {
        localStorage.setItem("buku", JSON.stringify(book))
    })

    function getDataFromLocalStorage() {
        const bukuData = localStorage.getItem("buku")
        if (bukuData) {
            return JSON.parse(bukuData)
        } else {
            return []
        }
    }

    const [book, setBook] = useState(getDataFromLocalStorage())
    const [judul, setJudul] = useState("")
    const [penulis, setPenulis] = useState("")
    const [tahun, setTahun] = useState("")

    const [validated, setValidated] = useState(false)
    const doneRead = useRef(false)

    // fungsi generate id untuk key
    function generateKey() {
        return Date.now()
    }

    // fungsi untuk pengecekan form
    function findErrors() {
        const newErrors = {}
        if (!judul || judul === "")
            newErrors.judul = "Kolom judul tidak boleh kosong!"
        if (!penulis || penulis === "")
            newErrors.penulis = "Kolom penulis tidak boleh kosong!"
        if (!penulis || penulis === "")
            newErrors.penulis = "Kolom penulis tidak boleh kosong!"

        return newErrors
    }

    // fungsi untuk tambah buku
    function addBook(e) {
        const newErrors = findErrors()
        const form = e.currentTarget
        if (
            Object.keys(newErrors).length > 0 &&
            form.checkValidity() === false
        ) {
            e.stopPropagation()
            e.preventDefault()
            return
        }

        setValidated(true)
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
                    <Form noValidate validated={validated} onSubmit={addBook}>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul :</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setJudul(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Kolom judul wajib diisi!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Penulis :</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPenulis(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Kolom penulis wajib diisi!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tahun :</Form.Label>
                            <Form.Control
                                type="number"
                                onChange={(e) => setTahun(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Kolom penulis tahun diisi!
                            </Form.Control.Feedback>
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
