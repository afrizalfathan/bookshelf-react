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

    function generateKey() {
        return Date.now()
    }

    function checkBook(e) {
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

        console.log(book)
    }

    function deleteButtonHandler(bookId) {
        const filteredBook = book.filter((buku) => buku.id !== bookId)
        setBook(filteredBook)
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
                            onClick={checkBook}
                        >
                            Masukkan Buku
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="list-buku">
                <h2>Daftar Buku</h2>
                {book.map((buku) => (
                    <Book
                        buku={buku}
                        deleteButtonHandler={deleteButtonHandler}
                    />
                ))}
            </div>
            <div className="not-read">
                <h2>Belum Dibaca</h2>
            </div>
            <div className="done-read">
                <h2>Sudah Dibaca</h2>
            </div>
        </div>
    )
}

export default App
